import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import FounderStory from '../components/landing/FounderStory'
import LevelGrid from '../components/landing/LevelGrid'
import Features from '../components/landing/Features'
import Pricing from '../components/landing/Pricing'
import { CTABanner, Footer } from '../components/landing/CTAFooter'

export default function Landing({onDemo}:{onDemo:()=>void}) {
  return (
    <div className="min-h-screen bg-cream text-bark font-sans">
      <Navbar onDemo={onDemo}/>
      <Hero onDemo={onDemo}/>
      <HowItWorks/>
      <FounderStory/>
      <LevelGrid/>
      <Features/>
      <CTABanner onDemo={onDemo}/>
      <Pricing onDemo={onDemo}/>
      <Footer/>
    </div>
  )
}
