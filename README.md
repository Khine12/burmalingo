# BurmaLingo
**Live:** https://burmalingo.vercel.app

English learning web app built specifically for Burmese speakers — by a Burmese immigrant who lived this problem from both sides.

---

## The Problem

In Myanmar, joining a single level of English class from a well-known teacher costs roughly half a month's basic salary — and that's not a private lesson. That's a seat in a 100-person Zoom class where the teacher doesn't even know your name.

The cheaper options don't solve the problem either. Pre-recorded video courses cover only one level. YouTube is free but completely unstructured. And even if a Burmese learner finds an English app, it wasn't built for them — the explanations assume you already think in English.

BurmaLingo is the structured, affordable alternative — built entirely around how Burmese speakers actually learn English.

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
| Auth | JWT |
| Payments | Stripe + manual upgrade (Facebook/KBZPay for Myanmar users) |
| AI Feedback | OpenAI GPT-4o |
| CI/CD | GitHub Actions |

---

## Curriculum — 6 Levels

| Level | Name | Status |
|---|---|---|
| 1 | Basic | ✅ Available |
| 2 | Elementary | ✅ Available |
| 3 | Pre-Intermediate | ✅ Available |
| 4 | Intermediate | 🔄 Coming soon |
| 5 | Upper-Intermediate | 🔄 Coming soon |
| 6 | IELTS Preparation | ✅ Available |

---

## Features

### ✅ Currently Live

**Grammar Practice**
- 20 lessons across Basic, Elementary, and Pre-Intermediate
- 400 questions total — multiple choice and fill-in-blank
- One question at a time with instant feedback and explanations

**General Reading**
- 20 passages (10 Basic + 10 Elementary)
- Real-life topics: going to the doctor, renting an apartment, taking the bus, starting a new job
- 20 questions per passage — multiple choice, true/false/not given, fill-in-blank, vocabulary
- 400 questions total

**General Writing**
- 30 topics across Basic, Elementary, and Pre-Intermediate
- AI feedback: grammar corrections, star rating, model answer
- Relevance check — detects off-topic answers before grading
- Outlines provided for structured writing tasks (emails, letters)

**IELTS Writing Practice**
- 35 Task 2 topics
- GPT-4o band scoring across all 4 IELTS criteria
- Specific improvement suggestions referencing the student's actual writing
- Relevance check included

**IELTS Reading Practice**
- 13 passages across 10 topics
- True/False/Not Given, multiple choice, fill-in-blank, paragraph matching
- Instant feedback with explanations

**Vocabulary & Daily English**
- 16 lessons: Daily Phrases (8 lessons) + Common Words (8 lessons)
- Topics: greetings, polite requests, shopping, directions, doctor visits, phone calls, making plans, feelings, restaurant, job interviews, travel, weather
- Family, food, numbers, colors, body parts, clothes, jobs, emotions
- 320 questions total

**Level Test**
- 35 questions across all levels
- Automatic level placement

**Stripe Payments**
- Pro subscription at $5/month (50% launch discount from $10)
- 3-day free trial
- Webhook-based tier upgrade/downgrade

**XP & Progress System**
- 10 XP per completed session
- Daily streak tracking with automatic reset
- Weekly goal (50 XP)
- 6 XP levels from Beginner to IELTS Ready

**Admin Dashboard**
- Manual Pro upgrade/downgrade by email (for Myanmar Facebook payments)
- User list with tier status
- Feedback/suggestions viewer

---

## Free vs Pro

| Feature | Free | Pro |
|---|---|---|
| Writing (IELTS + General combined) | 3 per 2 weeks | Unlimited |
| Reading (IELTS + General combined) | 3 per 2 weeks | Unlimited |
| Grammar | 1 lesson per week | Unlimited |
| Vocabulary & Phrases | 1 lesson per week | Unlimited |
| Level Test | Once only | Retake anytime |
| AI feedback & band scores | ❌ | ✅ |

**Price:** $5/month · 3-day free trial · Cancel anytime

**Myanmar users:** KBZPay / Wave Money via Facebook page → manual tier upgrade

---

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/Scripts/activate    # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # fill in your values
uvicorn app.main:app --reload
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
│   │   └── utils/         # XP system, activity helpers
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # auth, writing, general_writing, reading, admin, feedback
│   │   ├── services/      # WritingService, GeneralWritingService
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
| Frontend | Vercel (auto-deploys from main) |
| Backend | Railway |
| Database | Neon PostgreSQL |

---

## Status

**Target launch: May 30, 2026**

✅ Landing page live  
✅ CI/CD pipeline  
✅ JWT auth  
✅ Stripe payments + 3-day trial  
✅ Grammar Practice — 20 lessons, 400 questions  
✅ General Reading — 20 passages, 400 questions  
✅ General Writing — 30 topics, AI feedback  
✅ IELTS Writing — 35 topics, GPT-4o band scoring  
✅ IELTS Reading — 13 passages  
✅ Vocabulary & Daily English — 16 lessons, 320 questions  
✅ XP system + streak tracking  
✅ Admin dashboard + manual Pro upgrade  
✅ Feedback collection system  
🔄 Free tier enforcement (in progress)  
🔄 Intermediate + Upper-Intermediate content  
🔄 Listening Practice (AWS S3 + TTS)  
🔄 Speaking Practice  

---

*AI-generated scores and feedback are estimates for practice purposes only. BurmaLingo is not affiliated with IELTS, British Council, or IDP.*

