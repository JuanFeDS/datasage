"""
Módulo para la lectura de diferentes formatos de archivos de datos.
Implementa el patrón fábrica para manejar múltiples formatos de manera elegante.
"""

from pathlib import Path
from typing import Union

import pandas as pd
from langchain_core.tools import tool

class FileReader:
    """
    Clase para leer diferentes formatos de archivos de datos.

    Atributos:
        file_path (Path): Ruta al archivo a leer.
        df (pd.DataFrame): DataFrame con los datos leídos.
    """

    def __init__(self, file_path: Union[str, Path]):
        """
        Inicializa el lector de archivos.

        Args:
            file_path: Ruta al archivo a leer.
        """
        self.file_path = Path(file_path)
        self.df = None

    def read_csv(self, sep: str, **kwargs) -> pd.DataFrame:
        """
        Lee un archivo CSV.

        Args:
            sep: Separador de columnas, generalmente seran: "," ";" "|" "\t".
            **kwargs: Argumentos adicionales para pd.read_csv().

        Returns:
            DataFrame con los datos leídos.
        """
        self.df = pd.read_csv(self.file_path, sep=sep, **kwargs)
        return self.df

    def read_excel(self, sheet_name: str = None, **kwargs) -> pd.DataFrame:
        """
        Lee un archivo Excel.

        Args:
            sheet_name: Nombre de la hoja a leer. Si es None, lee la primera.
            **kwargs: Argumentos adicionales para pd.read_excel().

        Returns:
            DataFrame con los datos leídos.
        """
        self.df = pd.read_excel(self.file_path, sheet_name=sheet_name, **kwargs)
        return self.df

    def read_json(self, orient: str = "records", **kwargs) -> pd.DataFrame:
        """
        Lee un archivo JSON.

        Args:
            orient: Orientación del JSON (records, split, index, etc.).
            **kwargs: Argumentos adicionales para pd.read_json().

        Returns:
            DataFrame con los datos leídos.
        """
        self.df = pd.read_json(self.file_path, orient=orient, **kwargs)
        return self.df

    def read_file(self, **kwargs) -> pd.DataFrame:
        """
        Lee un archivo detectando automáticamente su formato.

        Args:
            **kwargs: Argumentos adicionales para las funciones de lectura.

        Returns:
            DataFrame con los datos leídos.

        Raises:
            ValueError: Si el formato del archivo no es soportado.
        """
        suffix = self.file_path.suffix.lower()

        if suffix == ".csv":
            return self.read_csv(**kwargs)
        if suffix in (".xlsx", ".xls"):
            return self.read_excel(**kwargs)
        if suffix == ".json":
            return self.read_json(**kwargs)

        raise ValueError(f"Formato de archivo no soportado: {suffix}")


@tool
def data_load(file_path: str, **kwargs):
    """
    Herramienta para leer archivos de diferentes formatos.

    Args:
        file_path: Ruta al archivo a leer.
        **kwargs: Argumentos adicionales para la lectura.

    Returns:
        Diccionario con los datos leídos y metadatos.

    Raises:
        FileNotFoundError: Si el archivo no existe.
        ValueError: Si el formato no es soportado.
    """
    reader = FileReader(file_path)

    data = reader.read_file(**kwargs)

    return data
