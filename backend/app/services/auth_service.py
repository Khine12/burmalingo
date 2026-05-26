import secrets
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.models import User
from app.config import settings
from app.services.email_service import EmailService

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain: str, hashed: str) -> bool:
        return pwd_context.verify(plain, hashed)

    @staticmethod
    def create_token(user_id: int) -> str:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        return jwt.encode(
            {"sub": str(user_id), "exp": expire},
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

    @staticmethod
    def get_user_from_token(token: str, db: Session) -> User:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            user_id = int(payload["sub"])
        except (JWTError, KeyError, ValueError):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    @staticmethod
    def register(email: str, password: str, name: str, db: Session) -> User:
        if db.query(User).filter(User.email == email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        token = secrets.token_urlsafe(32)
        user = User(
            email=email,
            name=name,
            hashed_password=AuthService.hash_password(password),
            verification_token=token,
            is_verified=False,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        try:
            EmailService.send_verification_email(email, name, token)
        except Exception:
            pass  # don't block registration if email fails
        return user

    @staticmethod
    def verify_email(token: str, db: Session) -> dict:
        user = db.query(User).filter(User.verification_token == token).first()
        if not user:
            raise HTTPException(status_code=400, detail="Invalid or expired verification link")
        user.is_verified = True
        user.verification_token = None
        db.commit()
        return {"access_token": AuthService.create_token(user.id), "token_type": "bearer"}

    @staticmethod
    def login(email: str, password: str, db: Session) -> dict:
        user = db.query(User).filter(User.email == email).first()
        if not user or not AuthService.verify_password(password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        if not user.is_verified:
            raise HTTPException(status_code=403, detail="Please verify your email before logging in")
        return {"access_token": AuthService.create_token(user.id), "token_type": "bearer"}

    @staticmethod
    def request_password_reset(email: str, db: Session):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return  # silent — don't reveal if email exists
        token = secrets.token_urlsafe(32)
        user.reset_token = token
        user.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=1)
        db.commit()
        try:
            EmailService.send_password_reset_email(email, user.name, token)
        except Exception:
            pass

    @staticmethod
    def reset_password(token: str, new_password: str, db: Session):
        user = db.query(User).filter(User.reset_token == token).first()
        if not user:
            raise HTTPException(status_code=400, detail="Invalid or expired reset link")
        if user.reset_token_expires < datetime.now(timezone.utc):
            raise HTTPException(status_code=400, detail="Reset link has expired")
        user.hashed_password = AuthService.hash_password(new_password)
        user.reset_token = None
        user.reset_token_expires = None
        db.commit()
