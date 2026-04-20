# BurmaLingo

English learning web app built specifically for Burmese speakers — by someone who has been through every stage of this problem personally.

**The founder's path:** Self-study → Zoom classes → both self-study and Zoom classes for IELTS (all 4 skills) → moved to the US in 2023 → 3 years living and working in an English environment. That full journey — knowing what worked at each stage and what was a waste of time — is what this app is built from.

**Why not just use Duolingo?** Duolingo technically has some English content for Burmese speakers, but it is extremely thin — a handful of basic lessons with no real depth, no IELTS preparation, and explanations that assume you already understand English meta-language. BurmaLingo is built entirely around the Burmese learner: the specific grammar mistakes Burmese speakers make in English, the vocabulary gaps that matter for real life in the US or for IELTS, and explanations written the way a Burmese teacher would explain — not translated from English content that was never designed for this audience.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS → Vercel |
| Backend | FastAPI (Python) → AWS Elastic Beanstalk |
| Database | PostgreSQL → AWS RDS |
| File Storage | AWS S3 — pre-generated TTS audio served permanently |
| Auth | JWT |
| Payments | Stripe webhooks (diaspora) + manual KBZPay/Wave Money via Facebook (Myanmar) |
| AI Grammar | OpenAI GPT-4o-mini — paid users only |
| TTS Audio | Gemini Flash TTS → pre-generated once → stored on S3 forever |
| Speaking | Web Speech API → backend scoring → GPT feedback (paid only) |
| CI/CD | GitHub Actions |

---

## Features

### Curriculum
- 10-level system from Starter to Advanced — honest naming, no overclaiming
- Levels 1–4 (Starter → Elementary): Burmese-first explanations — coming soon
- Levels 5–10 (Intermediate I → Advanced): Simple English explanations — available now
- Placement test on signup — 5 questions, places you automatically, always skippable

### Learning Tools
- **Vocabulary** — SM-2 spaced repetition algorithm implemented from scratch. Schedules reviews at exactly the right time
- **Translation practice** — given a Burmese sentence, write it in English, get AI feedback calibrated to your level
- **Listening** — pre-generated native audio via Gemini TTS, stored permanently on S3, never regenerated
- **Speaking** — Web Speech API transcription + GPT feedback on pronunciation and accuracy (paid only)
- **Reading comprehension** — graded passages with AI-generated questions per level

### Rate Limits (enforced server-side in FastAPI — frontend limits are never trusted)

| Feature | Free | Pro |
|---|---|---|
| AI grammar feedback | 3 per day | Unlimited |
| Listening exercises | 3 per 2 weeks | Unlimited |
| Speaking practice | — | Unlimited |
| Vocabulary cards | Limited daily | Unlimited |
| Progress analytics | — | Full Recharts dashboard |

### Payments
- Pro: $5/month (50% launch discount)
- 3-day free trial
- Stripe for diaspora users (US, Thailand, Singapore, Australia)
- KBZPay / Wave Money via Facebook page for Myanmar-based users — manual admin tier flip

---

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/Scripts/activate    # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # fill in your values
uvicorn main:app --reload
```

API: `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

### Run Tests
```bash
cd backend
pytest tests/ -v
```

---

## Project Structure

```
burmalingo/
├── frontend/
│   ├── src/
│   │   ├── api/          # axios client + JWT interceptor
│   │   ├── components/   # React components
│   │   ├── hooks/        # custom React hooks
│   │   ├── pages/        # route-level pages
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # SM-2 algorithm, helpers
│   ├── index.html
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── models/       # SQLAlchemy: User, VocabCard, ReviewHistory, TranslationPrompt
│   │   ├── routers/      # FastAPI routes: auth, vocab, translation, progress, payments
│   │   ├── services/     # Business logic: SM-2, JWT/bcrypt, OpenAI, Stripe
│   │   └── schemas/      # Pydantic request/response schemas
│   ├── tests/
│   ├── main.py
│   └── requirements.txt
│
└── .github/
    └── workflows/
        └── ci.yml        # pytest + TypeScript build check on every push to main
```

---

## Deployment

- **Frontend** → Vercel (auto-deploys from `main`)
- **Backend** → AWS Elastic Beanstalk
- **Database** → AWS RDS PostgreSQL
- **Audio files** → AWS S3 (pre-generated, permanent, never regenerated)
- **Stripe webhook** → `POST /api/payments/webhook`

---

## Target Markets

| Region | Payment | Status |
|---|---|---|
| US, Thailand, Singapore, Malaysia, Japan, Korea | Stripe | v1 |
| Myanmar | KBZPay / Wave Money via Facebook | Manual, v1 |
| Myanmar | KBZPay API direct integration | Future |

---

## Status

**Actively building — target launch July/August 2026.**

CI/CD pipeline live. Backend API scaffolded with auth, SM-2 spaced repetition, Stripe webhooks, and OpenAI integration. Frontend in progress.

First users will come from the founder's personal network in Myanmar. Sustainability target: 5–6 paying users at $5/month covers AWS running costs. Resume updated the day it ships.
