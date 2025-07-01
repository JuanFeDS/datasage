# agent_utils.py

def print_stream(agent, input_message, config, print_messages=True):
    """Print the stream of messages from the agent."""
    for step in agent.stream(
            {'messages': [input_message]},
            config,
            stream_mode='values'
        ):
        if print_messages:
            step['messages'][-1].pretty_print()

