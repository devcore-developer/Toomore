'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        if (isLoginPage) {
          router.push('/admin')
        }
      } else {
        setUser(null)
        if (!isLoginPage) {
          router.push('/admin/login')
        }
      }
    })
    return () => unsubscribe()
  }, [router, setUser, pathname, isLoginPage])

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (user === null) {
    return null
  }

  return (
    <div className="admin-layout">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile header bar */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}