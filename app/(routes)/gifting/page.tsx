'use client'

import { useState, useEffect } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Badge from '@/components/ui/Badge'
import GiftForm from '@/components/gifting/GiftForm'
import { OCCASIONS } from '@/lib/constants'

export default function GiftingPage() {
  const [showForm, setShowForm] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showForm])

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) setShowForm(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [showForm])

  return (
    <section className="gifting-section" style={{ minHeight: '100vh' }}>
      <div className="gifting-overlay" />
      <FadeIn>
        <div className="gifting-text-col">
          <SectionTitle
            tag="Custom Gifting"
            title="A New Kind of Sweet Gift."
            light
          />
          <p className="gifting-sub">
            Whether it&apos;s a wedding, a corporate event, or a Ramadan gathering
            — we create custom gifting experiences that leave a lasting impression.
            Fill out the form and our team will get back to you within 24 hours.
          </p>
          <div className="occasions">
            {OCCASIONS.map((occ) => (
              <Badge key={occ} variant="occasion">{occ}</Badge>
            ))}
          </div>
          <button className="btn-gold" onClick={() => setShowForm(true)}>
            Request Custom Order
          </button>
        </div>
      </FadeIn>

      {showForm && (
        <div
          className="gifting-modal-overlay"
          onClick={() => setShowForm(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Custom order request"
        >
          <div className="gifting-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="gifting-modal-close"
              onClick={() => setShowForm(false)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="gifting-modal-header">
              <h3 className="gifting-modal-title">Custom Order Request</h3>
              <p className="gifting-modal-sub">Tell us about your event and we&apos;ll take care of the rest.</p>
            </div>
            <div className="gifting-visual">
              <GiftForm
                onSubmit={(data) => {
                  console.log('Gift request:', data)
                  setShowForm(false)
                  alert('Your gifting request has been submitted! We will contact you shortly.')
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}