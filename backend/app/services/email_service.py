import resend
from app.config import settings

resend.api_key = settings.RESEND_API_KEY

class EmailService:

    @staticmethod
    def send_verification_email(email: str, name: str, token: str):
        verify_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"
        resend.Emails.send({
            "from": "BurmaLingo <noreply@khinezarhein.com>",
            "to": email,
            "subject": "Verify your BurmaLingo account",
            "html": f"""
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
                <h1 style="color: #1a3a2a; font-size: 24px;">Welcome to BurmaLingo, {name}!</h1>
                <p style="color: #555; font-size: 16px;">Please verify your email address to activate your account.</p>
                <a href="{verify_url}" style="display: inline-block; margin: 24px 0; padding: 14px 28px; background: #1a3a2a; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Verify Email
                </a>
                <p style="color: #999; font-size: 13px;">This link expires in 24 hours. If you did not create an account, ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                <p style="color: #999; font-size: 12px;">BurmaLingo — English learning for Burmese speakers</p>
            </div>
            """
        })

    @staticmethod
    def send_password_reset_email(email: str, name: str, token: str):
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        resend.Emails.send({
            "from": "BurmaLingo <noreply@khinezarhein.com>",
            "to": email,
            "subject": "Reset your BurmaLingo password",
            "html": f"""
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
                <h1 style="color: #1a3a2a; font-size: 24px;">Reset your password</h1>
                <p style="color: #555; font-size: 16px;">Hi {name}, click below to reset your password.</p>
                <a href="{reset_url}" style="display: inline-block; margin: 24px 0; padding: 14px 28px; background: #1a3a2a; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Reset Password
                </a>
                <p style="color: #999; font-size: 13px;">This link expires in 1 hour. If you did not request this, ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                <p style="color: #999; font-size: 12px;">BurmaLingo — English learning for Burmese speakers</p>
            </div>
            """
        })
