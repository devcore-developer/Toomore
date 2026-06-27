import FadeIn from '@/components/shared/FadeIn'

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: '2 of each flavor',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    text: 'Elegant gift-ready package',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    text: 'The perfect first package',
  },
]

export default function BestSeller() {
  return (
    <section className="bestseller-section">
      <svg className="bestseller-pattern" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="800" stroke="#F5FE4" strokeWidth="0.5" />
        <rect x="40" y="40" width="320" height="320" stroke="#F5FE4" strokeWidth="0.4" />
        <rect x="80" y="80" width="240" height="240" stroke="#F5FE4" strokeWidth="0.3" />
        <line x1="0" y1="400" x2="400" y2="400" stroke="#F5FE4" strokeWidth="0.3" />
        <line x1="200" y1="0" x2="200" y2="800" stroke="#F5FE4" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="120" stroke="#F5FE4" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="200" stroke="#F5FE4" strokeWidth="0.25" />
        <line x1="40" y1="40" x2="360" y2="360" stroke="#F5FE4" strokeWidth="0.25" />
        <line x1="360" y1="40" x2="40" y2="360" stroke="#F5FE4" strokeWidth="0.25" />
        <line x1="40" y1="440" x2="360" y2="760" stroke="#F5FE4" strokeWidth="0.25" />
        <line x1="360" y1="440" x2="40" y2="760" stroke="#F5FE4" strokeWidth="0.25" />
        <rect x="120" y="120" width="160" height="160" stroke="#F5FE4" strokeWidth="0.2" transform="rotate(45 200 200)" />
        <circle cx="200" cy="200" r="60" stroke="#F5FE4" strokeWidth="0.2" />
      </svg>

      <div className="bestseller-lighting" />

      <div className="bestseller-inner">
        <FadeIn className="bestseller-left">
          <div className="bestseller-box-wrap">
            <div className="bestseller-shadow-floor" />
            <img
              src="/images/best-seller-box.png"
              alt="TOOMORE 8-Piece Hero Package"
              className="bestseller-box-img"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="bestseller-right">
          <h2 className="bestseller-heading">8-Piece Hero Package</h2>
          <div className="bestseller-underline" />
          <p className="bestseller-subtitle">Perfect to discover your favorite flavor.</p>

          <div className="bestseller-features">
            {features.map((f, i) => (
              <div className="bestseller-feature" key={i}>
                <span className="bestseller-feature-icon">{f.icon}</span>
                <span className="bestseller-feature-text">{f.text}</span>
              </div>
            ))}
          </div>

          <button className="bestseller-cta">Order Now</button>
          <p className="bestseller-price">EGP 160</p>
        </FadeIn>
      </div>
    </section>
  )
}