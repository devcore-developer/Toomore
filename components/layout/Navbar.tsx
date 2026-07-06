import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import MobileNav from '@/components/layout/MobileNav'

export default function Navbar() {
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
        <Button variant="primary" href="/shop">
          Order Now
        </Button>
      </div>

      <MobileNav />
    </nav>
  )
}