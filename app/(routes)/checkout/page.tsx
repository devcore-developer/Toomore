'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import SectionTitle from '@/components/shared/SectionTitle'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', background: '#fff', minHeight: '70vh' }}>
        <p className="serif" style={{ fontSize: 24, color: '#0F4C3A', marginBottom: 16 }}>
          Your cart is empty
        </p>
        <button className="btn-dark" onClick={() => router.push('/shop')}>
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <section className="faq">
      <SectionTitle tag="Checkout" title="Complete Your Order" align="center" />
      <div style={{ marginTop: 48 }}>
        <CheckoutForm
          items={items}
          total={total()}
          onSubmit={(data) => {
            console.log('Order placed:', { ...data, items, total: total() })
            alert('Order placed successfully! 🎉')
            clearCart()
            router.push('/')
          }}
        />
      </div>
    </section>
  )
}