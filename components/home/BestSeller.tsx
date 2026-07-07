import FadeIn from '@/components/shared/FadeIn'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: 'Your choice of flavors — enough to try, enough to decide',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    text: 'Comes gift-wrapped, ready to give',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    text: "Ideal if it's your first TOOMORE box",
  },
]

export default function BestSeller() {
  return (
    <section className="bestseller-section">
      <svg className="bestseller-pattern" viewBox="0 0 400 800" fill="none">
        <rect x="0" y="0" width="400" height="800" stroke="#F5FE4" strokeWidth="0.5" />
        <rect x="40" y="40" width="320" height="320" stroke="#F5FE4" strokeWidth="0.4" />
        <rect x="80" y="80" width="240" height="240" stroke="#F5FE4" strokeWidth="0.3" />
        <line x1="0" y1="400" x2="400" y2="400" stroke="#F5FE4" strokeWidth="0.3" />
        <line x1="200" y1="0" x2="200" y2="800" stroke="#F5FE4" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="120" stroke="#F5FE4" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="200" stroke="#F5FE4" strokeWidth="0.25" />
      </svg>
      <div className="bestseller-lighting" />
      <div className="bestseller-inner">
        <FadeIn className="bestseller-left">
          <div className="bestseller-box-wrap">
            <div className="bestseller-shadow-floor" />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="bestseller-right">
          <span className="bestseller-tag">Best Seller</span>
          <h2 className="bestseller-heading">8-Piece Package</h2>
          <div className="bestseller-underline" />
          <p className="bestseller-subtitle">Every flavor, one box — find the one that's yours.</p>

          <div className="bestseller-features">
            {features.map((f, i) => (
              <div className="bestseller-feature" key={i}>
                <span className="bestseller-feature-icon">{f.icon}</span>
                <span className="bestseller-feature-text">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="cta-row">
            <button className="order-now-btn">Order now</button>
            <div className="price">
              <span className="currency">EGP</span>
              <span className="amount">160</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}