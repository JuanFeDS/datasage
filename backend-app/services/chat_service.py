"""
Servicio de chat para interactuar con el agente de IA.

Este módulo maneja la inicialización del agente y el procesamiento de mensajes,
proporcionando una interfaz limpia para la comunicación con el modelo de IA.
"""
import logging
import sys
from pathlib import Path
from typing import Any, AsyncGenerator, Dict, Optional

from dotenv import load_dotenv

# Configuración de logging
logger = logging.getLogger(__name__)

# Configuración de rutas
PROJECT_ROOT = Path(__file__).resolve().parent.parent
AGENT_APP_DIR = PROJECT_ROOT.parent / 'agent-app'

# Agregar rutas al path
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
if str(AGENT_APP_DIR) not in sys.path:
    sys.path.insert(0, str(AGENT_APP_DIR))

# Cargar variables de entorno
load_dotenv()

# Estado global del agente
_agent = None


class AgentError(Exception):
    """Excepción personalizada para errores del agente."""
    pass


class ChatService:
    """Servicio para manejar la interacción con el agente de IA."""
    
    def __init__(self):
        self._agent = None
    
    async def initialize(self) -> None:
        """Inicializa el agente de manera asíncrona.
        
        Raises:
            AgentError: Si hay un error al inicializar el agente.
        """
        global _agent
        
        if _agent is not None:
            return
            
        try:
            from agent import create_agent
            _agent = create_agent()
            logger.info("Agente inicializado correctamente")
        except ImportError as e:
            error_msg = f"No se pudo importar el módulo del agente: {e}"
            logger.error(error_msg)
            raise AgentError(error_msg) from e
        except Exception as e:
            error_msg = f"Error al inicializar el agente: {e}"
            logger.error(error_msg, exc_info=True)
            raise AgentError(error_msg) from e

    async def process_message(
        self,
        message: str,
        conversation_id: Optional[str] = None
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Procesa un mensaje usando el agente de IA.
        
        Args:
            message: Texto del mensaje a procesar.
            conversation_id: Identificador de la conversación (opcional).
            
        Yields:
            Diccionarios con la respuesta del agente en formato:
            {
                'type': 'message'|'error'|'status',
                'content': str,
                'sender': str
            }
            
        Raises:
            AgentError: Si hay un error al procesar el mensaje.
        """
        if not message or not isinstance(message, str):
            yield self._create_response(
                'error',
                'El mensaje no puede estar vacío y debe ser una cadena de texto',
                'system'
            )
            return

        try:
            await self.initialize()
            from agent import process_message as agent_process_message
            
            thread_id = conversation_id or 'default_thread'
            response_generator = agent_process_message(_agent, message, thread_id)
            
            async for chunk in response_generator:
                if not isinstance(chunk, dict) or 'type' not in chunk or 'content' not in chunk:
                    logger.warning(f"Formato de respuesta inesperado: {chunk}")
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


# Funciones de conveniencia para mantener compatibilidad
async def process_message(
    message: str,
    conversation_id: Optional[str] = None
) -> AsyncGenerator[Dict[str, Any], None]:
    """Función de conveniencia para procesar mensajes.
    
    Esta función está mantenida por compatibilidad con el código existente.
    Se recomienda usar la instancia de ChatService directamente en nuevo código.
    """
    async for response in chat_service.process_message(message, conversation_id):
        yield response
