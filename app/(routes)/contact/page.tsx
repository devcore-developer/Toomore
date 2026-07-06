import Link from 'next/link'

const CONTACT_METHODS = [
  {
    label: 'WhatsApp',
    value: '+20 15 56847277',
    href: 'https://wa.me/201556847277',
    description: 'Chat with us directly for the fastest response.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382C17.166 14.23 15.612 13.456 15.336 13.36C15.06 13.264 14.854 13.216 14.648 13.522C14.442 13.828 13.836 14.554 13.656 14.76C13.476 14.966 13.296 14.99 12.99 14.838C12.684 14.686 11.66 14.34 10.458 13.264C9.51 12.414 8.874 11.366 8.694 11.06C8.514 10.754 8.676 10.59 8.828 10.438C8.964 10.302 9.132 10.082 9.284 9.902C9.436 9.722 9.484 9.59 9.58 9.384C9.676 9.178 9.628 8.998 9.556 8.846C9.484 8.694 8.874 7.14 8.622 6.528C8.376 5.93 8.126 6.014 7.944 6.004C7.764 5.994 7.558 5.992 7.352 5.992C7.146 5.992 6.816 6.074 6.54 6.378C6.264 6.682 5.436 7.456 5.436 9.032C5.436 10.608 6.568 12.13 6.72 12.336C6.872 12.542 8.866 15.606 11.91 16.998C12.626 17.312 13.186 17.498 13.622 17.636C14.34 17.862 14.996 17.828 15.514 17.754C16.09 17.672 17.37 16.99 17.622 16.242C17.874 15.494 17.874 14.858 17.802 14.734C17.73 14.61 17.524 14.528 17.472 14.382Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C6.477 2 2 6.477 2 12C2 13.816 2.492 15.518 3.352 16.972L2 22L7.14 20.672C8.544 21.452 10.17 21.9 12 21.9C17.523 21.9 22 17.423 22 11.9C22 6.377 17.523 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#25D366',
  },
  {
    label: 'Instagram',
    value: '@toomoore.eg',
    href: 'https://www.instagram.com/toomoore.eg/',
    description: 'Follow us for behind-the-scenes, new flavors, and giveaways.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: '#E1306C',
  },
  {
    label: 'Facebook',
    value: 'TOOMORE',
    href: 'https://www.facebook.com/profile.php?id=61587802923596',
    description: 'Like our page for updates, events, and special offers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#1877F2',
  },
  {
    label: 'TikTok',
    value: '@toomoore',
    href: 'https://www.tiktok.com/@toomoore',
    description: 'Watch our short videos and trending content.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#000000',
  },
  {
    label: 'Email',
    value: 'hello@toomore.eg',
    href: 'mailto:hello@toomore.eg',
    description: 'For partnerships, bulk orders, or press inquiries.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#B87333',
  },
]

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-hero">
        <span className="contact-eyebrow">GET IN TOUCH</span>
        <h1 className="contact-title">We&apos;d Love to Hear From You</h1>
        <p className="contact-sub">
          Whether you have a question, a custom order request, or just want to say hello
          — reach out through any of the channels below.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="contact-grid">
        {CONTACT_METHODS.map((method, i) => (
          <a
            key={method.label}
            href={method.href}
            target={method.href.startsWith('http') ? '_blank' : undefined}
            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="contact-card"
            style={{
              animationDelay: `${i * 0.08}s`,
              '--accent': method.color,
            } as React.CSSProperties}
            aria-label={`Contact us via ${method.label}: ${method.value}`}
          >
            <div className="contact-card-icon">
              {method.icon}
            </div>
            <div className="contact-card-body">
              <h3 className="contact-card-label">{method.label}</h3>
              <p className="contact-card-value">{method.value}</p>
              <p className="contact-card-desc">{method.description}</p>
            </div>
            <div className="contact-card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Location */}
      <div className="contact-location">
        <div className="contact-location-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div>
          <h3 className="contact-location-title">Based in Alexandria, Egypt</h3>
          <p className="contact-location-sub">We deliver nationwide across Egypt.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="contact-cta-bar">
        <div>
          <h3 className="contact-cta-title">Ready to Order?</h3>
          <p className="contact-cta-sub">Browse our collection and place your order in minutes.</p>
        </div>
        <Link href="/shop" className="contact-cta-btn">
          Shop Now
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}