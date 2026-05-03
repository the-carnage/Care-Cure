import styles from './Footer.module.css'

interface FooterLink {
  href: string
  label: string
}

const footerLinks: FooterLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#treatments', label: 'Treatments' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <strong>Care &amp; Cure Homoeopathic Clinic</strong>
            <span>Natural Healing. Personalized Care.</span>
          </div>
          <div className={styles.footerLinks} aria-label="Footer links">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.credentialsLine}>
          Dr. Hafizur Rahman (BHMS) | Regd. No. A-1998 | Licence No. 4066 | NEIAH | Ministry of
          Ayush, Govt. of India
        </div>
        <div className={styles.copyright}>
          © 2025 Care &amp; Cure Homoeopathic Clinic, Bilasipara. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
