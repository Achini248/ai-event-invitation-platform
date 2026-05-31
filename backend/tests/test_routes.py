import pytest
import os, sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "timestamp" in data


def test_sessions_endpoint():
    response = client.get("/api/sessions")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 10
    assert len(data["sessions"]) == 10


def test_generate_invitation_missing_fields():
    response = client.post("/api/generate-invitation", json={})
    assert response.status_code == 422  # Unprocessable Entity


def test_generate_invitation_invalid_email():
    response = client.post("/api/generate-invitation", json={
        "name": "Test User",
        "email": "not-an-email",
        "interest": "supply chain AI automation"
    })
    assert response.status_code == 422


def test_generate_invitation_short_interest():
    response = client.post("/api/generate-invitation", json={
        "name": "Test User",
        "email": "test@example.com",
        "interest": "AI"
    })
    assert response.status_code == 422
