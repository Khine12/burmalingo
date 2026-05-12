import { useState } from 'react'
const LEVELS = [
  {n:1,name:'Basic',            desc:'Alphabet, numbers, basic greetings and everyday phrases',         available:false},
  {n:2,name:'Elementary',       desc:'Simple sentences, present tense and essential vocabulary',         available:false},
  {n:3,name:'Pre-Intermediate', desc:'Past and future tense, common grammar patterns',                   available:false},
  {n:4,name:'Intermediate I',   desc:'Complex grammar, formal vs. informal register',                    available:false},
  {n:5,name:'Intermediate II',  desc:'Idiomatic expressions, paragraph writing skills',                  available:false},
  {n:6,name:'Upper-Intermediate',desc:'Advanced grammar, professional writing and complex topics',       available:false},
  {n:7,name:'IELTS Preparation',desc:'IELTS writing and reading practice with AI examiner feedback',     available:true},
]
export default function LevelGrid() {
  const [hovered,setHovered]=useState<number|null>(null)
  return (
    <section className="py-20 px-7 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-label mb-3">Curriculum</p>
        <h2 className="font-serif text-4xl font-extrabold text-bark mb-4">7 levels. One clear path.</h2>
        <p className="text-bark-light text-sm max-w-md mx-auto">No jumping around — each level builds on the last.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEVELS.map(lv=>(
          <div key={lv.n} onMouseEnter={()=>setHovered(lv.n)} onMouseLeave={()=>setHovered(null)}
            className={`rounded-xl border p-5 transition-all duration-200 ${lv.n===7?'sm:col-span-2':''} ${lv.available?(hovered===lv.n?'bg-forest border-green-700':'bg-card border-border hover:-translate-y-0.5'):'bg-cream border-border opacity-60'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${lv.available?(hovered===lv.n?'bg-white/15 text-yellow-400':'bg-yellow-50 text-yellow-600'):'bg-gray-200 text-gray-500'}`}>{lv.n}</div>
                <span className={`font-serif font-bold text-sm ${lv.available?(hovered===lv.n?'text-white':'text-bark'):'text-bark-light'}`}>{lv.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${!lv.available?'bg-gray-200 text-gray-500':hovered===lv.n?'bg-white/15 text-yellow-400':'bg-green-50 text-green-700'}`}>
                {lv.available?'Available':'Coming soon'}
              </span>
            </div>
            <p className={`text-xs leading-relaxed ml-9 ${lv.available?(hovered===lv.n?'text-white/70':'text-bark-light'):'text-bark-light'}`}>{lv.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
