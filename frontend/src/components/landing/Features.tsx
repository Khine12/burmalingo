const features = [
  { icon: '🎓', label: 'IELTS Prep', sub: 'Writing & Reading' },
  { icon: '📝', label: 'Grammar', sub: 'Basic to Upper-Intermediate' },
  { icon: '📖', label: 'General Reading', sub: 'Real-life stories' },
  { icon: '✍️', label: 'General Writing', sub: 'Practice writing by level with AI feedback' },
  { icon: '💬', label: 'Vocabulary', sub: 'Daily phrases & words' },
  { icon: '🎧', label: 'Listening', sub: 'Coming soon' },
  { icon: '🎯', label: 'Level Test', sub: 'Find your level' },
  { icon: '🗣️', label: 'Speaking', sub: 'AI pronunciation scoring' },
]

export default function Features() {
  return (
    <section className="py-20 px-7 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <p className="section-label mb-3">Features</p>
        <h2 className="font-serif text-4xl font-extrabold text-bark">Everything you need<br/>to master English</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {features.map(f => (
          <div key={f.label} className="card px-4 py-4 flex items-center gap-3">
            <span className="text-2xl leading-none flex-shrink-0">{f.icon}</span>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-bark leading-snug">{f.label}</p>
              <p className="text-bark-light text-xs mt-0.5 leading-snug">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
