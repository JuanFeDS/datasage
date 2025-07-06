# histogram.py
from typing import Optional, List

import pandas as pd
import plotly.express as px
from plotly import graph_objects as go

def histogram(
    df: pd.DataFrame,
    x: str,
    nbins: Optional[int] = None,
    title: str = "Histograma",
    xaxis_title: Optional[str] = None,
    yaxis_title: str = "Frecuencia",
    color: Optional[str] = None,
    color_discrete_sequence: Optional[List[str]] = None,
) -> go.Figure:
    """
    Crea un histograma.

    Args:
        x: Nombre de la columna para el histograma.
        nbins: Número de bins para el histograma.
        title: Título del gráfico.
        xaxis_title: Título personalizado para el eje X.
        yaxis_title: Título personalizado para el eje Y.
        color: Nombre de la columna para codificación por color.
        
    Returns:
        Objeto Figure de Plotly con el histograma.
    """
    fig = px.histogram(
        df,
        x=x,
        nbins=nbins,
        color=color,
        title=title,
        color_discrete_sequence=color_discrete_sequence,
    )

    fig.update_layout(
        xaxis_title=xaxis_title or x,
        yaxis_title=yaxis_title,
        template="plotly_white",
        bargap=0.1,
    )

    return fig
