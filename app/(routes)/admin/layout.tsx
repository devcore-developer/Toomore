'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      }
    })
    return () => unsubscribe()
  }, [router, setUser, pathname])

  if (user === null) {
    return null
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F2ED' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: 260, padding: '40px 48px' }}>
        {children}
      </main>
    </div>
  )
}