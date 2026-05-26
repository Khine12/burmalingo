import { useState } from 'react'
import api from '../api/client'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const token = new URLSearchParams(window.location.search).get('token') || ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError('')
    try {
      await api.post('/auth/reset-password', { token, new_password: password })
      setDone(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch {
      setError('This link is invalid or has expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-bark/10 p-10 max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-bark">Set new password</h1>
          <p className="text-bark-light text-sm mt-2">Choose a strong password for your account.</p>
        </div>
        {done ? (
          <div className="text-center space-y-3">
            <p className="text-3xl">✅</p>
            <p className="font-semibold text-bark">Password reset successfully!</p>
            <p className="text-bark-light text-sm">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New password (min 8 characters)"
              required
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
