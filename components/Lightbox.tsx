'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import styles from './Lightbox.module.css'

interface LightboxProps {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  imageTitle: string
  onClose: () => void
}

export default function Lightbox({ isOpen, imageSrc, imageAlt, imageTitle, onClose }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    // Focus trapping
    const handleTab = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab') return

      const lightbox = document.getElementById('lightbox-dialog')
      if (!lightbox) return

      const focusableElements = lightbox.querySelectorAll('button, a, input, textarea')
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

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

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTab)
    
    // Auto focus close button when opened
    if (isOpen) {
      setTimeout(() => {
        const closeBtn = document.querySelector(`.${styles.lightboxClose}`) as HTMLElement
        closeBtn?.focus()
      }, 50)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`${styles.lightbox} ${isOpen ? styles.isOpen : ''}`}
      id="lightbox"
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
    >
      <div 
        className={styles.lightboxDialog} 
        id="lightbox-dialog"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="lightbox-caption"
      >
        <button
          className={styles.lightboxClose}
          type="button"
          aria-label="Close gallery image"
          onClick={onClose}
        >
          ×
        </button>
        {imageSrc && (
          <Image
            className={styles.lightboxImage}
            src={imageSrc}
            alt={imageAlt}
            width={960}
            height={720}
            quality={90}
          />
        )}
        <p className={styles.lightboxCaption} id="lightbox-caption">
          {imageTitle}
        </p>
      </div>
    </div>
  )
}
