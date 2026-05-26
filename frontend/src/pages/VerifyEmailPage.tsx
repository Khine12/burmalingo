import { useEffect, useState } from 'react'
import api from '../api/client'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) { setStatus('error'); return }
    api.get(`/auth/verify-email?token=${token}`)
      .then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        setStatus('success')
        setTimeout(() => navigate('/dashboard'), 2000)
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-bark/10 p-10 max-w-md w-full text-center space-y-4">
        <p className="text-4xl">{status === 'loading' ? '⏳' : status === 'success' ? '✅' : '❌'}</p>
        <h1 className="font-serif text-2xl font-bold text-bark">
          {status === 'loading' ? 'Verifying your email...' : status === 'success' ? 'Email verified!' : 'Invalid or expired link'}
        </h1>
        <p className="text-bark-light text-sm">
          {status === 'loading' ? 'Please wait a moment.' : status === 'success' ? 'Redirecting you to your dashboard...' : 'This link may have expired. Please register again or request a new verification email.'}
        </p>
        {status === 'error' && (
          <button onClick={() => navigate('/register')} className="mt-4 px-6 py-2.5 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors">
            Back to Register
          </button>
        )}
      </div>
    </div>
  )
}
