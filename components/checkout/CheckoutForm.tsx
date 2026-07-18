'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import PaymentMethods from './PaymentMethods'
import { CartItem } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

interface CheckoutFormProps {
  items: CartItem[]
  total: number
  isSubmitting?: boolean
  onSubmit: (data: {
    name: string
    phone: string
    address: string
    paymentMethod: string
    notes: string
    paymentScreenshot?: string
  }) => void
}

export default function CheckoutForm({ items, total, onSubmit, isSubmitting }: CheckoutFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [notes, setNotes] = useState('')
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | undefined>(undefined)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPaymentScreenshot(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const requiresTransfer = paymentMethod === 'instapay' || paymentMethod === 'vodafone_cash'

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

            {/* Shipping Note */}
      <div className="checkout-shipping-note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p>Shipping fees are up to EGP 50 depending on your delivery location. The exact shipping cost will be confirmed with you via WhatsApp after placing your order.</p>
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

      {/* Transfer Details & Screenshot Upload */}
      {requiresTransfer && (
        <div className="checkout-transfer-box">
          <div className="checkout-transfer-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <p>Please transfer exactly <strong>{formatPrice(total)}</strong> to the following number:</p>
              <p className="checkout-transfer-number">01012345678</p> {/* غيّر الرقم ده لرقمك الحقيقي */}
              <p className="checkout-transfer-note">Upload a screenshot of the payment below to confirm your order.</p>
            </div>
          </div>
          
          <label className="checkout-upload-btn">
            {paymentScreenshot ? '✓ Screenshot Uploaded' : 'Upload Screenshot'}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }}
            />
          </label>
          
          {paymentScreenshot && (
            <div className="checkout-upload-preview">
              <img src={paymentScreenshot} alt="Payment Screenshot" />
              <button type="button" onClick={() => setPaymentScreenshot(undefined)}>Remove</button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className="checkout-submit"
        onClick={() => onSubmit({ name, phone, address, paymentMethod, notes, paymentScreenshot })}
        disabled={isSubmitting || !name || !phone || !address || (requiresTransfer && !paymentScreenshot)}
      >
        {isSubmitting ? 'Placing Order...' : `Place Order — ${formatPrice(total)}`}
      </button>
    </div>
  )
}