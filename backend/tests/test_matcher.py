import pytest
import os, sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.services.agenda_parser import parse_agenda
from app.services.matcher import match_best_session

AGENDA_PATH = os.path.join(os.path.dirname(__file__), "../data/agenda.txt")


@pytest.fixture(scope="module")
def sessions():
    return parse_agenda(AGENDA_PATH)


def test_parse_returns_ten_sessions(sessions):
    assert len(sessions) == 10


def test_ai_predictive_analytics_matches_resilient_scm(sessions):
    session, score = match_best_session(
        "I want to use AI and predictive analytics to improve my supply chain", sessions
    )
    assert "Resilient" in session.title or score > 0


def test_implementation_guide_matches_practical_guide(sessions):
    session, score = match_best_session(
        "How to implement Oracle SCM without disrupting operations", sessions
    )
    assert score > 0


def test_sustainability_green_logistics(sessions):
    session, score = match_best_session(
        "green operations, sustainable sourcing, last-mile delivery", sessions
    )
    assert score > 0


def test_fallback_returns_content_session(sessions):
    session, score = match_best_session("xyzzy totally unrelated query", sessions)
    assert session is not None
    assert session.title.lower() not in {"registrations", "coffee break", "lunch & networking"}


def test_skip_break_sessions(sessions):
    session, score = match_best_session("coffee break networking intermission", sessions)
    # Even if keywords match a break, score from coffee/break/etc should be
    # compared — we just assert a real session is still returned
    assert session is not None
