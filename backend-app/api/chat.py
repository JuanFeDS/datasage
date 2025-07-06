"""
Módulo de rutas para el chat con el agente AI.

Este módulo define los endpoints para interactuar con el agente de IA,
manejando tanto solicitudes estándar como streaming.
"""
import json
import logging
from typing import AsyncGenerator, Optional

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from services.chat_service import process_message

# Configuración de logging
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Error interno del servidor"}
    }
)


class MessageRequest(BaseModel):
    """Modelo de datos para la solicitud de mensaje al agente.
    
    Attributes:
        content: Texto del mensaje del usuario.
        conversation_id: Identificador único de la conversación (opcional).
        stream: Si es True, la respuesta se envía como streaming.
    """
    content: str = Field(
        ...,
        min_length=1,
        max_length=4000,
        description="Contenido del mensaje del usuario"
    )
    conversation_id: Optional[str] = Field(
        None,
        min_length=1,
        max_length=100,
        description="ID de conversación para mantener el contexto"
    )
    stream: bool = Field(
        False,
        description="Si es True, la respuesta se envía como un stream de eventos"
    )


class MessageResponse(BaseModel):
    """Modelo de datos para la respuesta del agente.
    
    Attributes:
        type: Tipo de mensaje (ej. 'message', 'error').
        content: Contenido de la respuesta.
        sender: Quién envía el mensaje (default: 'assistant').
        conversation_id: ID de la conversación.
    """
    type: str = Field(..., description="Tipo de mensaje")
    content: str = Field(..., description="Contenido del mensaje")
    sender: str = Field("assistant", description="Remitente del mensaje")
    conversation_id: Optional[str] = Field(
        None,
        description="ID de la conversación"
    )

async def stream_response(
    message: str, 
    conversation_id: Optional[str] = None
) -> AsyncGenerator[bytes, None]:
    """Genera una respuesta en formato de stream"""
    try:
        # Procesar el mensaje usando el servicio de chat
        response_stream = process_message(
            message=message,
            conversation_id=conversation_id
        )
        
        # Enviar cada fragmento de la respuesta
        async for chunk in response_stream:
            # Asegurarse de que el chunk tenga el formato correcto
            if isinstance(chunk, dict) and 'type' in chunk and 'content' in chunk:
                response_data = {
                    'type': chunk['type'],
                    'content': chunk['content'],
                    'sender': chunk.get('sender', 'assistant'),
                    'conversation_id': conversation_id or 'new-session'
                }
                yield f"data: {json.dumps(response_data)}\n\n"
            
        # Señal de finalización
        yield "data: [DONE]\n\n"
        
    except Exception as e:
        logger.error(f"Error en el stream: {str(e)}", exc_info=True)
        error_response = {
            'type': 'error',
            'content': f'Error al procesar el mensaje: {str(e)}',
            'sender': 'system',
            'conversation_id': conversation_id or 'new-session'
        }
        yield f"data: {json.dumps(error_response)}\n\n"
        yield "data: [DONE]\n\n"

@router.post("/message")
async def handle_message(request: MessageRequest):
    """
    Maneja los mensajes del chat y devuelve la respuesta del agente AI.
    Soporta tanto respuestas estándar como streaming.
    """
    try:
        logger.info(f"Mensaje recibido: {request.content[:100]}...")
        
        # Si se solicita streaming, devolver una respuesta de streaming
        if request.stream:
            return StreamingResponse(
                stream_response(
                    message=request.content,
                    conversation_id=request.conversation_id
                ),
                media_type="text/event-stream"
            )
        
        # Si no es streaming, procesar y devolver la respuesta completa
        full_response = []
        async for chunk in process_message(
            message=request.content,
            conversation_id=request.conversation_id
        ):
            if chunk.get('type') == 'message':
                full_response.append(chunk.get('content', ''))
        
        return {
            'type': 'message',
            'content': ''.join(full_response),
            'sender': 'assistant',
            'conversation_id': request.conversation_id or 'new-session'
        }
        
    except Exception as e:
        logger.error(f"Error al procesar el mensaje: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar el mensaje: {str(e)}"
        )