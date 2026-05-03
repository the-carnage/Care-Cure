'use client'

import { useEffect } from 'react'

export default function RevealOnScroll() {
  useEffect(() => {
    // Small delay to ensure all DOM elements are rendered after hydration
    const timeout = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal')

      if (!revealElements.length) return

      // Respect prefers-reduced-motion
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (motionQuery.matches) {
        revealElements.forEach((el) => el.classList.add('visible'))
        return
      }

      // Fallback for browsers without IntersectionObserver
      if (!('IntersectionObserver' in window)) {
        revealElements.forEach((el) => el.classList.add('visible'))
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px 0px 0px',
        }
      )

      revealElements.forEach((el) => observer.observe(el))

      // Cleanup
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return null
}
