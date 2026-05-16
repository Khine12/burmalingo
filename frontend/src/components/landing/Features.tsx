const features = [
  { icon: '📝', title: 'Grammar Practice', desc: 'Step-by-step grammar lessons from Basic to Pre-Intermediate. One question at a time with instant feedback and explanations.', badge: null },
  { icon: '📖', title: 'General Reading', desc: 'Real-life stories about living in America — going to the doctor, renting an apartment, starting a new job. Basic and Elementary levels available.', badge: null },
  { icon: '✍️', title: 'IELTS Writing', desc: 'Given a topic, write your response. AI grades grammar, structure, and vocabulary — shows a model answer and band score.', badge: 'Pro — AI feedback' },
  { icon: '📚', title: 'IELTS Reading', desc: 'Academic-style passages with True/False/Not Given, multiple choice, fill-in, and paragraph matching questions.', badge: null },
  { icon: '💬', title: 'Vocabulary & Daily English', desc: 'Daily phrases for real situations — greetings, shopping, directions, asking for help. Common words for family, food, numbers, and more.', badge: null },
  { icon: '🎯', title: 'Level Test', desc: 'Not sure where to start? Take a 35-question placement test to find your level automatically.', badge: null },
]

export default function Features() {
  return (
    <section className="py-20 px-7 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-label mb-3">Features</p>
        <h2 className="font-serif text-4xl font-extrabold text-bark">Everything you need<br/>to master English</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(f => (
          <div key={f.title} className="card p-7 hover:-translate-y-1 transition-transform duration-200">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-serif text-lg font-bold text-bark mb-2">{f.title}</h3>
            {f.badge && <span className="inline-block text-xs bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full mb-2">{f.badge}</span>}
            <p className="text-bark-light text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
