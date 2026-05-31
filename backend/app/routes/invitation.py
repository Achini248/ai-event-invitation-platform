import os
from fastapi import APIRouter, HTTPException, status
from app.models.visitor import VisitorRequest
from app.models.invitation import InvitationResponse
from app.services.agenda_parser import parse_agenda
from app.services.matcher import match_best_session
from app.services.gemini_service import generate_invitation
from app.services.mcp_trigger import send_draft_via_mcp
from app.config.settings import get_settings
from app.utils.logger import get_logger

router = APIRouter(tags=["Invitation"])
logger = get_logger(__name__)


def _agenda_path() -> str:
    settings = get_settings()
    return os.path.abspath(settings.agenda_file_path)


@router.post(
    "/generate-invitation",
    response_model=InvitationResponse,
    summary="Match visitor to a session and generate a personalised invitation email",
)
async def generate_invitation_endpoint(visitor: VisitorRequest):
    logger.info(f"New request — name={visitor.name!r}, email={visitor.email!r}")

    # 1. Parse agenda
    sessions = parse_agenda(_agenda_path())
    if not sessions:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Agenda data is unavailable. Please try again later.",
        )

    # 2. Match session
    matched_session, score = match_best_session(visitor.interest, sessions)
    if matched_session is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No content sessions found in agenda.",
        )

    # 3. Generate email via Gemini
    try:
        subject, body = generate_invitation(visitor, matched_session)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(e))

    # 4. MCP automation trigger — always runs after generation
    full_email = f"Subject: {subject}\n\n{body}"
    send_draft_via_mcp(visitor.email, full_email)

    return InvitationResponse(
        success=True,
        matched_session=matched_session,
        email_subject=subject,
        email_body=body,
        match_score=score,
        mcp_triggered=True,
    )


@router.get(
    "/sessions",
    summary="Return all parsed agenda sessions",
)
async def list_sessions():
    sessions = parse_agenda(_agenda_path())
    return {"count": len(sessions), "sessions": sessions}
