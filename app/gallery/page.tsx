import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'
import Link from 'next/link'

export default function GalleryPage() {
  return (
    <>
      <header style={{ padding: '1.5rem 2rem', background: '#10291f', display: 'flex', alignItems: 'center' }}>
        <Link 
          href="/" 
          style={{ 
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          &larr; Back to Clinic Home
        </Link>
      </header>
      <main id="main-content" style={{ minHeight: '80vh' }}>
        {/* We do not pass a limit here, so all images show */}
        <Gallery />
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  )
}
