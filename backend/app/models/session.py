from pydantic import BaseModel
from typing import List, Optional


class Session(BaseModel):
    id: int
    time: str
    title: str
    subtitle: Optional[str] = None
    speaker: str
    keywords: List[str] = []
    description: str
    session_type: str = "session"
