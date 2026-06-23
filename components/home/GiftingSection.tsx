import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Badge from '@/components/ui/Badge'
import { OCCASIONS } from '@/lib/constants'

export default function GiftingSection() {
  return (
    <section className="gifting-section">
      <FadeIn>
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
        <div className="gifting-visual-box">
          <div className="gifting-ribbon" />
          <div className="gifting-box-inner">
            <span className="gifting-box-label">TOOMORE</span>
            <span className="gifting-box-sub">Gift Box</span>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}