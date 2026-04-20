const steps = [
  {n:'01',title:'Take the placement test',desc:'Five questions place you in the right level automatically. Skip it if you already know where you are.'},
  {n:'02',title:'Learn daily',desc:'Read passages, translate Burmese sentences, practice writing. The SM-2 algorithm schedules exactly what you need each day.'},
  {n:'03',title:'Get AI feedback',desc:'Every sentence you write and every translation you submit gets checked. You see what was wrong and why — calibrated to your level.'},
]
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-7 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-label mb-3">How It Works</p>
        <h2 className="font-serif text-4xl font-extrabold text-bark">Three steps to real English</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map(s=>(
          <div key={s.n} className="card p-8 hover:-translate-y-1 transition-transform duration-200">
            <div className="font-serif text-4xl font-black text-border mb-3 leading-none">{s.n}</div>
            <h3 className="font-serif text-lg font-bold text-bark mb-2">{s.title}</h3>
            <p className="text-bark-light text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
