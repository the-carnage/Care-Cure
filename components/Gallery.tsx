'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from './Lightbox'
import styles from './Gallery.module.css'
import { galleryImages } from '../constants/images'

interface GalleryProps {
  limit?: number
}

interface GalleryImage {
  src: string
  alt: string
  title: string
}

// The galleryImages are imported from constants/images

export default function Gallery({ limit }: GalleryProps = {}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setTimeout(() => setSelectedImage(null), 300)
  }

  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-heading reveal">
          <span className="eyebrow">Gallery</span>
          <h2 id="gallery-title">Clinic &amp; Patient Gallery</h2>
          <p className="lead">
            A visual look at the doctor, clinic spaces, and patient visit moments from Care &amp; Cure
            Homoeopathic Clinic.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {(limit ? galleryImages.slice(0, limit) : galleryImages).map((image, index) => (
            <a
              key={index}
              className={`${styles.galleryItem} reveal`}
              href={image.src}
              data-title={image.title}
              onClick={(e) => {
                e.preventDefault()
                openLightbox(image)
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                loading="lazy"
                quality={75}
              />
            </a>
          ))}
        </div>

        {limit && galleryImages.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link 
              href="/gallery" 
              style={{
                display: 'inline-block',
                padding: '0.8rem 2rem',
                backgroundColor: '#10291f',
                color: '#fff',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              View Full Gallery
            </Link>
          </div>
        )}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        imageTitle={selectedImage?.title || ''}
        onClose={closeLightbox}
      />
    </section>
  )
}
