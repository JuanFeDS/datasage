    def line_plot(
        self,
        x: str,
        y: Union[str, List[str]],
        title: str = "Gráfico de Líneas",
        xaxis_title: Optional[str] = None,
        yaxis_title: Optional[str] = None,
        color: Optional[str] = None,
    ) -> go.Figure:
        """
        Crea un gráfico de líneas.

        Args:
            x: Nombre de la columna para el eje X.
            y: Nombre o lista de nombres de columnas para el eje Y.
            title: Título del gráfico.
            xaxis_title: Título personalizado para el eje X.
            yaxis_title: Título personalizado para el eje Y.
            color: Nombre de la columna para codificación por color.

        Returns:
            Objeto Figure de Plotly con el gráfico de líneas.
        """
        fig = px.line(
            self.df,
            x=x,
            y=y,
            color=color,
            title=title,
            color_discrete_sequence=self.color_discrete_sequence,
        )

        fig.update_layout(
            xaxis_title=xaxis_title or x,
            yaxis_title=yaxis_title or (y if isinstance(y, str) else ", ".join(y)),
            template="plotly_white",
        )

        return fig


    def scatter_plot(
        self,
        x: str,
        y: str,
        title: str = "Gráfico de Dispersión",
        xaxis_title: Optional[str] = None,
        yaxis_title: Optional[str] = None,
        color: Optional[str] = None,
        size: Optional[str] = None,
        hover_data: Optional[List[str]] = None,
    ) -> go.Figure:
        """
        Crea un gráfico de dispersión.

        Args:
            x: Nombre de la columna para el eje X.
            y: Nombre de la columna para el eje Y.
            title: Título del gráfico.
            xaxis_title: Título personalizado para el eje X.
            yaxis_title: Título personalizado para el eje Y.
            color: Nombre de la columna para codificación por color.
            size: Nombre de la columna para el tamaño de los puntos.
            hover_data: Lista de columnas adicionales para mostrar al pasar el ratón.

        Returns:
            Objeto Figure de Plotly con el gráfico de dispersión.
        """
        fig = px.scatter(
            self.df,
            x=x,
            y=y,
            color=color,
            size=size,
            hover_data=hover_data,
            title=title,
            color_discrete_sequence=self.color_discrete_sequence,
        )

        fig.update_layout(
            xaxis_title=xaxis_title or x,
            yaxis_title=yaxis_title or y,
            template="plotly_white",
        )

        return fig

    def box_plot(
        self,
        x: str,
        y: str,
        title: str = "Diagrama de Caja",
        xaxis_title: Optional[str] = None,
        yaxis_title: Optional[str] = None,
        color: Optional[str] = None,
    ) -> go.Figure:
        """
        Crea un diagrama de caja (box plot).

        Args:
            x: Nombre de la columna para el eje X (categorías).
            y: Nombre de la columna para el eje Y (valores).
            title: Título del gráfico.
            xaxis_title: Título personalizado para el eje X.
            yaxis_title: Título personalizado para el eje Y.
            color: Nombre de la columna para codificación por color.

        Returns:
            Objeto Figure de Plotly con el diagrama de caja.
        """
        fig = px.box(
            self.df,
            x=x,
            y=y,
            color=color,
            title=title,
            color_discrete_sequence=self.color_discrete_sequence,
        )

        fig.update_layout(
            xaxis_title=xaxis_title or x,
            yaxis_title=yaxis_title or y,
            template="plotly_white",
        )

        return fig
