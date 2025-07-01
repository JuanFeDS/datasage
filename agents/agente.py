# hello_langchain.py

from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

from dotenv import load_dotenv

# from tools.read_files import read_csv
from tools.read_files import data_load
from tools.search_file import search_file
from tools.eda import group_by_column
from tools.visualization import create_visualization

from utils.agent_utils import print_stream

load_dotenv()

def create_agent():
    """Create a LangGraph agent that uses the Tavily search tool and a memory saver."""
    memory = MemorySaver()
    model = init_chat_model('gpt-4o')
    tools = [data_load, search_file, group_by_column, create_visualization]

    agent_executor = create_react_agent(
        model,
        tools,
        checkpointer = memory
    )

    config = {
        'configurable': {
            'thread_id': 'thread-1'
        }
    }

    with open('./prompts/agent_reader.txt', 'r', encoding='utf-8') as f:
        agent_prompt = f.read()

    input_message = {
        'role': 'system',
        'content': agent_prompt
    }

    print_stream(agent_executor, input_message, config, print_messages=False)

    return agent_executor
