from app.models.visitor import VisitorRequest
from app.models.session import Session


def build_invitation_prompt(visitor: VisitorRequest, session: Session) -> str:
    """
    Construct the user-turn prompt for Gemini.
    All factual data is passed explicitly — the model has nothing to invent.
    """
    keywords_str = ", ".join(session.keywords) if session.keywords else "N/A"

    return f"""Write a personalised B2B invitation email using ONLY the information below.

=== VISITOR PROFILE ===
Name          : {visitor.name}
Email         : {visitor.email}
Professional Focus / Challenges : {visitor.interest}

=== EVENT DETAILS ===
Event Name    : ACCELALPHA-ORACLE-2024
Event Theme   : Troubled Waters: Sailing with AI in Supply Chain
Format        : In-person corporate summit, Dubai

=== MATCHED SESSION — USE ONLY THIS DATA ===
Session Title : {session.title}
Session Time  : {session.time}
Speaker       : {session.speaker}
Description   : {session.description}
Focus Topics  : {keywords_str}
=== END SESSION DATA ===

Instructions:
- Explain why THIS specific session directly addresses the visitor's stated challenges.
- Mention the session title, time, and speaker name exactly as written above.
- Do NOT reference any other session or speaker not listed here.
- Keep the email between 200 and 280 words.
- Start your output with: Subject: <subject line>
"""
