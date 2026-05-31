# Accelalpha Conference Platform

**ACCELALPHA × ORACLE 2024 — Troubled Waters: Sailing with AI in Supply Chain**

AI-powered conference event platform that matches a visitor's professional interest to the most relevant session, generates a personalised B2B invitation email via Gemini AI, and simulates MCP automation logging.

---

## Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React 18 + Vite, Tailwind CSS, Framer Motion |
| Backend    | Python FastAPI, Pydantic v2, Gemini 1.5 Flash |
| Deployment | Vercel (frontend) · Render (backend)        |

---

## Folder Structure

```
accelalpha-conference-platform/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── common/      Navbar, Footer, Button, LoadingSpinner
│       │   ├── sections/    HeroSection, AboutSection, AgendaSection,
│       │   │                SpeakersSection, RegistrationForm
│       │   └── ui/          AgendaCard, SpeakerCard, SessionTag, ThemeToggle
│       ├── hooks/           useTheme, useFormSubmit
│       ├── services/        api.js, invitationService.js
│       ├── utils/           constants, validators, formatDate, motionVariants
│       └── styles/          index.css, animations.css
├── backend/
│   └── app/
│       ├── config/          settings.py, cors.py
│       ├── models/          visitor.py, session.py, invitation.py
│       ├── prompts/         system_prompt.py, invitation_prompt.py
│       ├── routes/          invitation.py, health.py
│       ├── services/        agenda_parser.py, matcher.py,
│       │                    gemini_service.py, mcp_trigger.py
│       └── utils/           logger.py, timestamp.py, text_cleaner.py
├── agenda.txt
└── REPORT.md
```

---

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env          # add GEMINI_API_KEY
uvicorn app.main:app --reload
# → http://localhost:8001
# → http://localhost:8001/docs
```

### Frontend

```bash
cd frontend
npm install
# .env.example is pre-configured for localhost
cp .env.example .env
npm run dev
# → http://localhost:5173
```

---

## API Endpoints

| Method | Path                      | Description                              |
|--------|---------------------------|------------------------------------------|
| GET    | `/api/health`             | Health check                             |
| GET    | `/api/sessions`           | All 10 parsed agenda sessions            |
| POST   | `/api/generate-invitation`| Match + generate + MCP trigger           |

### POST `/api/generate-invitation`

```json
// Request
{ "name": "Sarah Al-Rashid", "email": "sarah@example.com", "interest": "AI-powered demand forecasting" }

// Response
{
  "success": true,
  "matched_session": { "id": 5, "title": "The Resilient Supply Chain & SCM Innovations", ... },
  "email_subject": "Your Invitation to ACCELALPHA-ORACLE-2024...",
  "email_body": "Dear Sarah, ...",
  "match_score": 13.0,
  "mcp_triggered": true
}
```

---

## Deployment

See `REPORT.md` for full deployment instructions and live URLs.

Getting a Gemini API key: [aistudio.google.com](https://aistudio.google.com) → Get API Key → free tier available.
