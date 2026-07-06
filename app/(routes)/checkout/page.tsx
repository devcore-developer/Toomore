'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import SectionTitle from '@/components/shared/SectionTitle'
import Button from '@/components/ui/Button'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <p className="checkout-empty-title">Your cart is empty</p>
        <Button variant="dark" href="/shop">
          Browse Products
        </Button>
      </div>
    )
  }

  return (
    <section className="checkout-page">
      <SectionTitle tag="Checkout" title="Complete Your Order" align="center" />
      <div className="checkout-page-content">
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