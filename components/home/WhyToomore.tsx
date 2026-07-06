import FadeIn from '@/components/shared/FadeIn'

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 19.02L12 15.77L7.09 19.02L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Premium Ingredients',
    description: 'Only the finest Mejdool dates, Belgian chocolate, and natural fillings — never artificial.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          points="22 7 13.5 15.5 8.5 10.5 2 17"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="16 7 22 7 22 13"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Handcrafted Daily',
    description: 'Each date is hand-filled and hand-coated fresh every day to ensure peak quality.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7H22V12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12V7Z"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7V3M8 7V5M16 7V3"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Elegant Packaging',
    description: 'Every box is presentation-ready — no extra wrapping needed. Gift directly from the box.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.84 4.61A5.5 5.5 0 0013.07 3.17L12 4.23L10.93 3.17A5.5 5.5 0 003.16 10.94L4.23 12L12 19.77L19.77 12L20.84 10.94A5.5 5.5 0 0020.84 4.61Z"
          stroke="#1C3A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Made for Every Moment',
    description: 'From daily treats to weddings and Ramadan — TOOMORE fits every occasion beautifully.',
  },
]

export default function WhyToomore() {
  return (
    <section className="why-section">
      <span className="why-eyebrow">Why TO Choose Us</span>
      <h2 className="why-heading">Why TOOMORE?</h2>
      <div className="why-divider" />
      <div className="why-grid">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <div className="why-item">
              <div className="why-icon">{item.icon}</div>
              <h4 className="why-item-title">{item.title}</h4>
              <p className="why-item-desc">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}