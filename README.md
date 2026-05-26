# BurmaLingo
**Live:** https://burmalingo.vercel.app

English learning web app built specifically for Burmese speakers — by a Burmese immigrant who lived this problem from both sides.

---

## The Problem

In Myanmar, a single level of English class from a well-known teacher costs roughly half a month's basic salary — for a seat in a 100-person Zoom class where the teacher doesn't know your name. Cheaper video courses cover only one level with no structured progression. YouTube is free but completely unstructured. And even if a Burmese learner finds an English app, it wasn't built for them — the explanations assume you already think in English.

BurmaLingo is the structured, affordable alternative.

---

## The Founder's Path

Self-study → Zoom classes → IELTS prep → moved to the US in February 2023 → 3 years living and working in an English environment.

That full journey — knowing what worked at each stage and what was a waste of money — is what this curriculum is built from.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS → Vercel |
| Backend | FastAPI (Python) → Railway |
| Database | PostgreSQL → Neon |
| Auth | JWT + email verification |
| Payments | Stripe + manual upgrade for Myanmar users |
| AI Feedback | OpenAI GPT-4o |
| Email | Resend |
| CI/CD | GitHub Actions |

---

## Curriculum

| Level | Name | Status |
|---|---|---|
| 1 | Basic | ✅ Live |
| 2 | Elementary | ✅ Live |
| 3 | Pre-Intermediate | ✅ Live |
| 4 | Intermediate | 🔄 Coming soon |
| 5 | Upper-Intermediate | 🔄 Coming soon |
| 6 | IELTS Preparation | ✅ Live |

---

## What's Built

**Grammar Practice** — Multiple choice and fill-in-blank lessons across Basic, Elementary, and Pre-Intermediate. One question at a time with instant feedback and clear explanations in simple English.

**General Reading** — Real-life passages about living in an English-speaking world: going to the doctor, renting an apartment, taking the bus, starting a new job. Multiple choice, True/False/Not Given, fill-in-blank, and vocabulary questions.

**General Writing** — Topics across all three levels with AI feedback: grammar corrections, star rating, and a model answer. Structured outlines provided for emails and letters. Relevance check detects off-topic answers before grading.

**IELTS Writing Practice** — 35 Task 2 topics with GPT-4o band scoring across all 4 IELTS criteria. Feedback references exact phrases from the student's writing. Relevance check included.

**IELTS Reading Practice** — Academic-style passages with True/False/Not Given, multiple choice, fill-in-blank, and paragraph matching. Instant results with explanations.

**Vocabulary & Daily English** — Daily Phrases (greetings, requests, shopping, directions, doctor visits, phone calls, making plans, feelings, restaurants, interviews, travel, weather) and Common Words (family, food, numbers, colors, and more).

**Level Test** — 35-question placement test to find your starting level automatically.

**XP & Progress System** — 10 XP per session, daily streak tracking, weekly goal, and 6 progression levels from Beginner to IELTS Ready.

**Stripe Payments** — $5/month Pro subscription with 3-day free trial and webhook-based tier control. Myanmar users pay via KBZPay/Wave Money through Facebook with manual tier upgrade.

**Email Verification & Password Reset** — Verification email sent on registration via Resend. Password reset flow with time-limited tokens.

**Free Tier Enforcement** — Usage limits tracked per user with automatic period resets.

**Admin Dashboard** — Manual Pro upgrade/downgrade by email, user list, and feedback viewer.

---

## Free vs Pro

| Feature | Free | Pro |
|---|---|---|
| Writing — IELTS + General combined | 3 per 2 weeks | Unlimited |
| Reading — IELTS + General combined | 3 per 2 weeks | Unlimited |
| Grammar | 1 lesson per week | Unlimited |
| Vocabulary & Phrases | 1 lesson per week | Unlimited |
| Level Test | Once only | Retake anytime |
| AI feedback & band scores | ❌ | ✅ |

$5/month · 3-day free trial · Cancel anytime

Myanmar users: KBZPay / Wave Money via Facebook → manual tier upgrade

---

## Local Setup

**Backend**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```
API: http://localhost:8000 · Docs: http://localhost:8000/docs

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
App: http://localhost:5173

**Tests**
```bash
cd backend
pytest tests/ -v
```

---

## Environment Variables

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
ADMIN_SECRET_KEY=
RESEND_API_KEY=
FRONTEND_URL=
```

---

## Project Structure

```
burmalingo/
├── frontend/
│   ├── src/
│   │   ├── api/           # axios client + JWT interceptor
│   │   ├── components/    # landing page components
│   │   ├── context/       # AuthContext
│   │   ├── data/          # grammar, vocabulary, reading, writing data
│   │   ├── pages/         # route-level pages
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # XP system, limits, activity helpers
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # auth, writing, general_writing, admin, feedback
│   │   ├── services/      # WritingService, GeneralWritingService, EmailService
│   │   └── config.py
│   ├── tests/
│   └── requirements.txt
│
└── .github/workflows/ci.yml
```

---

## Deployment

| Layer | Service |
|---|---|
| Frontend | Vercel — auto-deploys from main |
| Backend | Railway |
| Database | Neon PostgreSQL |

---

## Status

🚀 **Launched May 2026**

✅ Landing page  
✅ CI/CD pipeline  
✅ JWT auth + email verification + password reset  
✅ Stripe payments + 3-day free trial  
✅ Free tier enforcement  
✅ Grammar Practice — Basic, Elementary, Pre-Intermediate  
✅ General Reading — Basic, Elementary  
✅ General Writing with AI feedback — Basic, Elementary, Pre-Intermediate  
✅ IELTS Writing with GPT-4o band scoring  
✅ IELTS Reading  
✅ Vocabulary & Daily English  
✅ XP system + streak tracking  
✅ Admin dashboard + manual Pro upgrade  
✅ Feedback collection system  
🔄 Intermediate + Upper-Intermediate content  
🔄 Listening Practice  
🔄 Speaking Practice (future)  

---

*AI-generated scores and feedback are estimates for practice purposes only. BurmaLingo is not affiliated with IELTS, British Council, or IDP.*
