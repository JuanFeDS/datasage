# main.py
from dotenv import load_dotenv

from agents.agente import create_agent

from utils.agent_utils import print_stream

load_dotenv()

def run():
    """Run the LangGraph agent."""
    agent = create_agent()

    config = {
        'configurable': {
            'thread_id': 'thread-1'
        }
    }

    input_message = {
        'role': 'user',
        'content': 'Hola, me gustaría ver que datos tienes de los personajes de Harry Potter'
    }

    print_stream(agent, input_message, config)

    # input_message = {
    #     'role': 'user',
    #     'content': '¿Cuántos personajes son de Gryffindor?'
    # }

    # print_stream(agent, input_message, config)

    input_message = {
        'role': 'user',
        'content': 'Has una agrupación de la distribución de personajes por House y descargala en un .csv'
    }

    print_stream(agent, input_message, config)



if __name__ == '__main__':
    run()