from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, vocab, translation, progress, payments, writing
from app.database import engine, Base

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BurmaLingo API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://burmalingo.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,        prefix="/api/auth",        tags=["auth"])
app.include_router(vocab.router,       prefix="/api/vocab",       tags=["vocab"])
app.include_router(translation.router, prefix="/api/translation", tags=["translation"])
app.include_router(progress.router,    prefix="/api/progress",    tags=["progress"])
app.include_router(payments.router,    prefix="/api/payments",    tags=["payments"])
app.include_router(writing.router,     prefix="/api/writing",     tags=["writing"])

@app.get("/health")
def health():
    return {"status": "ok"}
