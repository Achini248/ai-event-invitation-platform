from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config.cors import configure_cors
from app.routes.invitation import router as invitation_router
from app.routes.health import router as health_router
from app.utils.logger import get_logger

logger = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Accelalpha Conference Platform API started.")
    yield
    logger.info("Accelalpha Conference Platform API shutting down.")


app = FastAPI(
    title="Accelalpha Conference Platform API",
    description=(
        "AI-powered event personalization backend for ACCELALPHA-ORACLE-2024. "
        "Matches visitor interests to conference sessions and generates personalised "
        "B2B invitation emails via Gemini AI."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

configure_cors(app)

app.include_router(invitation_router, prefix="/api")
app.include_router(health_router, prefix="/api")


@app.get("/", include_in_schema=False)
async def root():
    return {
        "service": "Accelalpha Conference Platform API",
        "docs": "/docs",
        "health": "/api/health",
    }
