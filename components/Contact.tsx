import ContactForm from './ContactForm'
import styles from './Contact.module.css'

interface ContactCard {
  icon: string
  title: string
  description: string
  link?: string
}

const contactCards: ContactCard[] = [
  {
    icon: '✉️',
    title: 'hafiluvyou@gmail.com',
    description: 'Send us an email for any queries.',
    link: 'mailto:hafiluvyou@gmail.com',
  },
  {
    icon: '📞',
    title: '8876341148',
    description: 'Call directly to book and confirm your visit.',
    link: 'tel:8876341148',
  },
  {
    icon: '🕐',
    title: 'Consultation by Appointment',
    description: 'Appointments help ensure dedicated time for every patient.',
    link: '',
  },
  {
    icon: '📍',
    title: 'Home Clinic',
    description: 'Bilasipara, Botertol — Near N.H. Memorial Academy',
    link: '',
  },
]

export default function Contact() {
  return (
    <section className={`section ${styles.contactSection}`} id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.contactLayout}>
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h2 id="contact-title">Book Your Consultation Today</h2>
            <p className={`lead ${styles.contactIntro}`}>
              Reach the clinic directly to schedule your appointment and take the next step toward
              personalized, natural care.
            </p>

            <div className={`${styles.contactCards} ${styles.contactCardsOffset}`}>
              {contactCards.map((card, index) => (
                <article key={index} className={`${styles.contactCard} reveal`} data-delay={index + 1}>
                  <h3>
                    {card.link ? (
                      <a href={card.link}>
                        {card.icon} {card.title}
                      </a>
                    ) : (
                      <>
                        {card.icon} {card.title}
                      </>
                    )}
                  </h3>
                  {card.description && <p>{card.description}</p>}
                </article>
              ))}
            </div>
          </div>

          <div className="reveal" data-delay="1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
