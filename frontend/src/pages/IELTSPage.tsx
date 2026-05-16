function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const cards = [
  {
    icon: '✍️',
    title: 'IELTS Writing',
    desc: 'Task 1 & Task 2 — get AI feedback on your essays',
    href: '/writing',
    available: true,
  },
  {
    icon: '📖',
    title: 'IELTS Reading',
    desc: 'Academic passages with T/F/NG, multiple choice & fill-in',
    href: '/ielts/reading',
    available: true,
  },
  {
    icon: '🎧',
    title: 'IELTS Listening',
    desc: 'Coming soon',
    href: null,
    available: false,
  },
]

export default function IELTSPage() {
  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* Header */}
      <header className="bg-forest sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <span className="font-serif text-gold-light text-2xl font-black">BurmaLingo</span>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* Title */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-bark-light uppercase mb-2">IELTS Preparation</p>
          <h1 className="font-serif text-3xl font-bold text-bark">Choose your practice area</h1>
          <p className="text-bark-light text-sm mt-1">Academic-style practice for all four IELTS skills</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((c) =>
            c.available ? (
              <a
                key={c.title}
                href={c.href!}
                style={{ backgroundColor: '#1a3a2a' }}
                className="rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 group"
              >
                <span className="text-4xl leading-none">{c.icon}</span>
                <div>
                  <p className="font-serif text-lg font-bold text-white leading-snug">{c.title}</p>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">{c.desc}</p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors">
                    Start practice →
                  </span>
                </div>
              </a>
            ) : (
              <div
                key={c.title}
                className="rounded-2xl p-7 flex flex-col gap-4 bg-white border border-bark/10 opacity-50 cursor-not-allowed"
              >
                <span className="text-4xl leading-none">{c.icon}</span>
                <div>
                  <p className="font-serif text-lg font-bold text-bark leading-snug">{c.title}</p>
                  <p className="text-bark-light text-sm mt-1">{c.desc}</p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="text-xs font-semibold text-bark-light">Coming soon</span>
                </div>
              </div>
            )
          )}
        </div>

      </main>
    </div>
  )
}
