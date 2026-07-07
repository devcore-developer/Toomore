'use client'

import CartDrawer from '@/components/layout/CartDrawer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  )
}