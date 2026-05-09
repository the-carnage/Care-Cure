import Image from 'next/image'
import styles from './Locations.module.css'
import { interiorPhotos } from '../constants/images'

interface LocationCard {
  title: string
  address: string
  phone: string
  phoneHref: string
}

interface InteriorPhoto {
  src: string
  alt: string
  caption: string
}

const locations: LocationCard[] = [
  {
    title: 'Clinic 1',
    address: 'Bilasipara, Purani Bazar',
    phone: '8876341148',
    phoneHref: 'tel:8876341148',
  },
  {
    title: 'Clinic 2 (Home)',
    address: 'Bilasipara, Botertol — Near N.H. Memorial Academy',
    phone: '8876341148',
    phoneHref: 'tel:8876341148',
  },
]

// The interiorPhotos are imported from constants/images

export default function Locations() {
  return (
    <section className="section soft" id="locations" aria-labelledby="locations-title">
      <div className="container">
        <div className="section-heading reveal">
          <span className="eyebrow">Clinic Locations</span>
          <h2 id="locations-title">Visit Care &amp; Cure Homoeopathic Clinic in Bilasipara</h2>
          <p className="lead">
            Two clearly located consultation points for convenient access and appointment-based care.
          </p>
        </div>

        <div className={styles.locationGrid}>
          {locations.map((location, index) => (
            <article key={index} className={`${styles.locationCard} reveal`} data-delay={index}>
              <h3>{location.title}</h3>
              <div className={styles.infoLine}>📍 <span>{location.address}</span></div>
              <div className={styles.infoLine}>📞 <a href={location.phoneHref}>{location.phone}</a></div>
            </article>
          ))}
        </div>

        <div className={styles.interiorStrip}>
          {interiorPhotos.map((photo, index) => (
            <figure key={index} className="reveal" data-delay={index}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={300}
                loading="lazy"
                quality={75}
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
