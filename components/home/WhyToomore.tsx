import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const items = [
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>,
    title: 'Premium Ingredients',
    description: 'Only the finest Medjool dates, Belgian chocolate, and natural fillings — never artificial.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6-4.3 4.3-1.6-1.6a1 1 0 00-1.4 0l-4 4a1 1 0 001.4 1.4l3.3-3.3 1.6 1.6a1 1 0 001.4 0l5.7-5.7 1.6 1.6a1 1 0 001.7-.7V6a1 1 0 00-1-1h-4.9a1 1 0 00-.7 1.7z" /></svg>,
    title: 'Handcrafted Daily',
    description: 'Each date is hand-filled and hand-coated fresh every day to ensure peak quality.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8V3m-4 5V5m8 3V3" /></svg>,
    title: 'Elegant Packaging',
    description: 'Every box is presentation-ready — no extra wrapping needed. Gift directly from the box.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
    title: 'Made for Every Moment',
    description: 'From daily treats to weddings and Ramadan — TOOMORE fits every occasion beautifully.',
  },
]

export default function WhyToomore() {
  return (
    <section className="why-section">
      <SectionTitle tag="Why Choose Us" title="Why TOOMORE?" />
      <div className="why-grid">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <div className="why-item">
              <div className="why-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}