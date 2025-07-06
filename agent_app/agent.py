"""
Agente principal de Datasage para análisis de datos.
Proporciona una interfaz asíncrona para procesar mensajes del usuario.
"""

from typing import Dict, Any, AsyncIterator, Optional
from dataclasses import dataclass
from pathlib import Path
from dotenv import load_dotenv

from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain.schema.messages import AIMessage
from langchain_openai import ChatOpenAI

from agent_app.tools.data_input.read_files import data_load
from agent_app.tools.data_input.search_file import search_file
from agent_app.tools.eda import group_by_column
from agent_app.tools.charts.visualization import create_visualization

# Cargar variables de entorno
load_dotenv()

# Estructura de respuesta del agente
@dataclass
class AgentResponse:
    """Estructura para las respuestas del agente."""
    type: str
    content: str
    sender: str

# Clase principal del agente
class DatasageAgent:
    """Clase principal para el agente de Datasage."""
    def __init__(self, model_name: str = 'gpt-4o') -> None:
        self.model_name = model_name
        self.model = ChatOpenAI(model=model_name, temperature=0.7)
        self.tools = [data_load, search_file, group_by_column, create_visualization]
        self.memory = MemorySaver()
        self.system_prompt = self._load_prompt()
        self.agent = self._create_agent()

    def _load_prompt(self) -> str:
        """Carga el prompt del agente."""
        prompt_path = Path('./prompts/agent_reader.txt')
        if prompt_path.exists():
            return prompt_path.read_text(encoding='utf-8')

    def _create_agent(self):
        """Crea el agente con las herramientas."""
        return create_react_agent(
            model=self.model,
            tools=self.tools,
            checkpointer=self.memory
        )

    async def process_message(self, message: str, thread_id: str = 'default') -> AsyncIterator[Dict[str, Any]]:
        """Procesa un mensaje del usuario."""
        input_payload = {
            "messages": [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": message}
            ]
        }
        config = {"configurable": {"thread_id": thread_id}}

        async for chunk in self.agent.astream(input_payload, config):
            response = self._extract_response(chunk)
            if response:
                yield response.__dict__

    def _extract_response(self, chunk: dict) -> Optional[AgentResponse]:
        messages = None

        if 'messages' in chunk:
            messages = chunk['messages']
        elif 'agent' in chunk and 'messages' in chunk['agent']:
            messages = chunk['agent']['messages']
        elif 'output' in chunk:
            return AgentResponse(type='output', content=str(chunk['output']), sender='system')

        if messages:
            for msg in messages:
                if isinstance(msg, AIMessage):
                    return AgentResponse(type='message', content=msg.content, sender='assistant')

        return None

# ============================================
# Métodos auxiliares
# ============================================
def new_datasage_agent(model_name: str = 'gpt-4o') -> DatasageAgent:
    """Crea un agente con el modelo especificado."""
    return DatasageAgent(model_name=model_name)

async def run_agent_message_stream(
    agent: DatasageAgent,
    message: str,
    thread_id: str = 'default'
) -> AsyncIterator[Dict[str, Any]]:
    """Genera una respuesta en formato de stream."""
    async for chunk in agent.process_message(message, thread_id):
        yield chunk
