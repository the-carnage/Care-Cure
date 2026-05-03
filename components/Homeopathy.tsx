import styles from './Homeopathy.module.css'

interface FeatureCard {
  icon: string
  title: string
  description: string
}

const features: FeatureCard[] = [
  {
    icon: '🌱',
    title: 'Safe & Non-Invasive',
    description: 'Care that supports healing gently without invasive procedures.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Suitable for All Ages',
    description: 'Thoughtful treatment options for children, adults, and older patients.',
  },
  {
    icon: '✅',
    title: 'No Harmful Side Effects',
    description: 'A supportive approach valued for being gentle and carefully selected.',
  },
  {
    icon: '🎯',
    title: 'Root-Cause Treatment',
    description: 'Focus on the deeper imbalance instead of only short-term symptom relief.',
  },
]

export default function Homeopathy() {
  return (
    <section className="section soft" id="homeopathy" aria-labelledby="homeopathy-title">
      <div className="container">
        <div className={styles.homeopathyGrid}>
          <div className="reveal">
            <span className="eyebrow">About Homeopathy</span>
            <h2 id="homeopathy-title">Gentle medicine that supports the body&apos;s healing response</h2>
            <p className="lead" style={{ marginTop: '1rem' }}>
              Homeopathy is a natural system of medicine that stimulates the body&apos;s own healing ability.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
              It looks beyond a single complaint and considers the whole person, helping treatment stay
              thoughtful, individualized, and aligned with overall well-being.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <article key={index} className={`${styles.featureCard} reveal`} data-delay={(index % 2) + 1}>
                <span className={styles.featureIcon} aria-hidden="true">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
