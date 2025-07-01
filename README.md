# Datasage - Asistente de Análisis de Datos con IA

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Datasage es un agente de análisis de datos impulsado por IA que te ayuda a explorar, analizar y obtener información valiosa de tus conjuntos de datos de manera conversacional.

## 🚀 Características

- 📊 Análisis interactivo de datos mediante conversación natural
- 🔍 Búsqueda y carga de archivos
- 📈 Análisis exploratorio de datos (EDA) básico
- 🧠 Memoria de conversación para contexto continuo
- 🛠️ Integración con modelos de lenguaje avanzados (GPT-4)

## 📋 Requisitos Previos

- Python 3.8 o superior
- Cuenta de [OpenAI](https://platform.openai.com/) con acceso a la API
- Opcional: Entorno virtual (recomendado)

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/datasage.git
   cd datasage
   ```

2. Crea y activa un entorno virtual (opcional pero recomendado):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # En Windows
   # O en Linux/Mac: source venv/bin/activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Añade tu clave de API de OpenAI:
     ```
     OPENAI_API_KEY=tu_api_key_aquí
     ```

## 🚀 Uso

1. Asegúrate de que el archivo `.env` esté configurado correctamente.

2. Ejecuta la aplicación:
   ```bash
   python main.py
   ```

3. Interactúa con el agente usando lenguaje natural en la terminal.

## 🛠️ Estructura del Proyecto

```
datasage/
├── agents/           # Definición de agentes de IA
├── data/             # Conjuntos de datos de ejemplo
├── prompts/          # Plantillas de prompts para el agente
├── tools/            # Herramientas personalizadas
├── utils/            # Utilidades auxiliares
├── .env              # Variables de entorno
├── .gitignore
├── main.py           # Punto de entrada de la aplicación
└── README.md         # Este archivo
```

## 🤖 Comandos Disponibles

- **Cargar un archivo CSV**: "Carga el archivo X"
- **Explorar datos**: "Muestra las primeras filas"
- **Análisis básico**: "Resume las estadísticas"
- **Filtrar datos**: "Filtra por columna X"
- **Guardar resultados**: "Guarda el análisis"

