"""
Módulo para visualización de datos interactivos con Plotly.
Proporciona una interfaz sencilla para crear gráficos comunes de análisis exploratorio.
"""
import os
from typing import Dict, Any

import pandas as pd

import plotly.express as px
import plotly.graph_objects as go

from langchain_core.tools import tool

from agent_app.tools.charts.bar_plot import bar_plot
from agent_app.tools.charts.histogram import histogram

class DataVisualizer:
    """
    Clase para crear visualizaciones interactivas usando Plotly.

    Atributos:
        df (pd.DataFrame): DataFrame con los datos a visualizar.
        color_discrete_sequence: Esquema de colores para las visualizaciones.
    """

    def __init__(self, df: pd.DataFrame):
        """
        Inicializa el visualizador con un DataFrame.

        Args:
            df: DataFrame de pandas con los datos a visualizar.
        """
        self.df = df
        self.color_discrete_sequence = px.colors.qualitative.Plotly

    def save_figure(
        self,
        fig: go.Figure,
        filename: str = "plot",
        width: int = 800,
        height: int = 600,
        scale: float = 1.0,
    ):
        """
        Guarda una figura de Plotly en un archivo de imagen.

        Args:
            fig: Figura de Plotly a guardar.
            filename: Nombre base del archivo (sin extensión).
            width: Ancho de la imagen en píxeles.
            height: Alto de la imagen en píxeles.
            scale: Factor de escala para la imagen.

        Returns:
            Tupla (success, message) indicando si la operación fue exitosa y un mensaje.
        """
        # Asegurar que el directorio de salida exista
        output_dir = "output/plots"
        os.makedirs(output_dir, exist_ok=True)

        # Construir la ruta completa del archivo
        filepath = os.path.join(output_dir, f"{filename}.png")

        # Guardar la figura
        fig.write_image(
            filepath, format="png", width=width, height=height, scale=scale
        )

@tool
def create_visualization(
    df_json: Dict[str, Any], plot_type: str, **kwargs
) -> Dict[str, Any]:
    """
    Crea una visualización interactiva a partir de un DataFrame serializado en JSON.
    """
    df = pd.DataFrame(df_json)
    visualizer = DataVisualizer(df)

    plot_type = plot_type.lower()

    if plot_type == "bar":
        fig = bar_plot(df, **kwargs)
    elif plot_type == "histogram":
        fig = histogram(df, **kwargs)
    else:
        raise ValueError(f"Tipo de gráfico no soportado: {plot_type}")

    visualizer.save_figure(fig, f"{plot_type}_plot")
