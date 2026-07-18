import Link from 'next/link'
import {
  FOOTER_SHOP_LINKS,
  FOOTER_COMPANY_LINKS,
} from '@/lib/constants'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/toomore.eg?igsh=MXM1NWtkYXE5eHBlYg==',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61587802923596',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@toomore.eg?_r=1&_t=ZS-988tN8rAW5S',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/201556847277',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382C17.166 14.23 15.612 13.456 15.336 13.36C15.06 13.264 14.854 13.216 14.648 13.522C14.442 13.828 13.836 14.554 13.656 14.76C13.476 14.966 13.296 14.99 12.99 14.838C12.684 14.686 11.66 14.34 10.458 13.264C9.51 12.414 8.874 11.366 8.694 11.06C8.514 10.754 8.676 10.59 8.828 10.438C8.964 10.302 9.132 10.082 9.284 9.902C9.436 9.722 9.484 9.59 9.58 9.384C9.676 9.178 9.628 8.998 9.556 8.846C9.484 8.694 8.874 7.14 8.622 6.528C8.376 5.93 8.126 6.014 7.944 6.004C7.764 5.994 7.558 5.992 7.352 5.992C7.146 5.992 6.816 6.074 6.54 6.378C6.264 6.682 5.436 7.456 5.436 9.032C5.436 10.608 6.568 12.13 6.72 12.336C6.872 12.542 8.866 15.606 11.91 16.998C12.626 17.312 13.186 17.498 13.622 17.636C14.34 17.862 14.996 17.828 15.514 17.754C16.09 17.672 17.37 16.99 17.622 16.242C17.874 15.494 17.874 14.858 17.802 14.734C17.73 14.61 17.524 14.528 17.472 14.382Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C6.477 2 2 6.477 2 12C2 13.816 2.492 15.518 3.352 16.972L2 22L7.14 20.672C8.544 21.452 10.17 21.9 12 21.9C17.523 21.9 22 17.423 22 11.9C22 6.377 17.523 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const CONTACT_INFO = [
  { label: 'Whatsapp', href: 'https://wa.me/201556847277' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61587802923596' },
  { label: 'Instagram', href: 'https://www.instagram.com/toomore.eg?igsh=MXM1NWtkYXE5eHBlYg==' },
]

// Shop: replace "Gift Boxes" with "Gifting"
const shopLinks = [
  ...FOOTER_SHOP_LINKS.filter(l => l.label !== 'Gift Boxes'),
  { label: 'Gifting', href: '/gifting' }
]

// Company: remove "Gifting" completely
const companyLinks = FOOTER_COMPANY_LINKS.filter(l => l.label.toLowerCase() !== 'gifting')

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        {/* Brand column */}
        <div>
          <div className="footer-brand-name">
            TOO<span>MORE</span>
          </div>
          <p className="footer-tagline">
            Premium stuffed Mejdool dates, crafted with love in Egypt.
          </p>
          <div className="footer-social">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div className="footer-col">
          <h5>Shop</h5>
          <ul>
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            {CONTACT_INFO.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 TOOMORE. All rights reserved.</span>
        <span>Supported by DevCore</span>
      </div>
    </footer>
  )
}