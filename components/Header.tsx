'use client'

import { useState, useEffect } from 'react'
import styles from './Header.module.css'

interface NavigationLink {
  href: string
  label: string
}

const navigationLinks: NavigationLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#treatments', label: 'Treatments' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Handle body scroll lock when menu is open
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  useEffect(() => {
    // Close menu on outside click
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const nav = document.getElementById('site-menu')
      const toggle = document.querySelector('[aria-controls="site-menu"]')

      if (
        isMenuOpen &&
        nav &&
        toggle &&
        !nav.contains(target) &&
        !toggle.contains(target)
      ) {
        setIsMenuOpen(false)
      }
    }

    // Close menu on Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)

    const targetId = href.substring(1) // Remove '#'
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      )
      const targetPosition = targetElement.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Focus trapping for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return

    const nav = document.getElementById('site-menu')
    if (!nav) return

    const focusableElements = nav.querySelectorAll('a, button')
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isMenuOpen])

  return (
    <header
      className={`${styles.siteHeader} ${isScrolled ? styles.isScrolled : ''}`}
      id="top"
    >
      <div className={`container ${styles.navShell}`}>
        <a
          className={styles.brand}
          href="#home"
          onClick={(e) => handleNavLinkClick(e, '#home')}
          aria-label="Care and Cure Homoeopathic Clinic home"
        >
          <span className={styles.brandIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M19.58 4.42c-4.52-.74-8.84.45-11.54 3.15-2.66 2.66-3.86 6.95-3.17 11.43a.75.75 0 0 0 .64.63c4.48.69 8.77-.51 11.43-3.17 2.7-2.7 3.89-7.02 3.15-11.54a.75.75 0 0 0-.51-.5Zm-1.46 2.2c.28 3.43-.71 6.43-2.76 8.48-1.98 1.98-4.88 2.98-8.17 2.82l4.53-4.53a.75.75 0 0 0-1.06-1.06l-4.53 4.53c-.16-3.29.84-6.19 2.82-8.17 2.05-2.05 5.05-3.04 8.48-2.76Z" />
            </svg>
          </span>
          <span className={styles.brandText}>
            Care &amp; Cure Homoeopathic Clinic
          </span>
        </a>

        <button
          className={styles.navToggle}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`${styles.siteNav} ${isMenuOpen ? styles.isOpen : ''}`}
          id="site-menu"
          aria-label="Primary navigation"
        >
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            className={styles.navCta}
            href="#contact"
            onClick={(e) => handleNavLinkClick(e, '#contact')}
          >
            📞 Book Now
          </a>
        </nav>
      </div>
    </header>
  )
}
