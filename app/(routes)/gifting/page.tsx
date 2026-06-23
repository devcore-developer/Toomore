'use client'

import SectionTitle from '@/components/shared/SectionTitle'
import GiftForm from '@/components/gifting/GiftForm'

export default function GiftingPage() {
  return (
    <section className="gifting-section">
      <div>
        <SectionTitle
          tag="Custom Gifting"
          title="For Every Occasion, a Perfect Gift."
          light
        />
        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 17,
          lineHeight: 1.8,
          maxWidth: 440,
          marginBottom: 0,
        }}>
          Whether it&apos;s a wedding, a corporate event, or a Ramadan gathering
          — we create custom gifting experiences that leave a lasting impression.
          Fill out the form and our team will get back to you within 24 hours.
        </p>
      </div>
      <GiftForm
        onSubmit={(data) => {
          console.log('Gift request:', data)
          alert('Your gifting request has been submitted! We will contact you shortly.')
        }}
      />
    </section>
  )
}