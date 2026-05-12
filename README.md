# BurmaLingo

**Live: https://burmalingo.vercel.app**

English learning web app built specifically for Burmese speakers — by a Burmese immigrant who lived this problem from both sides.

---

## The Problem

In Myanmar, joining a single level of English class from a well-known teacher costs roughly half a month's basic salary — and that's not a private lesson. That's a seat in a 100-person Zoom class where the teacher doesn't even know or remember your name.

The cheaper options don't solve the problem either. Pre-recorded video courses are affordable but cover only one level — students have to buy multiple separate courses with no coherent progression. YouTube is free but completely unstructured — hours of content with no clear path from where you are to where you need to be.

And even if a Burmese learner finds an English app, it wasn't built for them. The explanations assume you already think in English. The grammar rules are written for someone else. The vocabulary prioritises what matters in the US or UK, not what a Burmese speaker actually needs to know first.

BurmaLingo is the structured, affordable alternative — a 7-level curriculum from beginner to IELTS preparation, built entirely around how Burmese speakers actually learn English, at a price that doesn't require half a month's salary.

---

## The Founder's Path

Self-study to save money → Zoom classes → both self-study and Zoom classes for IELTS → moved to the US in February 2023 → 3 years living and working in an English environment.

That full journey — knowing what worked at each stage, what was a waste of money, and what no app ever taught — is what this curriculum is built from.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Tailwind CSS → Vercel |
| Backend | FastAPI (Python) → Railway |
| Database | PostgreSQL → Neon |
| File Storage | AWS S3 — pre-generated TTS audio (planned) |
| Auth | JWT |
| Payments | Stripe (diaspora) + KBZPay/Wave Money via Facebook (Myanmar) |
| AI Feedback | OpenAI GPT-4o |
| CI/CD | GitHub Actions |

---

## Curriculum

7-level system:

| Level | Name | Status |
|-------|------|--------|
| 1 | Basic | Coming soon |
| 2 | Elementary | Coming soon |
| 3 | Pre-Intermediate | Coming soon |
| 4 | Intermediate I | Coming soon |
| 5 | Intermediate II | Coming soon |
| 6 | Upper-Intermediate | Coming soon |
| 7 | IELTS Preparation | ✅ Available |

---

## Features

### Currently Live
- **IELTS Writing Practice** — 35 Task 2 topics, AI band scoring with GPT-4o, sub-scores across all 4 IELTS criteria, specific improvement suggestions referencing the student's actual writing
- **IELTS Reading Practice** — 20 passages across 10 topics, True/False/Not Given and multiple choice questions, instant feedback with explanations
- **Level Test** — 35 questions across all 7 levels, randomised each attempt, self-assessment tool
- **Auth** — JWT register/login, personal dashboard, profile page
- **Personal Dashboard** — milestone tracking, progress stats, practice tools hub

### Milestones System
- 🎉 First Step — account created
- 🖊️ First Essay — 1 essay submitted
- 📝 Getting Serious — 3 essays submitted
- 🏆 Dedicated Writer — 10 essays submitted
- ⭐ Band 6 Achieved — scored 6.0 or above
- 🌟 Band 7 Achieved — scored 7.0 or above
- 🔒 Vocabulary Master — coming soon
- 🔒 Reading Pro — coming soon

### Coming Soon
- Vocabulary (SM-2 spaced repetition algorithm built from scratch)
- Translation Practice (Burmese → English with AI feedback)
- Listening Practice (pre-generated TTS audio via Gemini Flash, stored on S3)
- Speaking Practice (Web Speech API + GPT feedback)
- Progress analytics dashboard (Recharts)

---

## Pricing

| Plan | Price | Features |
|------|-------|---------|
| Free | $0/forever | 3 writing submissions per 2 weeks, 3 reading passages per 2 weeks, level test unlimited |
| Pro | $5/month | Unlimited everything + AI feedback + speaking practice + analytics |

- 3-day free trial on Pro
- **Diaspora users** (US, Thailand, Singapore, Malaysia, Japan, Korea, Australia): Stripe
- **Myanmar users**: KBZPay / Wave Money via Facebook page (manual tier upgrade)

> AI-generated scores and feedback are estimates for practice purposes only. BurmaLingo is not affiliated with IELTS, British Council, or IDP. Actual exam scores may differ.

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

API: http://localhost:8000  
Docs: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

### Run Tests
```bash
cd backend
pytest tests/ -v
```

### Environment Variables

DATABASE_URL=
SECRET_KEY=
OPENAI_API_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

---

## Project Structure

burmalingo/
├── frontend/
│   ├── src/
│   │   ├── api/          # axios client + JWT interceptor
│   │   ├── components/   # React components
│   │   ├── context/      # AuthContext
│   │   ├── data/         # IELTS reading passages, level test questions
│   │   ├── hooks/        # custom React hooks
│   │   ├── pages/        # route-level pages
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # SM-2 algorithm, helpers
│   ├── vercel.json
│   ├── index.html
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── models/       # SQLAlchemy: User, VocabCard, ReviewHistory, TranslationPrompt
│   │   ├── routers/      # FastAPI routes: auth, vocab, translation, progress, payments, writing
│   │   ├── services/     # Business logic: SM-2, JWT/bcrypt, OpenAI, Stripe, writing grader
│   │   └── schemas/      # Pydantic request/response schemas
│   ├── tests/
│   ├── main.py
│   ├── runtime.txt
│   └── requirements.txt
│
└── .github/
└── workflows/
└── ci.yml        # pytest + TypeScript build check on every push to main

---

## Deployment

| Layer | Service |
|-------|---------|
| Frontend | Vercel (auto-deploys from main) |
| Backend | Railway |
| Database | Neon PostgreSQL |
| Audio files | AWS S3 (planned) |

---

## Target Markets

| Region | Payment | Status |
|--------|---------|--------|
| US, Thailand, Singapore, Malaysia, Japan, Korea, Australia | Stripe | Planned |
| Myanmar | KBZPay / Wave Money via Facebook | Manual, planned |
| Myanmar | KBZPay API direct integration | Future |

---

## Status

Target launch: **July/August 2026**

✅ Landing page live at https://burmalingo.vercel.app  
✅ CI/CD pipeline — pytest + TypeScript build on every push  
✅ Backend deployed on Railway  
✅ PostgreSQL on Neon  
✅ JWT auth — register, login, profile page  
✅ Personal dashboard with milestone tracking  
✅ Level test — 35 questions, randomised, self-assessment  
✅ IELTS Writing Practice — 35 topics, GPT-4o band scoring  
✅ IELTS Reading Practice — 20 passages, instant feedback  
🔄 Stripe subscription — next  
🔄 Vocabulary SM-2 — summer 2026  
🔄 Translation practice — summer 2026  
🔄 Listening practice (Gemini TTS + S3) — summer 2026  
🔄 Speaking practice — summer 2026  

Sustainability target: 5–6 paying users at $5/month covers Railway + infrastructure costs.
