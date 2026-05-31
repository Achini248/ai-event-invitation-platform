# REPORT.md

**Full-Stack Developer Intern Assessment Submission**
**Project:** Accelalpha Conference Platform — AI-Powered Event Personalization

---

## 1. Live Gateways

| Service           | URL                                                              |
|-------------------|------------------------------------------------------------------|
| 🌐 Live Frontend  | https://ai-event-invitation-platform.vercel.app |
| ⚙️ Backend API    | https://ai-event-invitation-platform.onrender.com |
| 📋 API Docs       | https://ai-event-invitation-platform.onrender.com/docs |
| 💚 Health Check   | https://ai-event-invitation-platform.onrender.com/api/health |

---

## 2. Local Setup Guide

### Prerequisites
- Node.js 18+
- Python 3.10+
- Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Clone

```bash
git clone https://github.com/Achini248/ai-event-invitation-platform.git
cd ai-event-invitation-platform
```

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Open .env and set: GEMINI_API_KEY=your_key_here
uvicorn app.main:app --reload --port 8001
```

Verify: open `http://localhost:8001/api/health`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# .env already points to http://localhost:8001/api — no changes needed for local dev
npm run dev
```

Visit `http://localhost:5173`

### Run tests

```bash
cd backend
pytest tests/ -v
```

---

## 3. Content Creation Check (LinkedIn Post)

> 🚀 What if your conference invitation was written by AI — tailored to your exact career challenges? We built an interactive event platform for the ACCELALPHA × ORACLE 2024 Supply Chain Summit that reads your professional focus, matches you to the right session, and delivers a personalised B2B invitation in seconds. Corporate event planners: this is what modern attendee personalisation at scale actually looks like. See it live → https://ai-event-invitation-platform.vercel.app #SupplyChain #AI #EventTech #Oracle

---

## 4. Prompt Strategy

The LLM prompt is structured in two layers to guarantee zero hallucination. The **system prompt** (`system_prompt.py`) establishes six absolute rules that the model must never violate: use only data explicitly provided, copy session title/time/speaker verbatim, omit any uncertain fact rather than guess, avoid all placeholder text, and stay within 200–280 words. The **user-turn prompt** (`invitation_prompt.py`) then wraps every factual data point — visitor name, interest, session title, time, speaker, description, and keywords — inside clearly labelled blocks with a `=== SESSION DATA ===` delimiter, so the model has a precise factual boundary and nothing to invent. This combination of explicit prohibition at system level and strict data fencing at user level reliably eliminates hallucinated sessions, speakers, or topics in every generation.

---

## 5. Architecture

```
Browser (Vercel)
   │  POST /api/generate-invitation
   ▼
FastAPI (Render)
   │
   ├── agenda_parser.py  →  reads data/agenda.txt  →  10 Session objects
   ├── matcher.py        →  keyword RAG scoring    →  best Session + score
   ├── gemini_service.py →  Gemini 1.5 Flash       →  (subject, body)
   └── mcp_trigger.py    →  send_draft_via_mcp()   →  stdout + logger
```

---

## 6. MCP Automation

`send_draft_via_mcp(email_address, email_body)` in `backend/app/services/mcp_trigger.py` fires automatically after every successful generation, printing:

```
========================================================================
  [MCP AUTOMATION TRIGGER] — Draft Email Dispatched
========================================================================
  Timestamp  : 2024-11-15 09:32:41 UTC
  Recipient  : delegate@company.com
========================================================================
  Email Body :

  Subject: Your Invitation to ACCELALPHA-ORACLE-2024 ...
  ...
========================================================================
```
