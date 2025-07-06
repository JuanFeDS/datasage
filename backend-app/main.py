import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.chat import router as chat_router
from services.chat_service import chat_service

# from services.chat_service import agent

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Datasage API",
    description="API para el chat con el agente AI de Datasage",
    version="0.1.0"
)

# Configuración CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(chat_router, prefix="/api/v1/chat", tags=["chat"])

# Middleware para manejar errores globales
@app.middleware("http")
async def error_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.error(f"Error no manejado: {str(e)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"detail": f"Error interno del servidor: {str(e)}"}
        )

# Evento de inicio de la aplicación
@app.on_event("startup")
async def startup_event():
    try:
        logger.info("Inicializando el agente AI...")
        await chat_service.initialize()
        logger.info("Agente AI inicializado correctamente")
    except Exception as e:
        logger.error(f"Error al inicializar el agente AI: {str(e)}", exc_info=True)
        # No detenemos la aplicación, pero registramos el error
        # El agente se intentará inicializar nuevamente cuando se reciba el primer mensaje

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Datasage API is running",
        "docs": "/docs",
        "agent_status": "ready"
    }

@app.get("/health")
async def health_check():
    """Endpoint de verificación de estado"""
    return {
        "status": "ok" if agent is not None else "initializing",
        "service": "datasage-api"
    }