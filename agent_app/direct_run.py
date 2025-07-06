"""
Prueba directa del agente sin necesidad de instalar el paquete.
"""
import asyncio
import sys
from pathlib import Path

# Asegurarse de que el directorio raíz esté en el path
sys.path.append(str(Path(__file__).parent))

# Importar directamente el módulo agent
from agent import new_datasage_agent, run_agent_message_stream

async def run_test():
    """
    Ejecuta una prueba directa del agente.
    """

    # Crear una instancia del agente
    agent = new_datasage_agent()

    # Mensaje de prueba
    test_message = "Hola, ¿puedes presentarte y decirme qué puedes hacer?"

    # Procesar el mensaje
    response_generator = run_agent_message_stream(agent, test_message)

    async for chunk in response_generator:
        if chunk.get('type') == 'message':
            print("\n[ASISTENTE]")
            print("-" * 12)
            print(chunk['content'])
            print("\n" + "-" * 50)
        elif chunk.get('type') == 'error':
            print(f"\n[ERROR] {chunk['content']}")

if __name__ == "__main__":
    asyncio.run(run_test())
