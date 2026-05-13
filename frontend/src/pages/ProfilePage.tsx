import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const STORAGE_KEY = 'burmalingo_writing_usage'
const WINDOW_MS   = 14 * 24 * 60 * 60 * 1000
const FREE_LIMIT  = 3

function getEssayUsage(): { count: number; daysLeft: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const { count, windowStart } = JSON.parse(raw) as { count: number; windowStart: number }
      if (Date.now() - windowStart < WINDOW_MS) {
        const daysLeft = Math.max(1, Math.ceil((windowStart + WINDOW_MS - Date.now()) / (24 * 60 * 60 * 1000)))
        return { count, daysLeft }
      }
    }
  } catch {}
  return { count: 0, daysLeft: 14 }
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'
}

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth()

  // Auth guard
  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/login'
    }
  }, [isLoading, user])

  if (isLoading || !user) return null

  const { count: essayCount, daysLeft } = getEssayUsage()
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const displayName = user.name || user.email.split('@')[0]

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* Header */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-1.5 text-bark-light hover:text-bark transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Home
          </a>
          <span className="font-serif font-bold text-bark">BurmaLingo</span>
          <div className="w-16" /> {/* spacer */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-6">

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 pb-2">
          <div className="w-20 h-20 rounded-full bg-forest flex items-center justify-center shadow-lg shadow-forest/20">
            <span className="font-serif text-2xl font-bold text-white">{initials(displayName)}</span>
          </div>
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-bark">{displayName}</h1>
            <p className="text-bark-light text-sm mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Account info card */}
        <div className="bg-white rounded-2xl border border-bark/10 shadow-sm divide-y divide-bark/8">
          <Row label="Member since" value={memberSince} />
          <Row
            label="Plan"
            value={
              user.tier === 'pro'
                ? <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full">★ Pro</span>
                : <span className="inline-flex items-center gap-1.5 bg-forest-pale text-forest text-xs font-bold px-2.5 py-1 rounded-full">Free</span>
            }
          />
          <Row
            label="Current level"
            value="IELTS Preparation"
            note={<>
              <a href="/level-test" className="text-forest hover:underline">Take the level test</a>
              {' '}to find your starting level
            </>}
          />
        </div>

        {/* Writing practice stats */}
        <div className="bg-white rounded-2xl border border-bark/10 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-bark/8">
            <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">
              Writing Practice
            </p>
          </div>
          <div className="px-5 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-bark">Essays graded this fortnight</span>
              <span className="font-serif font-bold text-bark text-lg">
                {essayCount} <span className="text-bark-light font-sans text-sm font-normal">/ {FREE_LIMIT}</span>
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-bark/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${essayCount >= FREE_LIMIT ? 'bg-gold' : 'bg-forest'}`}
                style={{ width: `${Math.min((essayCount / FREE_LIMIT) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-bark-light">
              {essayCount >= FREE_LIMIT
                ? `Resets in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
                : `${FREE_LIMIT - essayCount} essay${FREE_LIMIT - essayCount !== 1 ? 's' : ''} remaining · resets in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={logout}
          className="w-full py-3.5 rounded-xl bg-forest text-white font-bold text-sm tracking-wide
            hover:bg-forest-mid transition-colors shadow-sm shadow-forest/20"
        >
          Log Out
        </button>

      </main>
    </div>
  )
}

function Row({ label, value, note }: { label: string; value: React.ReactNode; note?: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-bark-light">{label}</span>
        <span className="text-sm font-medium text-bark">{value}</span>
      </div>
      {note && <p className="text-xs text-bark-light/70 mt-1.5">{note}</p>}
    </div>
  )
}
