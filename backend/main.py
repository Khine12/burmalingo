from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, vocab, translation, progress, payments, writing, general_writing, admin, feedback, speaking, listening
from app.database import engine, Base

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BurmaLingo API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://burmalingo.com",
        "https://burmalingo.vercel.app",
        "https://burmalingo-production.up.railway.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)

app.include_router(auth.router,        prefix="/api/auth",        tags=["auth"])
app.include_router(vocab.router,       prefix="/api/vocab",       tags=["vocab"])
app.include_router(translation.router, prefix="/api/translation", tags=["translation"])
app.include_router(progress.router,    prefix="/api/progress",    tags=["progress"])
app.include_router(payments.router,    prefix="/api/payments",    tags=["payments"])
app.include_router(writing.router,         prefix="/api/writing",         tags=["writing"])
app.include_router(general_writing.router, prefix="/api/general-writing", tags=["general-writing"])
app.include_router(admin.router,           prefix="/api/admin",           tags=["admin"])
app.include_router(feedback.router,        prefix="/api/feedback",        tags=["feedback"])
app.include_router(speaking.router,        prefix="/api/speaking",        tags=["speaking"])
app.include_router(listening.router,       prefix="/api/listening",       tags=["listening"])

@app.get("/health")
def health():
    return {"status": "ok"}
