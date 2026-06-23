export function CTABanner() {
  return (
    <div className="bg-forest py-20 px-7 text-center">
      <h2 className="font-serif text-white text-4xl font-extrabold mb-4">Start learning today</h2>
      <p className="text-white/65 text-sm mb-8">Experience vocabulary, translation practice, and writing feedback live.</p>
      <a href="/register" className="bg-yellow-600 text-white font-bold px-9 py-4 rounded-lg text-base hover:-translate-y-0.5 transition-transform inline-block">Get Started Free →</a>
    </div>
  )
}
export function Footer() {
  return (
    <footer className="bg-bark py-9 px-7 text-center">
      <div className="font-serif text-yellow-400 text-xl font-bold mb-1.5">BurmaLingo</div>
      <p className="text-white/40 text-xs">Built by a Burmese immigrant, for Burmese learners worldwide.</p>
      <p className="text-white/50 text-xs mt-3 max-w-md mx-auto leading-relaxed">
        AI feedback and scores are estimates for practice purposes only. BurmaLingo is not affiliated with IELTS, British Council, or IDP.
      </p>
    </footer>
  )
}
