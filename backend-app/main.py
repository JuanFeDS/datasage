from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat import router as chat_router

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

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Datasage API is running",
        "docs": "/docs"
    }