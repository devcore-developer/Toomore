import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navbar() {
  return (
    <nav className="main-nav">
      <Link href="/" className="nav-logo">
        TOO<span>MORE</span>
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Button variant="primary" href="/shop">
        Order Now
      </Button>
    </nav>
  )
}