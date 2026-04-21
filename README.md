# BurmaLingo

**Live:** https://burmalingo.vercel.app

English learning web app built specifically for Burmese speakers — by a Burmese immigrant who lived this problem from both sides.                    

---

## The Problem

In Myanmar, joining a single level of English class from a well-known teacher costs roughly half a month's basic salary — and that's not a private lesson. That's a seat in a 100-person Zoom class where the teacher doesn't even know or remember your name. A private teacher at that same price is only possible if they're not well known yet.              

The cheaper options don't solve the problem either. Pre-recorded video courses are affordable but cover only one level — students have to buy multiple separate courses with no coherent progression from beginner to a decent working level. YouTube is free but completely unstructured — hours of content with no clear path from where you are to where you need to be.        

And even if a Burmese learner finds an English app, it wasn't built for them. The explanations assume you already think in English. The grammar rules are written for someone else. The vocabulary prioritizes what matters in the US or UK, not what a Burmese speaker actually needs to know first.                      

**BurmaLingo is the structured, affordable alternative** — a full 10-level curriculum from beginner to IELTS practice, built entirely around how Burmese speakers actually learn English, at a price that doesn't require half a month's salary.         

---

## The Founder's Path

Self-study to save money → Zoom classes → both self-study and Zoom classes for IELTS → moved to the US in February 2023 → 3 years living and working in an English environment.

That full journey — knowing what worked at each stage, what was a waste of money, and what no app ever taught — is what this curriculum is built from.

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
| AI Feedback | OpenAI GPT-4o-mini — paid users only |
| TTS Audio | Gemini Flash TTS → pre-generated once → stored on S3 forever |
| Speaking | Web Speech API → backend scoring → GPT feedback (paid only) |
| CI/CD | GitHub Actions |

---

## Features

### Curriculum
- 10-level system: Beginner I → Beginner II → Pre-Intermediate I → Pre-Intermediate II → Intermediate I → Intermediate II → Intermediate III → Upper-Intermediate I → Upper-Intermediate II → IELTS Practice
- Levels 1–4: Burmese-first explanations — coming soon
- Levels 5–10: Simple English explanations — available now
- Placement test on signup — 5 questions, places you automatically, always skippable

### Learning Tools
- **Vocabulary** — SM-2 spaced repetition algorithm implemented from scratch
- **Reading comprehension** — graded passages with comprehension questions per level
- **Writing practice** — given a topic, write your response, AI grades it (paid only)
- **Translation practice** — given a Burmese sentence, write it in English, AI evaluates via OpenAI GPT-4o-mini (paid feedback)
- **Listening** — pre-generated native audio via Gemini TTS, stored permanently on S3
- **Speaking** — Web Speech API transcription + GPT feedback (paid only)

### Rate Limits (enforced server-side in FastAPI only — frontend limits are never trusted)

| Feature | Free | Pro |
|---|---|---|
| Vocabulary cards | 10 per week | Unlimited |
| Reading passages | 3 per 2 weeks | Unlimited |
| Translation practice | 3 per week (no AI feedback) | Unlimited + AI feedback |
| Writing practice | 3 per 2 weeks (no AI feedback) | Unlimited + full AI grading |
| Listening exercises | 3 per 2 weeks | Unlimited |
| Speaking practice | — | Unlimited |
| Progress analytics | — | Full Recharts dashboard |

### Payments
- Pro: $5/month (50% launch discount from $10)
- 3-day free trial
- Stripe for diaspora users (US, Thailand, Singapore, Malaysia, Japan, Korea, Australia)
- KBZPay / Wave Money via Facebook page for Myanmar users — manual admin tier flip

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

- **Frontend** → Vercel (auto-deploys from `main`) — live at https://burmalingo.vercel.app
- **Backend** → AWS Elastic Beanstalk
- **Database** → AWS RDS PostgreSQL
- **Audio files** → AWS S3 (pre-generated, permanent)
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

- ✅ Landing page live at https://burmalingo.vercel.app
- ✅ CI/CD pipeline — pytest + TypeScript build on every push
- ✅ Backend API — auth, SM-2, Stripe webhooks, OpenAI GPT-4o-mini integrated
- ✅ PostgreSQL running locally
- ✅ OpenAI translation feedback working end-to-end
- 🔄 Demo pages (vocab, translation, writing) — in progress
- 🔄 Stripe subscription — next
- 🔄 AWS EC2 + RDS deployment — after Stripe
- 🔄 Content seeding (vocab cards, writing topics, Burmese sentences) — summer 2026

First users will come from the founder's personal network in Myanmar. Sustainability target: 5–6 paying users at $5/month covers AWS running costs (~$50/month).
