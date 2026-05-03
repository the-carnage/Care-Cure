'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

interface ContactFormData {
  name: string
  phone: string
  message: string
}

interface ContactFormErrors {
  name?: string
  phone?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ message: '', isError: false })

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }

    // Validate phone
    const phonePattern = /^[\d\s\+\-\(\)]+$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits'
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      setStatus({ message: '', isError: false })

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setStatus({
          message: `Thank you${formData.name ? `, ${formData.name}` : ''}. Your consultation request has been noted. Please call 8876341148 to confirm your appointment.`,
          isError: false,
        })
        setFormData({ name: '', phone: '', message: '' })
        setErrors({})
      }, 1500)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h3>Send a Consultation Request</h3>

      <div className={styles.formRow}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span id="name-error" className={styles.error} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <span id="phone-error" className={styles.error} role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span id="message-error" className={styles.error} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button 
        className={`btn ${styles.btnPrimary} ${styles.formSubmit}`} 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>

      {status.message && (
        <p 
          className={`${styles.formStatus} ${status.isError ? styles.statusError : styles.statusSuccess}`} 
          role="status" 
          aria-live="polite"
        >
          {status.message}
        </p>
      )}
    </form>
  )
}
