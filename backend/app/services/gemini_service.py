from google import genai
from google.genai import types
from app.config.settings import get_settings
from app.models.visitor import VisitorRequest
from app.models.session import Session
from app.prompts.system_prompt import SYSTEM_PROMPT
from app.prompts.invitation_prompt import build_invitation_prompt
from app.utils.text_cleaner import extract_subject_and_body
from app.utils.logger import get_logger

logger = get_logger(__name__)


def generate_invitation(visitor: VisitorRequest, session: Session) -> tuple[str, str]:
    """
    Call Gemini to generate a personalised invitation email.
    Returns (subject, body) tuple.
    """

    settings = get_settings()

    # 🔴 API KEY CHECK
    if not settings.gemini_api_key:
        raise ValueError(
            "GEMINI_API_KEY is not set. Add it to your .env file or environment variables."
        )

    client = genai.Client(api_key=settings.gemini_api_key)
    prompt = build_invitation_prompt(visitor, session)

    logger.info(f"Calling Gemini for visitor: {visitor.email}")

    try:
        # 🔥 GEMINI CALL
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                max_output_tokens=600,
                temperature=0.4,
            ),
            contents=prompt,
        )

        raw_text = response.text.strip()

        subject, body = extract_subject_and_body(raw_text)

        if not subject:
            subject = f"Your Invitation to {session.title}"

        logger.info(f"Email generated successfully for {visitor.email}")
        return subject, body

    except Exception as e:
        logger.error(f"Gemini API error: {e}")

        # 🔥 SAFE FALLBACK (NO CRASH)
        subject = f"Invitation to {session.title}"

        body = f"""
Hello {visitor.name if hasattr(visitor, 'name') else 'Guest'},

We are excited to invite you to the session:

"{session.title}"

Session Details:
{session.description}

We look forward to your participation.

Best regards,
Conference Team
"""

        return subject, body