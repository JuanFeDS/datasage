from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
import logging

from services.chat_service import process_message

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class MessageRequest(BaseModel):
    """Esquema para la solicitud de mensaje"""
    content: str = Field(..., description="El contenido del mensaje del usuario")
    conversation_id: Optional[str] = Field(
        None, 
        description="ID de conversación para mantener el contexto"
    )

class MessageResponse(BaseModel):
    """Esquema para la respuesta del agente"""
    response: str
    conversation_id: Optional[str] = None
    metadata: Optional[dict] = {}

@router.post("/message", response_model=MessageResponse)
async def handle_message(request: MessageRequest):
    """
    Maneja los mensajes del chat y devuelve la respuesta del agente AI
    """
    try:
        logger.info(f"Mensaje recibido: {request.content[:100]}...")
        
        # Procesar el mensaje usando el servicio de chat
        response = await process_message(
            message=request.content,
            conversation_id=request.conversation_id
        )
        
        return {
            "response": response,
            "conversation_id": request.conversation_id or "new-session"
        }
        
    except Exception as e:
        logger.error(f"Error al procesar el mensaje: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar el mensaje: {str(e)}"
        )