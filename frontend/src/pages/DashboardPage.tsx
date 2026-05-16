import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getWeekStart } from '../utils/activity'

// ── Storage helpers ──────────────────────────────────────────────────
function weeklyCount(key: string): number {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return 0
    const { weekStart, count } = JSON.parse(raw) as { weekStart: string; count: number }
    return weekStart === getWeekStart() ? count : 0
  } catch { return 0 }
}

interface Stats {
  essaysWeek:    number
  readingsWeek:  number
  totalEssays:   number
  totalReadings: number
  streak:        number
}

function readStats(): Stats {
  return {
    essaysWeek:    weeklyCount('burmalingo_essays_week'),
    readingsWeek:  weeklyCount('burmalingo_reading_count_week'),
    totalEssays:   parseInt(localStorage.getItem('burmalingo_usage') ?? '0', 10),
    totalReadings: parseInt(localStorage.getItem('burmalingo_reading_total') ?? '0', 10),
    streak:        parseInt(localStorage.getItem('burmalingo_streak') ?? '0', 10),
  }
}

function goalMessage(n: number): string {
  if (n >= 5) return 'Weekly goal reached! 🎉'
  if (n === 4) return 'Almost there!'
  if (n >= 2) return 'Good momentum!'
  return 'Just getting started!'
}

function streakMessage(n: number): string {
  if (n === 0) return 'Start your streak today!'
  if (n === 1) return '🔥 1 day — keep it going!'
  if (n >= 7)  return `🔥 ${n} day streak — incredible!`
  if (n >= 3)  return `🔥 ${n} day streak — you're on fire!`
  return `🔥 ${n} day streak`
}

function initials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

// ── Page ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const [stats]    = useState<Stats>(readStats)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) window.location.href = '/login'
  }, [isLoading, user])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  if (isLoading || !user) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-forest border-t-transparent animate-spin" />
    </div>
  )

  const firstName   = (user.name || user.email).split(/[\s@]/)[0]
  const displayName = user.name || user.email.split('@')[0]
  const today       = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const weeklyTotal = stats.essaysWeek + stats.readingsWeek

  const features = [
    {
      icon: '✍️', title: 'IELTS Writing',
      desc: `${stats.essaysWeek} ${stats.essaysWeek === 1 ? 'essay' : 'essays'} this week`,
      available: true, href: '/writing', theme: 'forest' as const,
    },
    {
      icon: '📖', title: 'IELTS Reading',
      desc: `${stats.readingsWeek} ${stats.readingsWeek === 1 ? 'passage' : 'passages'} this week`,
      available: true, href: '/reading', theme: 'gold' as const,
    },
    {
      icon: '📊', title: 'Level Test',
      desc: 'Find your starting level',
      available: true, href: '/level-test', theme: 'gold' as const,
    },
    {
      icon: '📝', title: 'Grammar Practice',
      desc: 'Build grammar skills step by step',
      available: true, href: '/grammar', theme: 'forest' as const,
    },
    { icon: '📚', title: 'Vocabulary SM-2',      desc: 'Coming soon', available: false },
    { icon: '🔄', title: 'Translation Practice', desc: 'Coming soon', available: false },
    { icon: '🎧', title: 'Listening Practice',   desc: 'Coming soon', available: false },
    { icon: '🎤', title: 'Speaking Practice',    desc: 'Coming soon', available: false },
  ]

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── Navbar ── */}
      <header className="bg-forest sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <span className="font-serif text-gold-light text-2xl font-black">BurmaLingo</span>
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(o => !o) }}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Account menu"
            >
              <span className="text-white text-[11px] font-bold leading-none">{initials(displayName)}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-bark/10 py-1.5 w-36 z-20">
                <a href="/profile" className="block px-4 py-2 text-sm text-bark hover:bg-bark/5 transition-colors">Profile</a>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Log Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* ── Welcome ── */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-bark">Welcome back, {firstName}!</h1>
          <p className="text-bark-light text-sm mt-0.5">{today}</p>
        </div>

        {/* ── Upgrade banner ── */}
        {user.tier === 'free' && (
          <div className="flex items-center justify-between bg-forest/10 border border-forest/20 rounded-xl px-5 py-3.5">
            <div>
              <p className="text-sm font-semibold text-bark">You're on the Free plan</p>
              <p className="text-xs text-bark-light mt-0.5">Unlock unlimited practice + AI feedback</p>
            </div>
            <a
              href="/pricing"
              className="shrink-0 ml-4 bg-forest text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        )}

        {/* ── 4-stat row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MiniStat emoji="✍️" accent="forest" label="Essays this week"   value={stats.essaysWeek} />
          <MiniStat emoji="📖" accent="gold"   label="Passages this week" value={stats.readingsWeek} />
          <MiniStat emoji="📝" accent="forest" label="Total essays"       value={stats.totalEssays} />
          <MiniStat emoji="📚" accent="gold"   label="Total passages"     value={stats.totalReadings} />
        </div>

        {/* ── Activity strip ── */}
        <div className="bg-white rounded-xl border border-bark/10 shadow-sm px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-bark">{streakMessage(stats.streak)}</span>
            <span className="text-sm text-bark-light tabular-nums">{Math.min(weeklyTotal, 5)} / 5 this week</span>
          </div>
          <div className="h-3 bg-bark/8 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                weeklyTotal >= 5 ? 'bg-forest' : weeklyTotal >= 3 ? 'bg-forest-mid' : 'bg-gold'
              }`}
              style={{ width: `${Math.min((weeklyTotal / 5) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-bark-light">{goalMessage(weeklyTotal)}</p>
        </div>

        {/* ── Practice tools ── */}
        <section>
          <h2 className="font-serif text-lg font-bold text-bark mb-3">Your Practice Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map((f, i) =>
              f.available ? (
                <a
                  key={i}
                  href={f.href}
                  className={`rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 shadow-sm ${
                    f.theme === 'forest'
                      ? 'bg-forest text-white shadow-forest/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/30'
                      : 'bg-gold text-white shadow-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/30'
                  }`}
                >
                  <span className="text-xl">{f.icon}</span>
                  <p className="font-semibold text-sm leading-snug">{f.title}</p>
                  <p className="text-xs opacity-80 leading-snug">{f.desc}</p>
                </a>
              ) : (
                <div key={i} className="rounded-xl p-4 flex flex-col gap-2 bg-white border border-bark/10 opacity-55">
                  <span className="text-xl">{f.icon}</span>
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

function MiniStat({ emoji, accent, label, value }: {
  emoji:  string
  accent: 'forest' | 'gold'
  label:  string
  value:  number
}) {
  return (
    <div className={`bg-white rounded-xl border border-bark/10 shadow-sm px-4 py-3.5 border-l-4 ${
      accent === 'forest' ? 'border-l-forest' : 'border-l-gold'
    }`}>
      <p className="font-serif text-2xl font-bold text-bark">{value}</p>
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-xs">{emoji}</span>
        <p className="text-[11px] text-bark-light leading-snug">{label}</p>
      </div>
    </div>
  )
}
