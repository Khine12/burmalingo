# BurmaLingo

**Live:** https://burmalingo.vercel.app

An English-learning web app built specifically for Burmese speakers — by a Burmese immigrant who lived this problem from both sides. Live in production with paying subscribers.

---

## The Problem

In Myanmar, a single level of English class from a well-known teacher costs roughly half a month's basic salary — for a seat in a 100-person Zoom class where the teacher doesn't know your name. Cheaper video courses cover only one level with no structured progression. YouTube is free but completely unstructured. And even when a Burmese learner finds an English app, it wasn't built for them — the explanations assume you already think in English.

BurmaLingo is the structured, affordable alternative — grammar explained *in Burmese*, a curriculum that builds level by level, and AI feedback on reading, writing, speaking, and listening.

## The Founder's Path

Self-study → Zoom classes → IELTS prep → moved to the US in February 2023 → 3 years living and working in an English environment.

That full journey — knowing what worked at each stage and what was a waste of money — is what this curriculum is built from.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS → Vercel |
| Backend | FastAPI (Python) → Railway |
| Database | PostgreSQL → Neon |
| Migrations | Alembic |
| Auth | JWT + email verification |
| Payments | Stripe + manual upgrade for Myanmar users |
| AI Feedback | OpenAI GPT-4o |
| Speech / Pronunciation | Azure AI Speech + ffmpeg (audio conversion) |
| Listening Audio | Azure HD neural voices (TTS) + Azure Blob Storage |
| Email | Resend |
| CI/CD | GitHub Actions |

## Curriculum

| Level | Name | Status |
|---|---|---|
| 1 | Basic | ✅ Live |
| 2 | Elementary | ✅ Live |
| 3 | Pre-Intermediate | ✅ Live |
| 4 | Intermediate | ✅ Live |
| 5 | Upper-Intermediate | ✅ Live |
| 6 | IELTS Preparation | ✅ Live |

## What's Built

**Listening Practice** *(new)* — Audio comprehension across two tracks: **General Listening** (Basic → Upper-Intermediate) and **IELTS Listening** (IELTS Preparation) — ~60 lessons in total. Each lesson pairs a natural dialogue or monologue with **15 questions** (fill-in-blank, True/False, and multiple choice) and instant grading. Audio is **pre-generated** with **Azure HD neural voices** — multiple speakers per conversation for realistic two- and three-person scenes — stored in **Azure Blob Storage** and streamed as static MP3 for instant playback. Playback speed scales by level, from a gentle pace for beginners up to full IELTS exam pace. The IELTS track covers all four listening section types: social enquiries, information monologues, academic tutorials, and lectures.

**Speaking Practice** — Record yourself responding to a prompt; the app converts your audio (WebM → 16 kHz WAV via ffmpeg) and runs Azure AI Speech unscripted pronunciation assessment, scoring **accuracy, fluency, completeness, and prosody** on your actual speech — combined with GPT-4o for grammar and topic feedback. ~60 prompts organized by level from Basic to IELTS. Pro: 25 sessions/month.

**Grammar Practice** — Multiple choice and fill-in-blank lessons across all levels, Basic through Upper-Intermediate. One question at a time with instant feedback and clear explanations in simple English.

**General Reading** — Real-life passages about living in an English-speaking world: going to the doctor, renting an apartment, taking the bus, starting a new job. Multiple choice, True/False/Not Given, fill-in-blank, and vocabulary questions.

**General Writing** — Topics across all levels, Basic through Upper-Intermediate, with AI feedback: grammar corrections, star rating, and a model answer. Structured outlines provided for emails and letters. Relevance check detects off-topic answers before grading.

**IELTS Writing Practice** — 35 Task 2 topics with GPT-4o band scoring across all 4 IELTS criteria. Feedback references exact phrases from the student's writing. Relevance check included.

**IELTS Reading Practice** — Academic-style passages with True/False/Not Given, multiple choice, fill-in-blank, and paragraph matching. Instant results with explanations.

**Vocabulary & Daily English** — Daily Phrases (greetings, requests, shopping, directions, doctor visits, phone calls, making plans, feelings, restaurants, interviews, travel, weather) and Common Words (family, food, numbers, colors, and more).

**Level Test** — 35-question placement test to find your starting level automatically.

**XP & Progress System** — 10 XP per session, daily streak tracking, weekly goals, and 6 progression levels from Beginner to IELTS Ready.

**Payments** — $7/month Pro subscription (30% off the $10 regular price) with a 3-day free trial and webhook-based tier control. Myanmar users pay via KBZPay / Wave Money through Facebook with manual tier upgrade.

**Usage Metering** — Per-user quotas with automatic period resets; the Pro speaking quota is synced to Stripe billing periods (and to manual periods for Myanmar users).

**Email Verification & Password Reset** — Verification email sent on registration via Resend; password reset flow with time-limited tokens.

**Admin Dashboard** — Manual Pro upgrade/downgrade by email, user list, and feedback viewer.

## Free vs Pro

| Feature | Free | Pro |
|---|---|---|
| Writing — IELTS + General combined | 3 per 2 weeks | Unlimited |
| Reading — IELTS + General combined | 3 per 2 weeks | Unlimited |
| Listening — General + IELTS combined | 1 lesson per week | Unlimited |
| Grammar | 1 lesson per week | Unlimited |
| Vocabulary & Phrases | 1 lesson per week | Unlimited |
| Speaking — AI pronunciation scoring | ❌ | 25 sessions/month |
| Level Test | Once only | Retake anytime |
| AI feedback & band scores | ❌ | ✅ |

**$7/month · 3-day free trial · Cancel anytime**

> Myanmar users: KBZPay / Wave Money via Facebook → manual tier upgrade

## Local Setup

**Backend**

```bash
cd backend
python -m venv venv
# Windows (PowerShell): .\venv\Scripts\Activate.ps1
# Mac/Linux:            source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head          # apply database migrations
uvicorn app.main:app --reload
```

> Requires **ffmpeg** installed and on your PATH — used by the Speaking feature to convert recorded audio.

API: http://localhost:8000 · Docs: http://localhost:8000/docs

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

**Seeding listening audio** *(optional)*

```bash
cd backend
# Generates audio via Azure TTS, uploads to Blob Storage, and seeds lessons + questions
python scripts/seed_listening.py
```

**Tests**

```bash
cd backend
pytest tests/ -v
```

## Environment Variables

```
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
OPENAI_API_KEY=
AZURE_SPEECH_KEY=
AZURE_SPEECH_REGION=
AZURE_STORAGE_CONNECTION_STRING=
AZURE_STORAGE_CONTAINER=listening-audio
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
ADMIN_SECRET_KEY=
RESEND_API_KEY=
FRONTEND_URL=
```

## Project Structure

```
burmalingo/
├── frontend/
│   ├── src/
│   │   ├── api/           # axios client + JWT interceptor
│   │   ├── components/    # landing page components
│   │   ├── context/       # AuthContext
│   │   ├── data/          # grammar, vocabulary, reading, writing, speaking data
│   │   ├── pages/         # route-level pages (incl. SpeakingPage, ListeningPage)
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # XP system, limits, activity helpers
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── models/        # SQLAlchemy models (incl. listening audio, questions, attempts)
│   │   ├── routers/       # auth, writing, general_writing, speaking, listening, admin, feedback
│   │   ├── services/      # WritingService, GeneralWritingService, AzureSpeechService,
│   │   │                  #   ListeningAudioService (TTS + Blob upload),
│   │   │                  #   ListeningGradingService, speaking quota, EmailService
│   │   └── config.py
│   ├── alembic/           # database migrations
│   ├── scripts/           # seed_listening.py and other data scripts
│   ├── tests/
│   └── requirements.txt
│
└── .github/workflows/ci.yml
```

## Deployment

| Layer | Service |
|---|---|
| Frontend | Vercel — auto-deploys from `main` |
| Backend | Railway |
| Database | Neon PostgreSQL |
| Listening Audio | Azure Blob Storage |

## Status

🚀 **Launched May 2026** · Speaking added June 2026 · Listening added June 2026

- ✅ Landing page
- ✅ CI/CD pipeline
- ✅ JWT auth + email verification + password reset
- ✅ Stripe payments + 3-day free trial
- ✅ Free tier enforcement
- ✅ Grammar Practice — Basic, Elementary, Pre-Intermediate
- ✅ General Reading
- ✅ General Writing with AI feedback
- ✅ IELTS Writing with GPT-4o band scoring
- ✅ IELTS Reading
- ✅ Vocabulary & Daily English
- ✅ Speaking Practice — Azure AI Speech pronunciation scoring (Basic → IELTS)
- ✅ **Listening Practice — General + IELTS, Azure HD audio, all 6 levels**
- ✅ XP system + streak tracking
- ✅ Admin dashboard + manual Pro upgrade
- ✅ Feedback collection system
- ✅ Full curriculum — all 6 levels live (Basic → IELTS)

---

*AI-generated scores and feedback are estimates for practice purposes only. BurmaLingo is not affiliated with IELTS, British Council, or IDP.*
