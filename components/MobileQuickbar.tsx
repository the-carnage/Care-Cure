import styles from './MobileQuickbar.module.css'

interface QuickAction {
  href: string
  label: string
  external?: boolean
}

const quickActions: QuickAction[] = [
  { href: 'tel:8876341148', label: '📞 Call' },
  { href: 'https://wa.me/918876341148', label: 'WhatsApp', external: true },
  { href: '#contact', label: 'Book Now' },
]

export default function MobileQuickbar() {
  return (
    <nav className={styles.mobileQuickbar} aria-label="Quick actions">
      {quickActions.map((action, index) => (
        <a
          key={index}
          href={action.href}
          {...(action.external && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {action.label}
        </a>
      ))}
    </nav>
  )
}
