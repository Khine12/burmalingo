# BurmaLingo

English learning web app built specifically for Burmese speakers. Built by a Burmese immigrant who self-studied, took Zoom classes, passed IELTS, and moved to the US in 2023 — and knows exactly which methods work at each stage.

## Tech Stack

**Frontend** — React + TypeScript + Tailwind CSS, deployed on Vercel  
**Backend** — FastAPI (Python), deployed on AWS Elastic Beanstalk  
**Database** — PostgreSQL on AWS RDS  
**File Storage** — AWS S3 (TTS audio)  
**Auth** — JWT  
**Payments** — Stripe (webhooks for free/pro access control)  
**AI** — Claude API for translation feedback  
**CI/CD** — GitHub Actions  

## Features

- 10-level curriculum (Intermediate I through Advanced, Beginner coming soon)
- Spaced repetition vocabulary using the SM-2 algorithm — implemented from scratch
- Translation practice: given a Burmese sentence, write it in English, get AI feedback
- Placement test to find your starting level
- Stripe subscription with 3-day free trial
- Free tier (very limited) → Pro tier ($5/month, 50% launch discount)
- KBZPay / Wave Money support for Myanmar-based users via Facebook page

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # fill in your values
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Run Tests
```bash
cd backend
pytest tests/ -v
```

## Project Structure

```
burmalingo/
├── frontend/
│   ├── src/
│   │   ├── api/          # axios client + API calls
│   │   ├── components/   # React components
│   │   ├── hooks/        # custom hooks
│   │   ├── pages/        # route pages
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # SM-2 algorithm, helpers
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── models/       # SQLAlchemy models (User, VocabCard, ReviewHistory)
│   │   ├── routers/      # FastAPI route handlers
│   │   ├── services/     # Business logic (SM2, Translation, Auth)
│   │   └── schemas/      # Pydantic request/response schemas
│   ├── tests/
│   ├── main.py
│   └── requirements.txt
│
└── .github/
    └── workflows/
        └── ci.yml        # runs on every push to main
```

## Deployment

- Frontend → Vercel (auto-deploys from main branch)
- Backend → AWS Elastic Beanstalk
- Database → AWS RDS PostgreSQL
- Stripe webhook endpoint → `/api/payments/webhook`

## Status

Currently building — Summer 2026.
