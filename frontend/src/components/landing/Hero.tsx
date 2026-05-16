const heroFeatures = [
  { icon: '🎓', label: 'IELTS Prep', sub: 'Writing & Reading' },
  { icon: '📝', label: 'Grammar', sub: 'Basic to Upper-Intermediate' },
  { icon: '📖', label: 'General Reading', sub: 'Real-life stories' },
  { icon: '✍️', label: 'General Writing', sub: 'Coming soon' },
  { icon: '💬', label: 'Vocabulary', sub: 'Daily phrases & words' },
  { icon: '🎧', label: 'Listening', sub: 'Coming soon' },
  { icon: '🎯', label: 'Level Test', sub: 'Find your level' },
  { icon: '🗣️', label: 'Speaking', sub: 'Coming soon' },
]

interface HeroProps { onDemo: () => void }
export default function Hero({ onDemo }: HeroProps) {
  return (
    <div className="relative overflow-hidden text-center px-7 py-24" style={{background:'linear-gradient(165deg,#0D2B1E 0%,#1B4332 60%,#163827 100%)'}}>
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-yellow-600/20 pointer-events-none"/>
      <div className="text-5xl mb-5">🏛️</div>
      <p className="text-yellow-400 text-xs tracking-widest uppercase mb-4">For Burmese Speakers</p>
      <h1 className="font-serif text-white font-black leading-tight mb-3" style={{fontSize:'clamp(34px,5.5vw,62px)'}}>
        English. Explained<br/><span className="text-yellow-400 italic">in your language.</span>
      </h1>
      <p className="text-white/65 text-sm max-w-lg mx-auto mb-9 leading-relaxed">
        Grammar explained in Burmese. Spaced repetition vocabulary. AI writing feedback — built by a Burmese immigrant who studied English before arriving in the US, and learned what real-world fluency actually takes after 3 years of living it.
      </p>
      <div className="flex gap-2.5 justify-center flex-wrap">
        <button onClick={onDemo} className="bg-yellow-600 text-white font-bold px-7 py-4 rounded-lg text-base hover:-translate-y-0.5 transition-transform">Try It Free →</button>
        <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})} className="bg-white/10 text-white/85 font-medium px-7 py-4 rounded-lg border border-white/20 text-base hover:bg-white/15 transition-colors">How It Works</button>
      </div>
    </div>
  )
}
