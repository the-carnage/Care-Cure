'use client'

import { useState } from 'react'
import styles from './Accordion.module.css'

export interface AccordionItem {
  id: string
  icon: string
  title: string
  subtitle: string
  symptoms: string[]
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenId?: string
  className?: string
}

export default function Accordion({ items, defaultOpenId, className = '' }: AccordionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(defaultOpenId || items[0]?.id || null)

  const handleItemClick = (itemId: string) => {
    setOpenItemId(openItemId === itemId ? null : itemId)
  }

  const handleKeyDown = (event: React.KeyboardEvent, itemId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleItemClick(itemId)
    }
  }

  return (
    <div className={`${styles.accordionList} ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItemId === item.id
        const delay = index + 1

        return (
          <div key={item.id} className="reveal" data-delay={delay}>
            <article
              className={`${styles.accordionItem} ${isOpen ? styles.isOpen : ''}`}
            >
              <button
                className={styles.accordionTrigger}
              type="button"
              aria-expanded={isOpen}
              onClick={() => handleItemClick(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
            >
              <span>
                <strong>
                  {item.icon} {item.title}
                </strong>
                <span className={styles.subtitle}>{item.subtitle}</span>
              </span>
              <span aria-hidden="true" className={styles.icon}>
                +
              </span>
            </button>
            <div className={styles.accordionPanel}>
              <div>
                <div className={styles.accordionContent}>
                  <div className={styles.symptoms} aria-label={`${item.title} symptoms`}>
                    {item.symptoms.map((symptom, idx) => (
                      <span key={idx} className={styles.symptom}>
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
          </div>
        )
      })}
    </div>
  )
}
