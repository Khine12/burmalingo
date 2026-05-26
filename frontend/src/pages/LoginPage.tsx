import { useState, type FormEvent } from 'react'
import { authApi } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const tokenRes = await authApi.login(email, password)
      const { access_token } = tokenRes.data
      // Fetch user profile before updating context so we have the full object
      localStorage.setItem('access_token', access_token)
      const userRes = await authApi.me()
      login(access_token, userRes.data)
      window.location.href = '/dashboard'
    } catch (err: unknown) {
      localStorage.removeItem('access_token')
      const status = (err as { response?: { status?: number } }).response?.status
      setError(
        status === 403
          ? 'Please verify your email before logging in. Check your inbox.'
          : status === 401
          ? 'Incorrect email or password.'
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="font-serif text-3xl font-black text-forest hover:opacity-80 transition-opacity">
            BurmaLingo
          </a>
          <p className="text-bark-light text-sm mt-1">Welcome back</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-bark/10 shadow-sm px-8 py-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-widest text-bark-light uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
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
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
          <p className="text-center text-xs text-bark-light mt-3">
            <button onClick={() => { window.history.pushState({}, '', '/forgot-password'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-forest hover:underline">Forgot your password?</button>
          </p>

        </form>

        <p className="text-center text-sm text-bark-light mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-forest font-semibold hover:underline">
            Create one free
          </a>
        </p>
      </div>
    </div>
  )
}
