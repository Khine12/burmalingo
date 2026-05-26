import { useState } from 'react'
import api from '../api/client'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
    } catch {}
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-bark/10 p-10 max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-bark">Reset your password</h1>
          <p className="text-bark-light text-sm mt-2">Enter your email and we will send you a reset link.</p>
        </div>
        {sent ? (
          <div className="text-center space-y-3">
            <p className="text-3xl">📧</p>
            <p className="font-semibold text-bark">Check your email</p>
            <p className="text-bark-light text-sm">If an account exists for that email, a reset link has been sent.</p>
            <button onClick={() => navigate('/login')} className="mt-4 text-sm text-forest underline">Back to login</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <button type="button" onClick={() => navigate('/login')} className="w-full text-sm text-bark-light hover:text-bark transition-colors">
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
