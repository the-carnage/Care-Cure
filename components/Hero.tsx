import Image from 'next/image'
import styles from './Hero.module.css'

interface HeroHighlight {
  text: string
}

const heroHighlights: HeroHighlight[] = [
  { text: 'Individualized homeopathic case taking and follow-up care' },
  { text: 'Support for acute, chronic, and specialized health concerns' },
  { text: 'Consultation by appointment with a calm, patient-centered approach' },
]

export default function Hero() {
  return (
    <section className={`${styles.hero} section`} id="home" aria-labelledby="hero-title">
      <svg className={`${styles.leafAccent} ${styles.leafOne}`} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M52.4 10.4C39.7 8.2 28 11.5 20.2 19.3 12.5 27 9 38.7 11.2 51.4c.2 1 1 1.8 2 2 12.7 2.2 24.4-1.3 32.1-9 7.8-7.8 11.1-19.5 8.9-32.2-.1-.9-.8-1.6-1.8-1.8Zm-4.1 5.2c1 9.1-1.7 16.9-7.4 22.6-5.5 5.5-13 8.2-21.5 7.6l12.2-12.2a2 2 0 1 0-2.8-2.8L16.6 43c-.6-8.5 2.1-16 7.6-21.5 5.7-5.7 13.5-8.4 22.6-7.4Z" />
      </svg>
      <svg className={`${styles.leafAccent} ${styles.leafTwo}`} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M44.8 8.9c-8.1-1.3-15.8.8-20.7 5.7-4.8 4.8-7 12.5-5.8 20.6.2.7.7 1.3 1.4 1.4 8.1 1.2 15.8-1 20.6-5.8 4.9-4.9 7-12.6 5.7-20.7-.1-.6-.6-1.1-1.2-1.2ZM41.5 13c.5 5.9-1.2 11-4.9 14.7-3.6 3.6-8.5 5.4-14.1 5.1l8.1-8.1a1.8 1.8 0 1 0-2.5-2.5L20 30.3c-.3-5.6 1.5-10.5 5.1-14.1 3.7-3.7 8.8-5.4 14.7-4.9Z" />
      </svg>

      <div className={`container ${styles.heroGrid}`}>
        <div className={`${styles.heroCopy} reveal`}>
          <span className={`eyebrow ${styles.heroEyebrow}`}>Care &amp; Cure Homoeopathic Clinic, Bilasipara</span>
          <h1 id="hero-title">Natural Healing. Personalized Care. Lasting Results.</h1>
          
           <h3>Dr. Hafizur Rahman (BHMS)</h3> 
           <p>
            Provides safe, effective, and holistic homeopathic treatment
            &mdash; targeting the root cause, not just symptoms.
          </p>
        </div>

        <aside className={`${styles.heroCard} reveal`} data-delay="1" aria-label="Clinic highlights">
          <span className={styles.cardKicker}>Trusted Clinical Care</span>
          <h2>Holistic support for individuals and families in Bilasipara</h2>
          <ul className={styles.heroHighlights}>
            {heroHighlights.map((highlight, index) => (
              <li key={index}>{highlight.text}</li>
            ))}
          </ul>
          <div className={styles.miniContact}>
            <span>📍Purani Bazar, Bilasipara, Assam</span>
            <a href="tel:8876341148">📞 8876341148</a>
          </div>
        </aside>
      </div>
    </section>
  )
}
