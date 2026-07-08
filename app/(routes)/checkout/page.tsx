'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSuccess from '@/components/checkout/OrderSuccess'
import SectionTitle from '@/components/shared/SectionTitle'
import Button from '@/components/ui/Button'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{ items: any[], total: number } | null>(null)

  // لما الطلب ينجح، يعرض شاشة النجاح
  if (isSuccess && orderDetails) {
    return <OrderSuccess items={orderDetails.items} total={orderDetails.total} />
  }

  // لو السلة فاضية ومش في طلب جديد
  if (items.length === 0 && !isSuccess) {
    return (
      <div className="checkout-empty">
        <p className="checkout-empty-title">Your cart is empty</p>
        <Button variant="dark" href="/shop">
          Browse Products
        </Button>
      </div>
    )
  }

  // دالة إرسال الطلب للداتا بيز
  const handleSubmit = async (data: {
    name: string
    phone: string
    address: string
    paymentMethod: string
    notes: string
    paymentScreenshot?: string // ✅ تم إضافة السطر ده
  }) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: data.name,
          customerPhone: data.phone,
          address: data.address,
          paymentMethod: data.paymentMethod,
          notes: data.notes,
          paymentScreenshot: data.paymentScreenshot,
          items: items,
          total: total(),
        }),
      })

      if (res.ok) {
        setOrderDetails({ items, total: total() })
        setIsSuccess(true)
        clearCart()
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="checkout-page">
      <SectionTitle tag="Checkout" title="Complete Your Order" align="center" />
      <div className="checkout-page-content">
        <CheckoutForm
          items={items}
          total={total()}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  )
}