// GiftingSection.tsx
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Badge from '@/components/ui/Badge'
import { OCCASIONS } from '@/lib/constants'

export default function GiftingSection() {
  return (
    <section className="gifting-section">
      {/* Ambient top glow */}
      <div className="gifting-ambient-glow" />

      <FadeIn>
        <div className="gifting-text-col">
          <SectionTitle
            tag="Custom Gifting"
            title="For Every Occasion, a Perfect Gift."
            light
          />
          <p className="gifting-sub">
            Whether it&apos;s a wedding, a corporate event, or a Ramadan gathering
            — we create custom gifting experiences that leave a lasting impression.
          </p>
          <div className="occasions">
            {OCCASIONS.map((occ) => (
              <Badge key={occ} variant="occasion">{occ}</Badge>
            ))}
          </div>
          <button className="btn-gold">Request Custom Order</button>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="gifting-visual-col">
          {/* Inner dark card (right side info panel) */}
          <div className="gifting-inner-card">
            <p className="gifting-card-title">A new kind of<br />sweet gift.</p>
            <p className="gifting-card-sub">
              Thoughtful, elegant, and unforgettable.<br />
              Perfect for birthdays, thank yous, or just because.
            </p>
            <div className="gifting-card-icons">
              {[
                { icon: '🌿', label: 'Premium\nIngredients' },
                { icon: '🤲', label: 'Hand Made\nwith Care' },
                { icon: '🍫', label: 'Contains Rich\nChocolate' },
                { icon: '🎁', label: 'Elegant\nGift Ready' },
              ].map(({ icon, label }) => (
                <div key={label} className="gifting-icon-item">
                  <span className="gifting-icon">{icon}</span>
                  <span className="gifting-icon-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product image floating over everything */}
          <img
            src="/images/gift-box.png"
            alt="TOOMORE Gift Box"
            className="gifting-product-img"
          />

          {/* TOOMORE box right edge */}
          <img
            src="/images/toomore-box.png"
            alt="TOOMORE Box"
            className="gifting-box-img"
          />
        </div>
      </FadeIn>
    </section>
  )
}