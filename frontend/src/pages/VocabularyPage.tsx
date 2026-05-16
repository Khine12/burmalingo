function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const categories = [
  {
    icon: '💬',
    title: 'Daily Phrases',
    desc: 'Greetings, requests, shopping, directions and more',
    href: '/vocabulary/daily-phrases',
    bg: '#5b3d6e',
  },
  {
    icon: '📚',
    title: 'Common Words',
    desc: 'Family, food, numbers, colors and everyday vocabulary',
    href: '/vocabulary/common-words',
    bg: '#b45309',
  },
]

export default function VocabularyPage() {
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
          <p className="text-xs font-semibold tracking-widest text-bark-light uppercase mb-2">Vocabulary & Daily English</p>
          <h1 className="font-serif text-3xl font-bold text-bark">Choose a category</h1>
          <p className="text-bark-light text-sm mt-1">Build practical English vocabulary one lesson at a time</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <a
              key={c.href}
              href={c.href}
              style={{ backgroundColor: c.bg }}
              className="rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 group"
            >
              <span className="text-4xl leading-none">{c.icon}</span>
              <div>
                <p className="font-serif text-xl font-bold text-white leading-snug">{c.title}</p>
                <p className="text-white/60 text-sm mt-1 leading-relaxed">{c.desc}</p>
              </div>
              <div className="mt-auto pt-2">
                <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors">
                  Start practice →
                </span>
              </div>
            </a>
          ))}
        </div>

      </main>
    </div>
  )
}
