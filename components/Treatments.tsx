import Accordion, { AccordionItem } from './Accordion'
import styles from './Treatments.module.css'

interface TreatmentCard {
  icon: string
  title: string
  description: string
  conditions: string[]
}

const treatments: TreatmentCard[] = [
  {
    icon: '🩺',
    title: 'General Conditions',
    description: 'Supportive care for everyday health concerns with individualized remedies.',
    conditions: ['Skin Diseases', 'Seasonal Flu', 'Child Health Issues'],
  },
  {
    icon: '🌿',
    title: 'Chronic Conditions',
    description: 'Care plans focused on deeper patterns and steady long-term improvement.',
    conditions: ['Arthritis', 'Fatty Liver Disease', 'Sinusitis'],
  },
  {
    icon: '🎯',
    title: 'Specialized Treatments',
    description: 'Targeted support for specific conditions that need careful attention.',
    conditions: ['Piles (Hemorrhoids)', 'Kidney Stones', 'Urinary Infections', 'Tonsillitis & Pharyngitis'],
  },
]

const accordionItems: AccordionItem[] = [
  {
    id: 'arthritis',
    icon: '🦴',
    title: 'Arthritis Treatment',
    subtitle: 'Reducing pain, inflammation & stiffness through personalized homeopathic remedies.',
    symptoms: ['Joint pain & stiffness', 'Swelling', 'Reduced movement'],
  },
  {
    id: 'insomnia',
    icon: '😴',
    title: 'Insomnia Care',
    subtitle: 'Restoring natural sleep cycles holistically.',
    symptoms: ['Difficulty sleeping', 'Frequent waking', 'Daytime fatigue'],
  },
  {
    id: 'fatty-liver',
    icon: '🫁',
    title: 'Fatty Liver Management',
    subtitle: 'Supporting liver health naturally without side effects.',
    symptoms: ['Fatigue', 'Abdominal discomfort', 'Loss of appetite'],
  },
]

export default function Treatments() {
  return (
    <section className="section" id="treatments" aria-labelledby="treatments-title">
      <div className="container">
        <div className="section-heading reveal">
          <span className="eyebrow">Treatments We Offer</span>
          <h2 id="treatments-title">Conditions We Treat</h2>
          <p className="lead">
            Personalized homeopathic care for common illnesses, chronic conditions, and specialized
            concerns.
          </p>
        </div>

        <div className={styles.treatmentGrid}>
          {treatments.map((treatment, index) => (
            <article key={index} className={`${styles.treatmentCard} reveal`} data-delay={index}>
              <span className={styles.cardIcon} aria-hidden="true">
                {treatment.icon}
              </span>
              <h3>{treatment.title}</h3>
              <p>{treatment.description}</p>
              <ul className={styles.conditionsList}>
                {treatment.conditions.map((condition, idx) => (
                  <li key={idx}>{condition}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className={`section-heading ${styles.sectionHeadingTight} reveal`}>
          <span className="eyebrow">Health Awareness</span>
          <p className="lead">
            Learn more about a few common concerns often addressed through individualized homeopathic
            support.
          </p>
        </div>

        <Accordion items={accordionItems} />
      </div>
    </section>
  )
}
