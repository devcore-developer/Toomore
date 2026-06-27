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

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    await signOut(auth)
    logout()
    router.push('/admin/login')
  }

  return (
    <aside style={{
      width: 260,
      minHeight: '100vh',
      background: '#083C34',
      color: 'rgba(255,255,255,0.8)',
      padding: '32px 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
    }}>
      <div style={{ padding: '0 28px', marginBottom: 40 }}>
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 22,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: 1,
          }}>
            TOO<span style={{ color: '#B78A52' }}>MORE</span>
          </span>
          <span style={{
            display: 'block',
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>Admin Panel</span>
        </Link>
      </div>

      <nav style={{ flex: 1, padding: '0 16px' }}>
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                textDecoration: 'none',
                marginBottom: 4,
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '0 16px' }}>
        <Link
          href="/"
          style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: 12,
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            marginBottom: 4,
          }}
        >
          ← View Website
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            borderRadius: 12,
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}