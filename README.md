# Datasage - Asistente de Análisis de Datos con IA

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Datasage es una plataforma avanzada de análisis de datos impulsada por IA que te ayuda a explorar, analizar y obtener información valiosa de tus datos a través de una interfaz de chat intuitiva.

## 🚀 Características

- 💬 Interfaz de chat interactiva para análisis de datos
- 📊 Exploración y visualización de datos en tiempo real
- 🤖 Análisis y conocimientos potenciados por IA
- 🔄 Backend asíncrono para respuestas rápidas
- 🎨 Interfaz de usuario moderna y receptiva con Material-UI
- 🧩 Arquitectura modular para fácil mantenimiento

## 🏗️ Estructura del Proyecto

```
datasage/
├── agent-app/           # Aplicación del agente de IA
├── backend-app/         # Servicio backend con FastAPI
│   ├── api/             # Puntos finales de la API
│   ├── services/        # Lógica de negocio
│   ├── main.py          # Punto de entrada de la aplicación FastAPI
│   └── requirements.txt # Dependencias de Python
├── frontend-app/        # Frontend en React
│   ├── public/          # Archivos estáticos
│   ├── src/
│   │   ├── components/  # Componentes de React
│   │   ├── services/    # Servicios de API
│   │   └── App.js       # Componente principal de la aplicación
│   └── package.json     # Dependencias de Node.js
└── README.md            # Este archivo
```

## 📋 Requisitos Previos

- Python 3.8 o superior
- Node.js 16 o superior
- npm o yarn
- Clave de API de OpenAI (para funciones de IA)
- (Opcional) Entorno virtual para Python

## 🛠️ Instalación

### Configuración del Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanFeDS/datasage.git
   cd datasage/backend-app
   ```

2. Crea y activa un entorno virtual (recomendado):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. Instala las dependencias de Python:
   ```bash
   pip install -r requirements.txt
   ```

4. Configura las variables de entorno:
   - Copia `.env.example` a `.env`
   - Añade tu clave de API de OpenAI:
     ```
     OPENAI_API_KEY=tu_clave_aqui
     ```

### Configuración del Frontend

1. Navega al directorio del frontend:
   ```bash
   cd ../frontend-app
   ```

2. Instala las dependencias de Node.js:
   ```bash
   npm install
   # o
   yarn install
   ```

## 🚀 Ejecutando la Aplicación

### Iniciar el Backend

Desde el directorio `backend-app`:
```bash
uvicorn main:app --reload
```

La API estará disponible en `http://localhost:8000`

### Iniciar el Frontend

Desde el directorio `frontend-app`:
```bash
npm start
# o
yarn start
```

La aplicación se abrirá en tu navegador predeterminado en `http://localhost:3000`

## 🌐 Documentación de la API

Una vez que el backend esté en ejecución, puedes acceder a:
- Documentación interactiva: `http://localhost:8000/docs`
- Documentación alternativa: `http://localhost:8000/redoc`

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de enviar un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [FastAPI](https://fastapi.tiangolo.com/) - El framework web utilizado
- [React](https://reactjs.org/) - Biblioteca para el frontend
- [Material-UI](https://mui.com/) - Componentes de UI para React
- [OpenAI](https://openai.com/) - Modelos de IA

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

