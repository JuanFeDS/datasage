"""
Servicio de chat para interactuar con el agente de IA.
"""
import sys
import logging
from typing import Any, AsyncGenerator, Dict, Optional

from dotenv import load_dotenv

sys.path.append('../')

from agent_app.agent import new_datasage_agent
from agent_app.agent import run_agent_message_stream

# Cargar variables de entorno
load_dotenv()

# Configuración de logging
logger = logging.getLogger(__name__)

class ChatService:
    """Servicio para manejar la interacción con el agente de IA."""

    def __init__(self):
        self.agent = None

    async def initialize(self) -> None:
        """Inicializa el agente si aún no ha sido creado."""
        if self.agent is None:
            self.agent = new_datasage_agent()
            logger.info("Agente de IA inicializado.")

    async def process_message(
        self,
        message: str,
        conversation_id: Optional[str] = 'default_thread'
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Procesa un mensaje usando el agente de IA.
        
        Args:
            message: Texto del mensaje a procesar.
            conversation_id: Identificador de la conversación (opcional).
            
        Yields:
            Diccionarios con la respuesta del agente en formato:
                'type': 'message'|'error'|'status',
                'content': str,
                'sender': str
        """
        try:
            await self.initialize()

            thread_id = conversation_id
            response_generator = run_agent_message_stream(self.agent, message, thread_id)

            async for chunk in response_generator:
                if not isinstance(chunk, dict) or 'type' not in chunk or 'content' not in chunk:
                    continue
                yield self._create_response(
                    chunk['type'],
                    chunk['content'],
                    chunk.get('sender', 'assistant')
                )

        except Exception as e:
            error_msg = f"Error al procesar el mensaje: {str(e)}"
            logger.error(error_msg, exc_info=True)
            yield self._create_response('error', error_msg, 'system')

    @staticmethod
    def _create_response(
        msg_type: str,
        content: str,
        sender: str
    ) -> Dict[str, str]:
        """Crea un diccionario de respuesta estandarizado."""
        return {
            'type': msg_type,
            'content': str(content) if content else '',
            'sender': sender
        }

# Instancia global del servicio de chat
chat_service = ChatService()

# Función de conveniencia para compatibilidad
async def process_message(
    message: str,
    conversation_id: Optional[str] = None
) -> AsyncGenerator[Dict[str, Any], None]:
    """Función de conveniencia para procesar mensajes."""
    async for response in chat_service.process_message(message, conversation_id):
        yield response
