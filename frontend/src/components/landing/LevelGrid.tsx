const levels = [
  { n: 1, name: 'Basic', desc: 'Present simple, past simple, articles, prepositions, common vocabulary', available: true },
  { n: 2, name: 'Elementary', desc: 'Present continuous, past continuous, comparatives, modal verbs, conjunctions', available: true },
  { n: 3, name: 'Pre-Intermediate', desc: 'Present perfect, passive voice, conditionals, phrasal verbs, reported speech', available: true },
  { n: 4, name: 'Intermediate', desc: 'Complex grammar, formal vs informal register, advanced vocabulary', available: false },
  { n: 5, name: 'Upper-Intermediate', desc: 'Idiomatic expressions, academic writing, nuanced grammar', available: false },
  { n: 6, name: 'IELTS Preparation', desc: 'IELTS writing and reading practice with AI examiner feedback', available: true },
]

export default function LevelGrid() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Curriculum</p>
          <h2 className="font-serif text-4xl font-extrabold text-bark">6 levels. One clear path.</h2>
          <p className="text-bark-light text-sm mt-3">No jumping around — each level builds on the last.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {levels.map(l => (
            <div key={l.n} className="card p-6 flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bark/8 text-bark-light text-sm font-bold flex items-center justify-center mt-0.5">{l.n}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif font-bold text-bark">{l.name}</h3>
                  {l.available
                    ? <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">Available</span>
                    : <span className="text-xs font-semibold text-bark-light/60 bg-bark/5 px-2.5 py-0.5 rounded-full whitespace-nowrap">Coming soon</span>
                  }
                </div>
                <p className="text-bark-light text-sm leading-relaxed">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
