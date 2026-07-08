'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import OccasionSelector from './OccasionSelector'

export default function GiftForm() {
  const [eventType, setEventType] = useState('Wedding')
  const [quantity, setQuantity] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!phone || !quantity || !eventDate) {
      alert('Please fill in the quantity, event date, and phone number.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, quantity, eventDate, phone, notes }),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // شاشة النجاح
  if (isSuccess) {
    return (
      <div className="gift-success-wrap">
        <div className="gift-success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="gift-success-title">Request Submitted!</h3>
        <p className="gift-success-sub">Our gifting team will contact you within 24 hours to finalize the beautiful details for your event.</p>
        <button 
          type="button" 
          className="gift-success-close"
          onClick={() => window.location.reload()}
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="form-row">
        <div className="form-label">Event Type</div>
        <OccasionSelector selected={eventType} onChange={setEventType} />
      </div>
      <div className="form-grid">
        <Input label="Quantity" placeholder="e.g. 50 boxes" value={quantity} onChange={(e) => setQuantity((e.target as HTMLInputElement).value)} />
        <Input label="Event Date" type="date" value={eventDate} onChange={(e) => setEventDate((e.target as HTMLInputElement).value)} />
      </div>
      <Input label="Phone Number" placeholder="+20 1XX XXX XXXX" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
      <Input label="Notes" placeholder="Custom ribbon color, logo embossing..." value={notes} onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)} multiline rows={3} />
      <button
        type="button"
        className="btn-submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Gifting Request'}
      </button>
    </>
  )
}