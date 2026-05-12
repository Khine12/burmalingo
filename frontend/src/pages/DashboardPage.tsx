import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const USAGE_KEY = 'burmalingo_usage'
const BAND_KEY  = 'burmalingo_highest_band'

interface Stats {
  totalEssays: number
  highestBand: number
}

function readStats(): Stats {
  return {
    totalEssays: parseInt(localStorage.getItem(USAGE_KEY) ?? '0', 10),
    highestBand: parseFloat(localStorage.getItem(BAND_KEY) ?? '0'),
  }
}

function initials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const [stats] = useState<Stats>(readStats)

  useEffect(() => {
    if (!isLoading && !user) window.location.href = '/login'
  }, [isLoading, user])

  if (isLoading || !user) return <div className="min-h-screen bg-cream" />

  const firstName   = (user.name || user.email).split(/[\s@]/)[0]
  const displayName = user.name || user.email.split('@')[0]
  const today       = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const milestones = [
    { emoji: '🎉', label: 'First Step',        desc: 'Account created',   unlocked: true },
    { emoji: '🖊️', label: 'First Essay',       desc: '1 essay graded',    unlocked: stats.totalEssays >= 1 },
    { emoji: '📝', label: 'Getting Serious',   desc: '3 essays graded',   unlocked: stats.totalEssays >= 3 },
    { emoji: '🏆', label: 'Dedicated Writer',  desc: '10 essays graded',  unlocked: stats.totalEssays >= 10 },
    { emoji: '⭐', label: 'Band 6 Achieved',   desc: 'Highest band ≥ 6.0', unlocked: stats.highestBand >= 6.0 },
    { emoji: '🌟', label: 'Band 7 Achieved',   desc: 'Highest band ≥ 7.0', unlocked: stats.highestBand >= 7.0 },
    { emoji: '🔒', label: 'Vocabulary Master', desc: 'Coming soon',       unlocked: false },
    { emoji: '🔒', label: 'Reading Pro',       desc: 'Coming soon',       unlocked: false },
  ]

  const features = [
    {
      icon: '✍️', title: 'IELTS Writing Practice',
      desc: 'Try it now — no limits',
      available: true, href: '/writing', theme: 'forest' as const,
    },
    {
      icon: '📊', title: 'Level Test',
      desc: 'Find your starting level — retake anytime',
      available: true, href: '/level-test', theme: 'gold' as const,
    },
    { icon: '📚', title: 'Vocabulary SM-2',         desc: 'Coming soon', available: false },
    { icon: '📖', title: 'Reading Comprehension',   desc: 'Coming soon', available: false },
    { icon: '🔄', title: 'Translation Practice',    desc: 'Coming soon', available: false },
    { icon: '🎧', title: 'Listening Practice',       desc: 'Coming soon', available: false },
    { icon: '🎤', title: 'Speaking Practice',        desc: 'Coming soon', available: false },
  ]

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── Navbar ── */}
      <header className="bg-forest sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <span className="font-serif text-gold-light text-2xl font-black">BurmaLingo</span>
          <div className="flex items-center gap-3">
            <a
              href="/profile"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              title="View profile"
            >
              <span className="text-white text-xs font-bold">{initials(displayName)}</span>
            </a>
            <button
              onClick={logout}
              className="text-white/80 text-sm font-medium px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── Welcome ── */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-bark">Welcome back, {firstName}!</h1>
          <p className="text-bark-light text-sm mt-1">{today}</p>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Essays Graded" value={String(stats.totalEssays)} />
          <StatCard label="Current Plan"  value={user.tier === 'pro' ? 'Pro ★' : 'Free'} />
          <StatCard label="Member Since"  value={memberSince} small />
        </div>

        {/* ── Milestones ── */}
        <section>
          <h2 className="font-serif text-xl font-bold text-bark mb-4">Your Journey</h2>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`snap-start flex-shrink-0 rounded-xl border p-4 text-center w-[112px] flex flex-col items-center gap-2 transition-all ${
                  m.unlocked
                    ? 'bg-forest-pale border-forest/25'
                    : 'bg-white border-bark/10 opacity-50'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <p className={`text-xs font-semibold leading-snug ${m.unlocked ? 'text-forest' : 'text-bark-light'}`}>
                    {m.label}
                  </p>
                  <p className="text-[10px] text-bark-light/70 mt-0.5 leading-snug">{m.desc}</p>
                </div>
                {m.unlocked && (
                  <span className="w-4 h-4 rounded-full bg-forest flex-shrink-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Features grid ── */}
        <section>
          <h2 className="font-serif text-xl font-bold text-bark mb-4">Your Practice Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map((f, i) =>
              f.available ? (
                <a
                  key={i}
                  href={f.href}
                  className={`rounded-xl p-5 flex flex-col gap-2.5 cursor-pointer hover:-translate-y-0.5 transition-transform shadow-sm ${
                    f.theme === 'forest'
                      ? 'bg-forest text-white shadow-forest/20'
                      : 'bg-gold text-white shadow-gold/20'
                  }`}
                >
                  <span className="text-2xl">{f.icon}</span>
                  <p className="font-semibold text-sm leading-snug">{f.title}</p>
                  <p className="text-xs opacity-80 leading-snug">{f.desc}</p>
                </a>
              ) : (
                <div
                  key={i}
                  className="rounded-xl p-5 flex flex-col gap-2.5 bg-white border border-bark/10 opacity-55"
                >
                  <span className="text-2xl">{f.icon}</span>
                  <p className="font-semibold text-sm text-bark leading-snug">{f.title}</p>
                  <p className="text-xs text-bark-light leading-snug">{f.desc}</p>
                </div>
              )
            )}
          </div>
        </section>

        <p className="text-center text-xs text-bark-light pb-4">More features coming July 2026</p>
      </main>
    </div>
  )
}

function StatCard({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-bark/10 shadow-sm px-4 py-5 text-center">
      <p className="text-xs text-bark-light uppercase tracking-widest font-semibold mb-2">{label}</p>
      <p className={`font-serif font-bold text-bark leading-snug ${small ? 'text-sm' : 'text-2xl'}`}>
        {value}
      </p>
    </div>
  )
}
