const features = [
  {icon:'📖',title:'Reading Comprehension',desc:'Graded passages from Level 5 to 10. Vocabulary in context, comprehension questions. Free: 3 per 2 weeks.',badge:null},
  {icon:'✍️',title:'Writing Practice',desc:'Given a topic, write your response. AI grades grammar, structure, and vocabulary — shows a model answer. Free: 3 per 2 weeks, feedback locked.',badge:'Pro — AI feedback'},
  {icon:'🔄',title:'Translation Practice',desc:'Given a Burmese sentence, write it in English. AI evaluates and explains. Free: 3 per week, feedback locked.',badge:'Pro — AI feedback'},
  {icon:'🧠',title:'Vocabulary (SM-2)',desc:'Spaced repetition algorithm built from scratch. Reviews scheduled at exactly the moment you are about to forget. Free: 10 per week.',badge:null},
  {icon:'🔈',title:'Listening Practice',desc:'Pre-generated native audio stored permanently. Listen and answer comprehension questions. Free: 3 per 2 weeks.',badge:null},
  {icon:'🎙️',title:'Speaking Practice',desc:'Record yourself. Web Speech API transcribes, backend compares, AI gives pronunciation and accuracy feedback.',badge:'Pro only'},
]
export default function Features() {
  return (
    <section className="py-20 px-7 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-label mb-3">Features</p>
        <h2 className="font-serif text-4xl font-extrabold text-bark">Everything you need<br/>to master English</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(f=>(
          <div key={f.title} className="card p-7 hover:-translate-y-1 transition-transform duration-200">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-serif text-lg font-bold text-bark mb-2">{f.title}</h3>
            {f.badge&&<span className="inline-block text-xs bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full mb-2">{f.badge}</span>}
            <p className="text-bark-light text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
