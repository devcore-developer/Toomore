'use client'

import { useState, useEffect } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Badge from '@/components/ui/Badge'
import GiftForm from '@/components/gifting/GiftForm'
import { OCCASIONS } from '@/lib/constants'
import { useCMS } from '@/hooks/useCMS' // <-- ADDED

export default function GiftingPage() {
  const { get } = useCMS() // <-- ADDED
  const [showForm, setShowForm] = useState(false)

  // <-- ADDED
  const giftingMobile = get('gifting_mobile', '/images/gifting-mobile.png')

  useEffect(() => {
    if (showForm) { document.body.style.overflow = 'hidden' } else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [showForm])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && showForm) setShowForm(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [showForm])

  return (
    <section className="gifting-section" style={{ minHeight: '100vh' }}>
      {/* ===== DESKTOP VERSION ===== */}
      <div className="gifting-desktop" style={{ backgroundImage: `url(${get('gifting_desktop', '/images/gifting-bg.png')})` }}>
        <div className="gifting-overlay" />
        <FadeIn>
          <div className="gifting-text-col">
            <SectionTitle tag="Custom Gifting" title="A New Kind of Sweet Gift." light />
            <p className="gifting-sub">Thoughtful, elegant, and unforgettable — perfect for birthdays, thank yous, or just because.</p>
            <div className="occasions">
              {OCCASIONS.map((occ) => (<Badge key={occ} variant="occasion">{occ}</Badge>))}
            </div>
            <button className="btn-gold" style={{ marginTop: '40px' }} onClick={() => setShowForm(true)}>Request Custom Order</button>
          </div>
        </FadeIn>
      </div>

      {/* ===== MOBILE VERSION ===== */}
      <div className="gift-mob">
        <div className="gift-mob-img-wrap">
          {/* <-- CHANGED */}
          <img src={giftingMobile} alt="TOOMORE Custom Gifting" className="gift-mob-img" />
        </div>

        <div className="gift-mob-content">
          <FadeIn><span className="gift-mob-label">CUSTOM GIFTING</span></FadeIn>
          <FadeIn delay={0.1}><h2 className="gift-mob-heading">A New Kind of<br />Sweet Gift.</h2></FadeIn>
          <FadeIn delay={0.15}><p className="gift-mob-desc">Thoughtful, elegant, and unforgettable — perfect for birthdays, thank yous, or just because.</p></FadeIn>
          <div className="gift-mob-chips">
            {OCCASIONS.map((occ, i) => (<FadeIn key={`mob-${occ}`} delay={0.2 + i * 0.05}><span className="gift-mob-chip">{occ}</span></FadeIn>))}
          </div>
          <FadeIn delay={0.35}><button className="gift-mob-btn" onClick={() => setShowForm(true)}>REQUEST CUSTOM ORDER</button></FadeIn>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showForm && (
        <div className="gifting-modal-overlay" onClick={() => setShowForm(false)} role="dialog" aria-modal="true" aria-label="Custom order request">
          <div className="gifting-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gifting-modal-close" onClick={() => setShowForm(false)} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="gifting-modal-header">
              <h3 className="gifting-modal-title">Custom Order Request</h3>
              <p className="gifting-modal-sub">Tell us about your event and we&apos;ll take care of the rest.</p>
            </div>
            <div className="gifting-visual"><GiftForm /></div>
          </div>
        </div>
      )}
    </section>
  )
}