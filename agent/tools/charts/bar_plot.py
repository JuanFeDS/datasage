# bar_plot.py
from typing import Optional

import pandas as pd

import plotly.express as px
from plotly.graph_objects import Figure

def bar_plot(
    df: pd.DataFrame,
    x: str,
    y: str,
    title: str = "Gráfico de Barras",
    xaxis_title: Optional[str] = None,
    yaxis_title: Optional[str] = None,
    color: Optional[str] = None,
    barmode: str = "relative",
) -> Figure:
    """
    Crea un gráfico de barras.

    Args:
        x: Nombre de la columna para el eje X.
        y: Nombre de la columna para el eje Y.
        title: Título del gráfico.
        xaxis_title: Título personalizado para el eje X.
        yaxis_title: Título personalizado para el eje Y.
        color: Nombre de la columna para codificación por color.
        barmode: Modo de las barras ('group', 'stack', 'relative', etc.).

    Returns:
        Objeto Figure de Plotly con el gráfico de barras.
    """
    fig = px.bar(
        df,
        x=x,
        y=y,
        color=color,
        title=title,
        color_discrete_sequence=self.color_discrete_sequence,
        barmode=barmode,
    )

    fig.update_layout(
        xaxis_title=xaxis_title or x,
        yaxis_title=yaxis_title or y,
        template="plotly_white",
    )

    return fig


