import Link from 'next/link'
import {
  FOOTER_SHOP_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_CONTACT_LINKS,
} from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">
            TOO<span>MORE</span>
          </div>
          <p className="footer-tagline">
            Premium stuffed Medjool dates, crafted with love in Egypt.
          </p>
          <div className="footer-social">
            <div className="social-btn">in</div>
            <div className="social-btn">ig</div>
            <div className="social-btn">fb</div>
          </div>
        </div>
        <div className="footer-col">
          <h5>Shop</h5>
          <ul>
            {FOOTER_SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            {FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            {FOOTER_CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 TOOMORE. All rights reserved.</span>
        <span>Made with love in Egypt 🇪🇬</span>
      </div>
    </footer>
  )
}