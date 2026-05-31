from typing import List, Tuple
from app.models.session import Session
from app.services.agenda_parser import is_content_session
from app.utils.text_cleaner import tokenize
from app.utils.logger import get_logger

logger = get_logger(__name__)

# Stopwords to ignore in scoring
_STOPWORDS = {
    "the", "and", "for", "are", "with", "how", "our", "can",
    "we", "my", "in", "on", "to", "of", "a", "an", "is", "it",
    "at", "by", "be", "or", "as", "do", "up", "if", "no", "so"
}

# Field weights for scoring
_WEIGHTS = {
    "keyword": 4.0,
    "title": 2.5,
    "description": 1.0,
}


def _meaningful_tokens(text: str) -> List[str]:
    return [t for t in tokenize(text) if t not in _STOPWORDS]


def score_session(session: Session, query_tokens: List[str]) -> float:
    """Score a single session against the user's interest tokens."""
    if not is_content_session(session):
        return -1.0

    score = 0.0

    keyword_tokens = _meaningful_tokens(" ".join(session.keywords))
    title_tokens = _meaningful_tokens(session.title)
    desc_tokens = _meaningful_tokens(session.description)

    for token in query_tokens:
        if token in keyword_tokens:
            score += _WEIGHTS["keyword"]
        if token in title_tokens:
            score += _WEIGHTS["title"]
        if token in desc_tokens:
            score += _WEIGHTS["description"]

    return round(score, 2)


def match_best_session(interest: str, sessions: List[Session]) -> Tuple[Session, float]:
    """
    Return the (session, score) pair that best matches the visitor's interest.
    Falls back to the first content session if nothing scores positively.
    """
    query_tokens = _meaningful_tokens(interest)
    logger.debug(f"Query tokens: {query_tokens}")

    best_session: Session | None = None
    best_score: float = -999.0

    for session in sessions:
        s = score_session(session, query_tokens)
        logger.debug(f"  [{session.id}] '{session.title}' → {s}")
        if s > best_score:
            best_score = s
            best_session = session

    # Fallback: first content session
    if best_session is None or best_score <= 0:
        for session in sessions:
            if is_content_session(session):
                best_session = session
                best_score = 0.0
                break

    logger.info(f"Best match: '{best_session.title}' (score={best_score})")
    return best_session, best_score
