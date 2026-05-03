'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import styles from './Gallery.module.css'

interface GalleryImage {
  src: string
  alt: string
  title: string
}

const galleryImages: GalleryImage[] = [
  { src: 'https://i.ibb.co/nMn5x8Br/Dr-Hafizur-Rahman.jpg', alt: 'Doctor portrait of Dr. Hafizur Rahman', title: 'Doctor' },
  { src: 'https://i.ibb.co/Rk29HHH7/Receiption1.jpg', alt: 'Reception area at Care and Cure Homoeopathic Clinic', title: 'Reception' },
  { src: 'https://i.ibb.co/hJ60ktTK/Clinic-Lobby1.jpg', alt: 'Clinic lobby view 1', title: 'Lobby 1' },
  { src: 'https://i.ibb.co/V0NDxVDt/Clinic-Lobby2.jpg', alt: 'Clinic lobby view 2', title: 'Lobby 2' },
  { src: 'https://i.ibb.co/3yRzY4KF/Clinic-Lobby3.jpg', alt: 'Clinic lobby view 3', title: 'Lobby 3' },
  { src: 'https://i.ibb.co/MyXMV2hV/Doctor-Chamber1.jpg', alt: 'Doctor chamber at the clinic', title: 'Doctor Chamber' },
  { src: 'https://i.ibb.co/27FnPp8N/Patient-Visit1.jpg', alt: 'Patient visit at Care and Cure Homoeopathic Clinic', title: 'Patient Visit' },
  { src: 'https://i.ibb.co/HfRDCx3z/Patient-Image1.jpg', alt: 'Patient image 1', title: 'Patient Image 1' },
  { src: 'https://i.ibb.co/jZ4g0dWc/Patient-Image2.jpg', alt: 'Patient image 2', title: 'Patient Image 2' },
  { src: 'https://i.ibb.co/bM3DHdCT/Patient-Image3.jpg', alt: 'Patient image 3', title: 'Patient Image 3' },
  { src: 'https://i.ibb.co/G3dkTVJs/Patient-Image4.jpg', alt: 'Patient image 4', title: 'Patient Image 4' },
  { src: 'https://i.ibb.co/HfhsWjGK/Patient-Image5.jpg', alt: 'Patient image 5', title: 'Patient Image 5' },
  { src: 'https://i.ibb.co/mV1mhtf5/Patient-Image6.jpg', alt: 'Patient image 6', title: 'Patient Image 6' },
  { src: 'https://i.ibb.co/Gfvvs1tf/Patient-Image7.jpg', alt: 'Patient image 7', title: 'Patient Image 7' },
  { src: 'https://i.ibb.co/Crw1Gh3/Patient-Image8.jpg', alt: 'Patient image 8', title: 'Patient Image 8' },
  { src: 'https://i.ibb.co/KjyLGRMQ/Patient-Image9.jpg', alt: 'Patient image 9', title: 'Patient Image 9' },
  { src: 'https://i.ibb.co/wNHxqB5V/Patient-Image10.jpg', alt: 'Patient image 10', title: 'Patient Image 10' },
  { src: 'https://i.ibb.co/N23HcWfN/Patient-Image11.jpg', alt: 'Patient image 11', title: 'Patient Image 11' },
  { src: 'https://i.ibb.co/5WsrPrs2/Patient-Image12.jpg', alt: 'Patient image 12', title: 'Patient Image 12' },
  { src: 'https://i.ibb.co/pjQwR3Fg/Patient-Image13.jpg', alt: 'Patient image 13', title: 'Patient Image 13' },
  { src: 'https://i.ibb.co/G4xDHqK0/Patient-Image14.jpg', alt: 'Patient image 14', title: 'Patient Image 14' },
  { src: 'https://i.ibb.co/Fb1PXtwH/Patient-Image15.jpg', alt: 'Patient image 15', title: 'Patient Image 15' },
  { src: 'https://i.ibb.co/hxDG5qyG/Patient-Image16.jpg', alt: 'Patient image 16', title: 'Patient Image 16' },
  { src: 'https://i.ibb.co/239Jz5LR/Patient-Image17.jpg', alt: 'Patient image 17', title: 'Patient Image 17' },
  { src: 'https://i.ibb.co/gZGm3VZd/Patient-Image18.jpg', alt: 'Patient image 18', title: 'Patient Image 18' },
  { src: 'https://i.ibb.co/B5NF062K/Patient-Image19.jpg', alt: 'Patient image 19', title: 'Patient Image 19' },
]

export default function Gallery() {
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
          {galleryImages.map((image, index) => (
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
