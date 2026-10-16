'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import PaymentMethods from './PaymentMethods'
import { CartItem } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { INSTAPAY_LINK } from '@/lib/constants'

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
    promoCode?: string
  }) => void
}

export default function CheckoutForm({ items, total, onSubmit, isSubmitting }: CheckoutFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [notes, setNotes] = useState('')
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | undefined>(undefined)
  const [instapayRedirected, setInstapayRedirected] = useState(false)
  
  // Promo Code States
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<any>(null)
  const [promoError, setPromoError] = useState('')
  const [applyingPromo, setApplyingPromo] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPaymentScreenshot(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return
    setApplyingPromo(true)
    setPromoError('')
    setAppliedPromo(null)
    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput, subtotal: total })
      })
      const data = await res.json()
      if (data.valid) {
        setAppliedPromo(data.promo)
      } else {
        setPromoError(data.message || 'Invalid promo code.')
      }
    } catch {
      setPromoError('Error validating promo code.')
    } finally {
      setApplyingPromo(false)
    }
  }

  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0
  const finalTotal = total - discountAmount

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method)
    if (method === 'instapay') {
      if (INSTAPAY_LINK) {
        window.open(INSTAPAY_LINK, '_blank')
        setInstapayRedirected(true)
      } else {
        alert('InstaPay link is not configured.')
      }
    } else {
      setInstapayRedirected(false)
    }
  }

  const requiresTransfer = paymentMethod === 'instapay' || paymentMethod === 'vodafone_cash'
  const showInstapayUpload = paymentMethod === 'instapay' && instapayRedirected
  const showVodafoneUpload = paymentMethod === 'vodafone_cash'

  return (
    <div className="checkout-form">
      <div className="checkout-summary">
        <h3 className="checkout-section-heading">Order Summary</h3>
        {items.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span className="checkout-summary-price">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #eee' }}>
          <div className="checkout-summary-item">
            <span>Subtotal</span>
            <span className="checkout-summary-price">{formatPrice(total)}</span>
          </div>
          
          {appliedPromo && (
            <>
              <div className="checkout-summary-item">
                <span>Promo Code: {appliedPromo.code}</span>
                <span className="checkout-summary-price">-{appliedPromo.discountValue}%</span>
              </div>
              <div className="checkout-summary-item">
                <span>You Save</span>
                <span className="checkout-summary-price">{formatPrice(discountAmount)}</span>
              </div>
            </>
          )}
          
          <div className="checkout-summary-total">
            <span>Final Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      <div className="checkout-shipping-note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p>Shipping fees are up to EGP 50 depending on your delivery location. The exact shipping cost will be confirmed with you via WhatsApp after placing your order.</p>
      </div>

      <h3 className="checkout-section-heading">Promo Code (Optional)</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          className="admin-form-input"
          placeholder="Enter your promo code"
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
          disabled={!!appliedPromo}
        />
        {appliedPromo ? (
          <button 
            type="button" 
            className="admin-btn-primary"
            onClick={() => { setAppliedPromo(null); setPromoInput('') }}
          >
            Remove
          </button>
        ) : (
          <button 
            type="button" 
            className="admin-btn-primary"
            onClick={handleApplyPromo}
            disabled={applyingPromo || !promoInput}
          >
            {applyingPromo ? 'Checking...' : 'Apply'}
          </button>
        )}
      </div>
      {promoError && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 16 }}>{promoError}</p>}
      {appliedPromo && (
        <p style={{ color: '#16a34a', fontSize: 13, marginBottom: 16 }}>
          Promo code applied successfully! You saved {appliedPromo.discountValue}%
          {appliedPromo.maxDiscountAmount > 0 ? ` (maximum ${formatPrice(appliedPromo.maxDiscountAmount)})` : ''}.
        </p>
      )}

      <h3 className="checkout-section-heading">Delivery Details</h3>
      <div className="checkout-fields">
        <Input label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
        <Input label="Phone Number" placeholder="+20 1XX XXX XXXX" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
        <Input label="Delivery Address" placeholder="Full address in Alexandria" value={address} onChange={(e) => setAddress((e.target as HTMLInputElement).value)} multiline rows={2} />
        <Input label="Notes (optional)" placeholder="Any special instructions..." value={notes} onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)} multiline rows={2} />
      </div>

      <PaymentMethods selected={paymentMethod} onChange={handlePaymentChange} />

      {showInstapayUpload && (
        <div className="checkout-transfer-box">
          <div className="checkout-transfer-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <p>Please transfer exactly <strong>{formatPrice(finalTotal)}</strong> via the InstaPay app.</p>
              <p className="checkout-transfer-note">Upload a screenshot of the payment below to confirm your order.</p>
            </div>
          </div>
          <label className="checkout-upload-btn">
            {paymentScreenshot ? '✓ Screenshot Uploaded' : 'Upload Screenshot'}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          {paymentScreenshot && (
            <div className="checkout-upload-preview">
              <img src={paymentScreenshot} alt="Payment Screenshot" />
              <button type="button" onClick={() => setPaymentScreenshot(undefined)}>Remove</button>
            </div>
          )}
        </div>
      )}

      {showVodafoneUpload && (
        <div className="checkout-transfer-box">
          <div className="checkout-transfer-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <p>Please transfer exactly <strong>{formatPrice(finalTotal)}</strong> to the following number:</p>
              <p className="checkout-transfer-number">01042739342</p>
              <p className="checkout-transfer-note">Upload a screenshot of the payment below to confirm your order.</p>
            </div>
          </div>
          <label className="checkout-upload-btn">
            {paymentScreenshot ? '✓ Screenshot Uploaded' : 'Upload Screenshot'}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
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
        onClick={() => onSubmit({ 
          name, phone, address, paymentMethod, notes, paymentScreenshot,
          promoCode: appliedPromo ? appliedPromo.code : undefined
        })}
        disabled={isSubmitting || !name || !phone || !address || (requiresTransfer && !paymentScreenshot)}
      >
        {isSubmitting ? 'Placing Order...' : `Place Order — ${formatPrice(finalTotal)}`}
      </button>
    </div>
  )
}