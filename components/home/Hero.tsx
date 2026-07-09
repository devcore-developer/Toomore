import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
    label: 'Premium Ingredients',
    desc: 'The finest quality dates.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Made in Egypt',
    desc: 'Proudly crafted locally.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8V3m-4 5V5m8 3V3" />
      </svg>
    ),
    label: 'Beautifully Packaged',
    desc: 'Perfect for gifting.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: '365 Days Fresh',
    desc: 'Long shelf life.',
  },
]

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Mobile Image Container */}
      {/* Mobile Image Container */}
      <div className="hero-mob-img-wrap">
        <img
          src="/images/hero-mobile.png"
          alt="Toomore Premium Dates"
          className="hero-mob-img"
        />
      </div>

      {/* Mobile Floating Review Card */}
      <div className="hero-mob-review">
        <div className="hero-mob-review-left">
          <span className="hero-mob-review-stars">★★★★★</span>
          <span className="hero-mob-review-rating">4.9</span>
        </div>
        <div className="hero-mob-review-divider" />
        <span className="hero-mob-review-text">Most Premium Dates Ever</span>
      </div>

      <div className="hero-content">
        <FadeIn>
          <div className="hero-tag">
            <span className="hero-tag-line" />
            Egyptian Mejdool Dates
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="hero-title heading">
            Dates,<br /><em>Reimagined.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="hero-sub">
            Handcrafted Mejdool dates filled with premium ingredients — milk
            chocolate, dark chocolate, pistachios, and more. The perfect luxury
            for every moment.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="hero-btns">
            <Link href="/shop" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Shop Boxes
            </Link>
            <a
              href="https://wa.me/201556847277?text=Hi%20TOOMORE!%20I%E2%80%99d%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-green"
            >
              <svg className="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order on WhatsApp
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="trust-badges">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.label}>
                <div className="trust-icon">{item.icon}</div>
                <div className="trust-item-info">
                  <span className="trust-label">{item.label}</span>
                  <span className="trust-item-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}