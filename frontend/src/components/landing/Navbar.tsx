interface NavbarProps { onDemo: () => void }
export default function Navbar({ onDemo }: NavbarProps) {
  return (
    <nav className="bg-forest sticky top-0 z-50 px-7 py-3.5 flex justify-between items-center">
      <span className="font-serif text-gold-light text-2xl font-black">BurmaLingo</span>
      <div className="flex gap-2">
        <button onClick={onDemo} className="text-white/75 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">Try Demo</button>
<button onClick={onDemo} className="bg-yellow-600 text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">Start Free →</button>      </div>
    </nav>
  )
}
