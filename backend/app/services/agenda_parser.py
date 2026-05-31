import re
import os
from typing import List
from app.models.session import Session
from app.utils.logger import get_logger

logger = get_logger(__name__)

# Sessions that are logistics/social — deprioritised for matching
NON_CONTENT_TITLES = {
    "registrations", "coffee break", "lunch & networking",
    "welcome note", "q&a and closing remarks"
}

_SESSION_TYPE_MAP = {
    "keynote": "keynote",
    "panel": "panel",
    "coffee": "break",
    "lunch": "networking",
    "registration": "logistics",
    "welcome": "opening",
    "q&a": "closing",
    "closing": "closing",
}


def _infer_type(title: str) -> str:
    t = title.lower()
    for keyword, stype in _SESSION_TYPE_MAP.items():
        if keyword in t:
            return stype
    return "session"


def parse_agenda(file_path: str) -> List[Session]:
    """
    Parse agenda.txt into a list of Session objects.
    Each [SESSION_N] block is parsed by its field labels.
    """
    if not os.path.exists(file_path):
        logger.error(f"Agenda file not found: {file_path}")
        return []

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.split(r"\[SESSION_\d+\]", content)
    ids = re.findall(r"\[SESSION_(\d+)\]", content)

    sessions: List[Session] = []

    for idx, block in enumerate(blocks[1:]):
        lines = [ln.strip() for ln in block.strip().splitlines() if ln.strip()]
        raw: dict = {"id": int(ids[idx]) if idx < len(ids) else idx + 1}

        for line in lines:
            if line.startswith("Time:"):
                raw["time"] = line[5:].strip()
            elif line.startswith("Title:"):
                raw["title"] = line[6:].strip()
            elif line.startswith("Speaker:"):
                raw["speaker"] = line[8:].strip()
            elif line.startswith("Focus Keywords:"):
                raw["keywords"] = [k.strip() for k in line[15:].split(",")]
            elif line.startswith("Description:"):
                raw["description"] = line[12:].strip()

        if "title" not in raw:
            continue

        raw["session_type"] = _infer_type(raw.get("title", ""))

        try:
            session = Session(
                id=raw["id"],
                time=raw.get("time", "TBC"),
                title=raw["title"],
                speaker=raw.get("speaker", "TBC"),
                keywords=raw.get("keywords", []),
                description=raw.get("description", ""),
                session_type=raw["session_type"],
            )
            sessions.append(session)
        except Exception as e:
            logger.warning(f"Skipping malformed session block {idx + 1}: {e}")

    logger.info(f"Parsed {len(sessions)} sessions from {os.path.basename(file_path)}")
    return sessions


def is_content_session(session: Session) -> bool:
    return session.title.lower().strip() not in NON_CONTENT_TITLES
