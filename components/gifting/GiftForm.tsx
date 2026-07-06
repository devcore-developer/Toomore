'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import OccasionSelector from './OccasionSelector'

interface GiftFormProps {
  onSubmit?: (data: {
    eventType: string
    quantity: string
    eventDate: string
    phone: string
    notes: string
  }) => void
}

export default function GiftForm({ onSubmit }: GiftFormProps) {
  const [eventType, setEventType] = useState('Wedding')
  const [quantity, setQuantity] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    onSubmit?.({ eventType, quantity, eventDate, phone, notes })
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
      >
        Submit Gifting Request
      </button>
    </>
  )
}