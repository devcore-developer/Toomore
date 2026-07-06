'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import PaymentMethods from './PaymentMethods'
import { CartItem } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

interface CheckoutFormProps {
  items: CartItem[]
  total: number
  onSubmit: (data: {
    name: string
    phone: string
    address: string
    paymentMethod: string
    notes: string
  }) => void
}

export default function CheckoutForm({ items, total, onSubmit }: CheckoutFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [notes, setNotes] = useState('')

  return (
    <div className="checkout-form">
      {/* Order Summary */}
      <div className="checkout-summary">
        <h3 className="checkout-section-heading">Order Summary</h3>
        {items.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span className="checkout-summary-price">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="checkout-summary-total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Customer Info */}
      <h3 className="checkout-section-heading">Delivery Details</h3>
      <div className="checkout-fields">
        <Input label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
        <Input label="Phone Number" placeholder="+20 1XX XXX XXXX" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
        <Input label="Delivery Address" placeholder="Full address in Alexandria" value={address} onChange={(e) => setAddress((e.target as HTMLInputElement).value)} multiline rows={2} />
        <Input label="Notes (optional)" placeholder="Any special instructions..." value={notes} onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)} multiline rows={2} />
      </div>

      {/* Payment */}
      <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />

      <button
        type="button"
        className="checkout-submit"
        onClick={() => onSubmit({ name, phone, address, paymentMethod, notes })}
      >
        Place Order — {formatPrice(total)}
      </button>
    </div>
  )
}