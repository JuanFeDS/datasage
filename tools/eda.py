# eda.py
import pandas as pd

from langchain_core.tools import tool

@tool
def group_by_column(df_json: str, column_name: str) -> str:
    """
    Groups the DataFrame (in JSON format) by the specified column and returns the grouped result as JSON.
    """
    df = pd.read_json(df_json)
    grouped_df = df.groupby(column_name).count()
    return grouped_df.to_json()