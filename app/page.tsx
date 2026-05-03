import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Homeopathy from '@/components/Homeopathy'
import Treatments from '@/components/Treatments'
import Locations from '@/components/Locations'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'
import MobileQuickbar from '@/components/MobileQuickbar'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Homeopathy />
        <Treatments />
        <Locations />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileQuickbar />
      <RevealOnScroll />
    </>
  )
}
