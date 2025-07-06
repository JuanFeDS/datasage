# search_file.py
import os

from langchain_core.tools import tool

@tool
def search_file(file_path: str):
    """Search for files in a given directory."""
    files = os.listdir(file_path)
    return files
