import Image from 'next/image'
import styles from './About.module.css'

interface DoctorCredential {
  icon: string
  text: string
}

interface StatCard {
  title: string
  description: string
}

const credentials: DoctorCredential[] = [
  { icon: '✅', text: 'Regd. No.: A-1998' },
  { icon: '✅', text: 'Licence No.: 4066' },

]

const stats: StatCard[] = [
  {
    title: 'Years of Experience',
    description: 'Practical homeopathic care guided by close attention, patience, and continuity.',
  },
  {
    title: 'Patients Treated',
    description: 'Consultations shaped around individual symptoms, history, and overall health.',
  },
  {
    title: 'Conditions Covered',
    description: 'Support for day-to-day concerns, chronic conditions, and specialized problems.',
  },
]

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading reveal">
          <span className="eyebrow">About the Doctor</span>
          <h2 id="about-title">Meet Dr. Hafizur Rahman (BHMS)</h2>
          <h3 id="about-title">NEIAH , Ministry of Ayush Govt. Of India.</h3>
        </div>

        <div className={styles.doctorGrid}>
          <div className={`${styles.doctorPhotoWrap} reveal`}>
            <div className={styles.photoFrame}>
              <Image
                className={styles.doctorPhoto}
                src="https://i.ibb.co/nMn5x8Br/Dr-Hafizur-Rahman.jpg"
                alt="Portrait of Dr. Hafizur Rahman"
                width={400}
                height={500}
                loading="lazy"
              />
            </div>
            <div className={styles.photoNote}>
              <strong>Care &amp; Cure Homoeopathic Clinic</strong>
              <span>Bilasipara, Assam</span>
            </div>
          </div>

          <div className="reveal" data-delay="1">
            <div className={styles.tagRow} aria-label="Doctor credentials">
              {credentials.map((credential, index) => (
                <span key={index} className={styles.tag}>
                  {credential.icon} {credential.text}
                </span>
              ))}
            </div>

            <h3>Care shaped around the person, not just the condition</h3>
            <p className="lead" style={{ marginTop: '1rem' }}>
              With years of experience in homeopathic medicine, Dr. Rahman focuses on individualized
              treatment plans that restore balance and improve overall well-being naturally.
            </p>

            

            <p>
              Each consultation is designed to listen carefully, study the full symptom picture, and
              create a treatment plan that supports long-term wellness in a safe and gentle way.
            </p>

            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <article key={index} className={`${styles.statCard} reveal`} data-delay={index + 1}>
                  <strong>{stat.title}</strong>
                  <p>{stat.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
