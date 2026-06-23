import SectionTitle from '@/components/shared/SectionTitle'
import GiftForm from '@/components/gifting/GiftForm'
import Link from 'next/link'

export default function GiftingPage() {
  return (
    <section className="gifting">
      <div>
        <SectionTitle
          tag="Custom Gifting"
          title="For Every Occasion, a Perfect Gift."
          light
        />
        <p
          style={{
            color: 'rgba(232,220,200,.65)',
            fontSize: 15,
            lineHeight: 1.75,
            maxWidth: 440,
            marginBottom: 0,
            fontWeight: 300,
          }}
        >
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