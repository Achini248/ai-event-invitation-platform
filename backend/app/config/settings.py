from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    gemini_api_key: str = ""
    environment: str = "development"
    log_level: str = "INFO"
    allowed_origins: str = "http://localhost:5173,https://ai-event-invitation-platform.vercel.app"

    # Derived paths
    @property
    def agenda_file_path(self) -> str:
        base = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(base, "../../data/agenda.txt")

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
