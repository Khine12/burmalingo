from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.services.auth_service import AuthService
from app.schemas.auth import UserCreate, UserOut, Token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return AuthService.get_user_from_token(token, db)

@router.post("/register", response_model=UserOut, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    return AuthService.register(payload.email, payload.password, payload.name, db)

@router.post("/token", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return AuthService.login(form.username, form.password, db)

@router.get("/me", response_model=UserOut)
def me(user=Depends(get_current_user)):
    return user

@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    return AuthService.verify_email(token, db)

class ResendRequest(BaseModel):
    email: str

@router.post("/resend-verification")
def resend_verification(payload: ResendRequest, db: Session = Depends(get_db)):
    from app.services.email_service import EmailService
    import secrets
    user = db.query(__import__('app.models.models', fromlist=['User']).User).filter_by(email=payload.email).first()
    if user and not user.is_verified:
        token = secrets.token_urlsafe(32)
        user.verification_token = token
        db.commit()
        EmailService.send_verification_email(user.email, user.name, token)
    return {"message": "If this email exists and is unverified, a new link has been sent"}

class PasswordResetRequest(BaseModel):
    email: str

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

@router.post("/forgot-password")
def forgot_password(payload: PasswordResetRequest, db: Session = Depends(get_db)):
    AuthService.request_password_reset(payload.email, db)
    return {"message": "If this email exists, a reset link has been sent"}

@router.post("/reset-password")
def reset_password(payload: PasswordResetConfirm, db: Session = Depends(get_db)):
    AuthService.reset_password(payload.token, payload.new_password, db)
    return {"message": "Password reset successfully"}
