'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/products', label: 'Products', icon: '□' },
  { href: '/admin/orders', label: 'Orders', icon: '☰' },
  { href: '/admin/gifts', label: 'Gift Requests', icon: '◐' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '❝' },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    await signOut(auth)
    logout()
    router.push('/admin/login')
  }

  const handleNavClick = () => {
    onClose()
  }

  return (
    <>
      <aside className={`admin-sidebar${isOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar-brand">
          <Link href="/admin" onClick={handleNavClick}>
            <span className="admin-sidebar-logo">
              TOO<span style={{ color: '#B78A52' }}>MORE</span>
            </span>
            <span className="admin-sidebar-tag">Admin Panel</span>
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-sidebar-link${active ? ' admin-sidebar-link--active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="admin-sidebar-link-icon">{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-sidebar-link admin-sidebar-link--muted" onClick={handleNavClick}>
            &larr; View Website
          </Link>
          <button
            onClick={handleLogout}
            className="admin-sidebar-link admin-sidebar-link--muted admin-sidebar-logout"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}