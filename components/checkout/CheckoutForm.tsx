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
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Order Summary */}
      <div style={{ background: '#F5EBDD', borderRadius: 4, padding: 24, marginBottom: 32 }}>
        <h3 className="serif" style={{ fontSize: 20, color: '#0F4C3A', marginBottom: 16 }}>Order Summary</h3>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid rgba(199,165,106,.2)',
              fontSize: 14,
            }}
          >
            <span>{item.name} × {item.quantity}</span>
            <span style={{ color: '#C84B2F', fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, fontSize: 18, fontWeight: 500 }}>
          <span className="serif" style={{ color: '#0F4C3A' }}>Total</span>
          <span className="serif" style={{ color: '#C84B2F' }}>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Customer Info */}
      <h3 className="serif" style={{ fontSize: 20, color: '#0F4C3A', marginBottom: 20 }}>Delivery Details</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        <Input label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
        <Input label="Phone Number" placeholder="+20 1XX XXX XXXX" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
        <Input label="Delivery Address" placeholder="Full address in Cairo/Alexandria" value={address} onChange={(e) => setAddress((e.target as HTMLInputElement).value)} multiline rows={2} />
        <Input label="Notes (optional)" placeholder="Any special instructions..." value={notes} onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)} multiline rows={2} />
      </div>

      {/* Payment */}
      <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />

      <button
        className="btn-primary"
        style={{ width: '100%', padding: '16px', fontSize: 14, marginTop: 24, textAlign: 'center' }}
        onClick={() => onSubmit({ name, phone, address, paymentMethod, notes })}
      >
        Place Order — {formatPrice(total)}
      </button>
    </div>
  )
}