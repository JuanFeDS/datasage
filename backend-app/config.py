from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Configuración de la API
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Datasage API"
    
    # Configuración de CORS
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    # Configuración del agente AI
    AGENT_TIMEOUT: int = 30  # segundos
    
    class Config:
        case_sensitive = True
        env_file = ".env"

# Instancia de configuración
settings = Settings()