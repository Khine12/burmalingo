import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from main import app

TEST_DB = "postgresql://test:test@localhost/burmalingo_test"
engine = create_engine(TEST_DB)
TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_db():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_db
Base.metadata.create_all(bind=engine)
from starlette.testclient import TestClient
client = TestClient(app, raise_server_exceptions=True)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_register_and_login():
    email = "test_burmalingo@example.com"
    password = "testpass123!"

    # Register
    r = client.post("/api/auth/register", json={"email": email, "password": password, "name": "Test User"})
    assert r.status_code == 201
    assert r.json()["email"] == email
    assert r.json()["tier"] == "free"

    # Bypass email verification for testing
    db = TestingSession()
    from app.models.models import User
    user = db.query(User).filter(User.email == email).first()
    user.is_verified = True
    db.commit()
    db.close()

    # Login
    r = client.post(
        "/api/auth/token",
        data={"username": email, "password": password},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert r.status_code == 200
    token = r.json()["access_token"]
    assert token

    # Get current user
    r = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["email"] == email

def test_unauthorized_access():
    r = client.get("/api/vocab/due")
    assert r.status_code == 401

def test_progress_requires_auth():
    r = client.get("/api/progress/")
    assert r.status_code == 401
