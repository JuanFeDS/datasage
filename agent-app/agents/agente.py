# hello_langchain.py

from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

from dotenv import load_dotenv

# from tools.read_files import read_csv
from tools.data_input.read_files import data_load
from tools.data_input.search_file import search_file
from tools.eda import group_by_column
from tools.charts.visualization import create_visualization

from utils.agent_utils import print_stream

load_dotenv()

def create_agent():
    """Create a LangGraph agent that uses the Tavily search tool and a memory saver."""
    memory = MemorySaver()
    
    # Cargar el prompt del sistema
    with open('./prompts/agent_reader.txt', 'r', encoding='utf-8') as f:
        system_prompt = f.read()
    
    # Inicializar el modelo con el prompt del sistema
    model = init_chat_model('gpt-4o', system_message=system_prompt)
    
    # Definir las herramientas disponibles
    tools = [data_load, search_file, group_by_column, create_visualization]

    # Crear el agente con las herramientas
    agent_executor = create_react_agent(
        model,
        tools,
        checkpointer=memory
    )

    return agent_executor
