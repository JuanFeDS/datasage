import logging
from typing import Optional

# Configurar logging
logger = logging.getLogger(__name__)

# Importar el agente AI
# from ...agent.agents.agente import create_agent  # Ruta relativa al directorio raíz

# Inicializar el agente (descomentar cuando esté listo)
# agent = create_agent()

async def process_message(message: str, conversation_id: Optional[str] = None) -> str:
    """
    Procesa un mensaje del usuario usando el agente AI.
    
    Args:
        message: El mensaje del usuario
        conversation_id: ID opcional para mantener el contexto de la conversación
        
    Returns:
        str: La respuesta del agente AI
    """
    try:
        logger.info(f"Procesando mensaje (conversación: {conversation_id or 'nueva'}): {message[:100]}...")
        
        # TODO: Integrar con el agente AI real
        # response = agent.invoke({"input": message})
        # return response.get("output", "Lo siento, no pude generar una respuesta.")
        
        # Respuesta de ejemplo (eliminar cuando se integre el agente real)
        return f"Recibí tu mensaje: {message}. Este es un ejemplo de respuesta del agente AI."
        
    except Exception as e:
        logger.error(f"Error en process_message: {str(e)}", exc_info=True)
        raise Exception(f"Error al procesar el mensaje: {str(e)}")