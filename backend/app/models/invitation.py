from pydantic import BaseModel
from app.models.session import Session
from typing import Optional


class InvitationResponse(BaseModel):
    success: bool
    matched_session: Session
    email_subject: str
    email_body: str
    match_score: float
    mcp_triggered: bool = True

    @property
    def full_email(self) -> str:
        return f"Subject: {self.email_subject}\n\n{self.email_body}"
