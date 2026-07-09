import FadeIn from '@/components/shared/FadeIn'

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12C12 12 8 8 8 5.5C8 3.567 9.79 2 12 2C14.21 2 16 3.567 16 5.5C16 8 12 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 22C7 22 8.5 18 12 18C15.5 18 17 22 17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 18C3.5 16.5 3 14.5 4 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M19 18C20.5 16.5 21 14.5 20 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'Premium Ingredients',
    description: 'Only the finest Medjool dates, Belgian chocolate, and natural fillings — never artificial.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 11V6C18 4.9 17.1 4 16 4H8C6.9 4 6 4.9 6 6V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 11H20L19 20C18.9 20.6 18.3 21 17.7 21H6.3C5.7 21 5.1 20.6 5 20L4 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Handcrafted Daily',
    description: 'Each date is hand-filled and hand-coated fresh every day to ensure peak quality.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 7H22V12C22 12.6 21.6 13 21 13H3C2.4 13 2 12.6 2 12V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7V3M8 7V5M16 7V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Elegant Packaging',
    description: 'Every box is presentation-ready — no extra wrapping needed. Gift directly from the box.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 8.5L21 9.5L16.5 14L17.5 21L12 17.5L6.5 21L7.5 14L3 9.5L9.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 3L7 5M19 3L17 5M12 2V0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'Made for Every Moment',
    description: 'From daily treats to weddings and Ramadan — TOOMORE fits every occasion beautifully.',
    titleClass: 'why-card-title-sm',
  },
]

export default function WhyToomore() {
  return (
    <section className="why-section" id="why-toomore">

      {/* ===== DESKTOP VERSION ===== */}
      <span className="why-eyebrow">Why TO Choose Us</span>
      <h2 className="why-heading">Why TOOMORE?</h2>
      <div className="why-divider" />
      <div className="why-grid">
        {items.map((item, i) => (
          <FadeIn key={`d-${item.title}`} delay={i * 0.1}>
            <div className="why-item">
              <div className="why-icon">{item.icon}</div>
              <h4 className="why-item-title">{item.title}</h4>
              <p className="why-item-desc">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ===== MOBILE VERSION ===== */}
      <div className="why-mob">
        <div className="why-deco why-deco-tl" />
        <div className="why-deco why-deco-tr" />
        <div className="why-deco why-deco-bl" />
        <div className="why-deco why-deco-br" />

        <FadeIn>
          <span className="why-eyebrow-mob">Why TOOMORE</span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="why-heading-mob">
            More Than Dates,<br /><span className="why-heading-gold">A Promise.</span>
          </h2>
        </FadeIn>

        <div className="why-cards-mob">
          {items.map((item, i) => (
            <FadeIn key={`m-${item.title}`} delay={0.15 + i * 0.12}>
              <div className="why-card-mob">
                <div className="why-card-icon-wrap">
                  <div className="why-card-icon">{item.icon}</div>
                </div>
                <div className="why-card-divider" />
                <div className="why-card-text">
                  <h3 className={`why-card-title ${item.titleClass || ''}`}>{item.title}</h3>
                  <p className="why-card-desc">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

    </section>
  )
}