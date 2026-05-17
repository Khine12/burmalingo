const free = [
  '3 writing submissions per 2 weeks (IELTS + General combined)',
  '3 reading passages per 2 weeks (IELTS + General combined)',
  '1 grammar lesson per week',
  '1 vocabulary & phrases lesson per week',
  'Level test — one time only',
]

const pro = [
  'Unlimited IELTS & General Writing with full AI feedback',
  'Unlimited IELTS & General Reading',
  'Unlimited Grammar lessons — all levels',
  'Unlimited Vocabulary & Daily Phrases',
  'Retake level test anytime',
  'IELTS band score grading',
  'General Writing model answers',
  'All future content included',
]
export default function Pricing({onDemo}:{onDemo:()=>void}) {
  return (
    <section className="py-20 px-7">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="font-serif text-4xl font-extrabold text-bark">Start free. Upgrade when ready.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-9">
            <h3 className="font-serif text-2xl font-bold text-bark mb-2">Free</h3>
            <div className="flex items-baseline gap-1 mb-6"><span className="font-serif text-5xl font-black text-bark">$0</span><span className="text-bark-light text-sm">forever</span></div>
            {free.map(f=><div key={f} className="flex items-start gap-2.5 mb-3"><span className="text-green-700 mt-0.5 flex-shrink-0 text-sm">✓</span><span className="text-bark-light text-sm">{f}</span></div>)}
<button
  onClick={onDemo}
  className="mt-5 w-full py-3 rounded-lg bg-green-900 text-white font-bold text-sm hover:bg-green-800 transition-colors"
>
  Start Free
</button> </div>
            <div className="relative bg-forest border-2 border-yellow-400 rounded-2xl p-9">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-800 text-white text-xs font-bold tracking-widest px-4 py-1 rounded-full whitespace-nowrap">50% OFF</div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-1.5 mb-1"><span className="font-serif text-5xl font-black text-yellow-400">$5</span><span className="text-white/50 text-sm">/month</span></div>
            <div className="text-white/40 text-xs mb-6">Regular price: <span className="line-through">$10/month</span></div>
            {pro.map(f=><div key={f} className="flex items-start gap-2.5 mb-3"><span className="text-yellow-400 mt-0.5 flex-shrink-0 text-sm">✓</span><span className="text-white/80 text-sm">{f}</span></div>)}
            <button onClick={onDemo} className="mt-5 w-full py-3 rounded-lg bg-yellow-600 text-white font-bold text-sm hover:bg-yellow-500 transition-colors">Start 3-Day Free Trial</button>
          </div>
        </div>
        <p className="text-center text-bark-light text-xs mt-5">
          🇲🇲 In Myanmar? <a href="https://www.facebook.com/profile.php?id=61589778724021" target="_blank" rel="noopener noreferrer" className="underline hover:text-bark transition-colors">Contact us on Facebook</a> for pricing and payment options.
        </p>
      </div>
    </section>
  )
}
