export default function DemoPage() {
  return (
    <div className="min-h-screen bg-cream font-sans flex flex-col">

      {/* ── Header ── */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1.5 text-bark-light hover:text-bark text-sm transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Home
          </a>
          <span className="font-serif font-bold text-bark">BurmaLingo</span>
          <div className="flex items-center gap-2">
            <a href="/login"    className="text-bark-light text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-bark/5 transition-colors">Log In</a>
            <a href="/register" className="bg-forest text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-forest-mid transition-colors">Sign Up</a>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full space-y-10">

          {/* Title */}
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-widest text-forest uppercase">Free Demo · No signup needed</p>
            <h1 className="font-serif text-4xl font-bold text-bark">Try IELTS Practice</h1>
            <p className="text-bark-light text-sm max-w-sm mx-auto leading-relaxed">
              Choose a practice mode below. Create a free account to track your progress and save your scores.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Writing */}
            <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-7 flex flex-col gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-forest-pale flex items-center justify-center text-2xl">
                ✍️
              </div>
              <div className="space-y-1.5">
                <h2 className="font-serif text-xl font-bold text-bark">IELTS Writing Practice</h2>
                <p className="text-bark-light text-sm leading-relaxed">
                  Write a Task 2 essay on an exam-style topic and get an instant AI band score with detailed feedback across all 4 marking criteria.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold bg-forest-pale text-forest px-2.5 py-1 rounded-full">AI Band Scoring</span>
                <span className="text-xs font-semibold bg-forest-pale text-forest px-2.5 py-1 rounded-full">35 Topics</span>
                <span className="text-xs font-semibold bg-forest-pale text-forest px-2.5 py-1 rounded-full">Detailed Feedback</span>
              </div>
              <a
                href="/writing"
                className="mt-auto w-full py-3 bg-forest text-white font-bold text-sm rounded-xl text-center hover:bg-forest-mid transition-colors shadow-sm shadow-forest/20"
              >
                Try Writing →
              </a>
            </div>

            {/* Reading */}
            <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-7 flex flex-col gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gold-pale flex items-center justify-center text-2xl">
                📖
              </div>
              <div className="space-y-1.5">
                <h2 className="font-serif text-xl font-bold text-bark">IELTS Reading Practice</h2>
                <p className="text-bark-light text-sm leading-relaxed">
                  Read academic passages and answer IELTS-style questions: True/False/Not Given, multiple choice, fill-in-the-blank, and paragraph matching.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold bg-gold-pale text-gold px-2.5 py-1 rounded-full">13 Passages</span>
                <span className="text-xs font-semibold bg-gold-pale text-gold px-2.5 py-1 rounded-full">4 Question Types</span>
                <span className="text-xs font-semibold bg-gold-pale text-gold px-2.5 py-1 rounded-full">Instant Results</span>
              </div>
              <a
                href="/reading"
                className="mt-auto w-full py-3 bg-gold text-white font-bold text-sm rounded-xl text-center hover:opacity-90 transition-opacity shadow-sm shadow-gold/20"
              >
                Try Reading →
              </a>
            </div>
          </div>

          {/* Sign-up nudge */}
          <p className="text-center text-sm text-bark-light">
            Want to track your progress and unlock all features?{' '}
            <a href="/register" className="text-forest font-semibold hover:underline">
              Create a free account →
            </a>
          </p>

        </div>
      </main>
    </div>
  )
}
