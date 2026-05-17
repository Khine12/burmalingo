import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { stripeApi } from '../api/client'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const freeFeatures = [
  '10 vocabulary cards per week',
  '3 reading passages per 2 weeks',
  '3 translation exercises per week',
  '3 writing submissions per 2 weeks',
  '3 listening exercises per 2 weeks',
]

const proFeatures = [
  'Unlimited vocabulary (500+ words)',
  'Unlimited reading comprehension',
  'Unlimited translation + AI feedback',
  'Unlimited writing + full AI grading',
  'Unlimited listening exercises',
  'Speaking practice with AI scoring',
  'Full progress analytics dashboard',
  'IELTS reading & writing prep',
]

export default function PricingPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpgrade() {
    if (!user) { navigate('/register'); return }
    if (user.tier === 'pro') return
    setLoading(true)
    setError('')
    try {
      const res = await stripeApi.createCheckoutSession()
      window.location.href = res.data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  async function handleManage() {
    setLoading(true)
    setError('')
    try {
      const res = await stripeApi.getPortalUrl()
      window.location.href = res.data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const isPro = user?.tier === 'pro'

  return (
    <div className="min-h-screen bg-cream text-bark font-sans">
      {/* Nav */}
      <div className="px-7 py-5 flex items-center justify-between border-b border-bark/10">
        <button onClick={() => navigate('/dashboard')} className="font-serif font-bold text-xl text-bark">
          BurmaLingo
        </button>
        <button onClick={() => navigate('/dashboard')} className="text-sm text-bark-light hover:text-bark transition-colors">
          ← Back to dashboard
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-7 py-16">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Pricing</p>
          <h1 className="font-serif text-4xl font-extrabold text-bark mb-3">
            Start free. Upgrade when ready.
          </h1>
          <p className="text-bark-light text-sm">
            Cancel anytime. No hidden fees.
          </p>
        </div>

        {error && (
          <div className="mb-6 text-center text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg py-3 px-4">
            {error}
          </div>
        )}

        {isPro && (
          <div className="mb-8 text-center bg-green-50 border border-green-200 rounded-xl py-4 px-6">
            <p className="text-green-800 font-semibold text-sm">✓ You're on the Pro plan</p>
            <button
              onClick={handleManage}
              disabled={loading}
              className="mt-2 text-xs text-green-700 underline hover:no-underline"
            >
              Manage billing →
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Free */}
          <div className="card p-9">
            <h3 className="font-serif text-2xl font-bold text-bark mb-2">Free</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-5xl font-black text-bark">$0</span>
              <span className="text-bark-light text-sm">forever</span>
            </div>
            {freeFeatures.map(f => (
              <div key={f} className="flex items-start gap-2.5 mb-3">
                <span className="text-green-700 mt-0.5 flex-shrink-0 text-sm">✓</span>
                <span className="text-bark-light text-sm">{f}</span>
              </div>
            ))}
            <div className="mt-5 w-full py-3 rounded-lg bg-bark/10 text-bark/50 font-bold text-sm text-center">
              {isPro ? 'Your previous plan' : 'Current plan'}
            </div>
          </div>

          {/* Pro */}
          <div className="relative bg-forest border-2 border-yellow-400 rounded-2xl p-9">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-800 text-white text-xs font-bold tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
              50% OFF LAUNCH
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="font-serif text-5xl font-black text-yellow-400">$5</span>
              <span className="text-white/50 text-sm">/month</span>
            </div>
            <div className="text-white/40 text-xs mb-6">
              Regular price: <span className="line-through">$10/month</span>
            </div>
            {proFeatures.map(f => (
              <div key={f} className="flex items-start gap-2.5 mb-3">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0 text-sm">✓</span>
                <span className="text-white/80 text-sm">{f}</span>
              </div>
            ))}
            {isPro ? (
              <button
                onClick={handleManage}
                disabled={loading}
                className="mt-5 w-full py-3 rounded-lg bg-yellow-600 text-white font-bold text-sm hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Manage Subscription'}
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="mt-5 w-full py-3 rounded-lg bg-yellow-600 text-white font-bold text-sm hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Redirecting to Stripe...' : 'Start 3-Day Free Trial'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-bark-light text-xs mt-5">
          🇲🇲 In Myanmar? <a href="https://www.facebook.com/profile.php?id=61589778724021" target="_blank" rel="noopener noreferrer" className="underline hover:text-bark transition-colors">Contact us on Facebook</a> for pricing and payment options.
        </p>
      </div>
    </div>
  )
}
