'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import MobileNav from '@/components/layout/MobileNav'
import { useCartStore } from '@/store/cart-store'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const openCart = useCartStore((s) => s.openCart)
  const count = useCartStore((s) => s.count)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="main-nav"
      style={scrolled ? {
        background: 'rgba(248,244,236,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      } : undefined}
    >
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