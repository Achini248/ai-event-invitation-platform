from fastapi import APIRouter
from app.utils.timestamp import utc_now_iso
from app.config.settings import get_settings

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    settings = get_settings()
    return {
        "status": "ok",
        "service": "Accelalpha Conference Platform API",
        "environment": settings.environment,
        "timestamp": utc_now_iso(),
    }
