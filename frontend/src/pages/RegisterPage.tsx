import { useState, type FormEvent } from 'react'
import { authApi } from '../api/client'
import { useAuth } from '../context/AuthContext'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function RegisterPage() {
  const { login: _login } = useAuth()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setIsLoading(true)
    try {
      await authApi.register(email, password, name.trim())
      setRegistered(true)
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
      if (typeof detail === 'string' && detail.toLowerCase().includes('email')) {
        setError('An account with this email already exists.')
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (registered) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-bark/10 p-10 max-w-md w-full text-center space-y-4">
          <p className="text-4xl">📧</p>
          <h1 className="font-serif text-2xl font-bold text-bark">Check your email!</h1>
          <p className="text-bark-light text-sm leading-relaxed">We sent a verification link to your email address. Click the link to activate your account.</p>
          <p className="text-bark-light text-xs">Did not receive it? Check your spam folder or <button onClick={() => navigate('/login')} className="text-forest underline">go back to login</button>.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="font-serif text-3xl font-black text-forest hover:opacity-80 transition-opacity">
            BurmaLingo
          </a>
          <p className="text-bark-light text-sm mt-1">Create your free account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-bark/10 shadow-sm px-8 py-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-widest text-bark-light uppercase">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus
              placeholder="Your name"
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm
                focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-widest text-bark-light uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm
                focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-widest text-bark-light uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Minimum 8 characters"
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm
                focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-widest text-bark-light uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm
                focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-forest text-white font-bold text-sm rounded-xl tracking-wide
              hover:bg-forest-mid transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account…' : 'Create Free Account'}
          </button>
        </form>

        <p className="text-center text-sm text-bark-light mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-forest font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
