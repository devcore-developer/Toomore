import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
    ),
    label: 'Premium Ingredients',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
    label: 'Made in Egypt',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8V3m-4 5V5m8 3V3" /></svg>
    ),
    label: 'Beautifully Packaged',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
    ),
    label: 'Made for 365 Days',
  },
]

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <FadeIn>
          <div className="hero-tag">
            <span className="hero-tag-line" />
            Egyptian Medjool Dates
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="hero-title heading">
            Dates,<br /><em>Reimagined.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="hero-sub">
            Handcrafted Medjool dates filled with premium ingredients — milk
            chocolate, dark chocolate, pistachios, and more. The perfect luxury
            for every moment.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="hero-btns">
            <Link href="/shop" className="btn-primary">
              Shop Boxes
            </Link>
            <button className="btn-outline-green">
              <svg className="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order on WhatsApp
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="trust-badges">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.label}>
                <div className="trust-icon">{item.icon}</div>
                <span className="trust-label">{item.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}