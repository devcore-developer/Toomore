'use client'

import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import MobileNav from '@/components/layout/MobileNav'
import { useCartStore } from '@/store/cart-store'

export default function Navbar() {
  const openCart = useCartStore((s) => s.openCart)
  const count = useCartStore((s) => s.count)

  return (
    <nav className="main-nav">
      <Link href="/" className="nav-logo-link">
        <Image
          src="/icons/logo.png"
          alt="TOOMORE"
          width={140}
          height={44}
          priority
          className="nav-logo-img"
        />
      </Link>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="nav-desktop-cta">
        <button className="nav-cart-btn" onClick={openCart} aria-label="Open cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {count() > 0 && <span className="nav-cart-count">{count()}</span>}
        </button>
        <Button variant="primary" href="/shop">
          Order Now
        </Button>
      </div>

      <MobileNav />
    </nav>
  )
}