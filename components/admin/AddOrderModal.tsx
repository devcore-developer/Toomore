'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onAdded: () => void
}

export default function AddOrderModal({ isOpen, onClose, onAdded }: AddOrderModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [total, setTotal] = useState('')
  const [payment, setPayment] = useState('cod')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  if (!isOpen) return null

  const handleAdd = async () => {
    if (!name || !total) return
    setSaving(true)
    try {
      await addDoc(collection(db, 'orders'), {
        customerName: name,
        customerPhone: phone,
        address: 'External Order (WhatsApp/Phone)',
        total: Number(total),
        paymentMethod: payment,
        status: 'confirmed', // الأوردرات اللي بتتضاف يدوي بتكون مؤكدة
        source: 'external',   // علامة إنه طلبي خارجي
        items: [{ name: 'Manual Order', quantity: 1, price: Number(total), flavors: [] }],
        notes: `External Order: ${notes}`,
        createdAt: new Date().toISOString(),
      })
      setName(''); setPhone(''); setTotal(''); setNotes('')
      onAdded()
      onClose()
    } catch (err) {
      alert('Error adding order')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="admin-modal-overlay" onClick={onClose} />
      <div className="admin-invoice-modal" style={{ maxWidth: '450px' }}>
        <div className="admin-invoice-header">
          <h2>Add External Order</h2>
          <button className="admin-invoice-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className="admin-invoice-body">
          <div className="admin-form-field">
            <label className="admin-form-label">Customer Name *</label>
            <input className="admin-form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ahmed" />
          </div>
          
          <div className="admin-form-field">
            <label className="admin-form-label">Phone Number</label>
            <input className="admin-form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+20 1XX XXX XXXX" />
          </div>
          
          <div className="admin-form-field">
            <label className="admin-form-label">Total Amount (EGP) *</label>
            <input type="number" className="admin-form-input" value={total} onChange={e => setTotal(e.target.value)} placeholder="e.g. 280" />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Payment Method</label>
            <select className="admin-form-input" value={payment} onChange={e => setPayment(e.target.value)}>
              <option value="cod">Cash on Delivery</option>
              <option value="instapay">InstaPay</option>
              <option value="vodafone_cash">Vodafone Cash</option>
            </select>
          </div>
          
          <div className="admin-form-field">
            <label className="admin-form-label">Notes / Source (e.g. WhatsApp)</label>
            <textarea className="admin-form-input admin-form-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Order details..." rows={3} />
          </div>

          <button 
            className="admin-form-submit" 
            onClick={handleAdd} 
            disabled={saving || !name || !total}
            style={{ marginTop: '16px' }}
          >
            {saving ? 'Saving...' : 'Add Order'}
          </button>
        </div>
      </div>
    </>
  )
}