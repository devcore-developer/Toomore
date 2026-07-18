'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { FLAVORS, BOX_PRICES } from '@/lib/constants'

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onAdded: () => void
}

export default function AddOrderModal({ isOpen, onClose, onAdded }: AddOrderModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [orderType, setOrderType] = useState<'product_box' | 'gift_order'>('product_box')
  const [boxSize, setBoxSize] = useState<number>(4)
  const [giftPackage, setGiftPackage] = useState('')
  const [flavors, setFlavors] = useState<Record<string, number>>({})
  const [total, setTotal] = useState('')
  const [payment, setPayment] = useState('cod')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  if (!isOpen) return null

  const handleBoxSizeChange = (size: number) => {
    setBoxSize(size)
    setTotal(String(BOX_PRICES[size] || ''))
  }

  const updateFlavorQty = (flavor: string, qty: number) => {
    setFlavors(prev => ({ ...prev, [flavor]: Math.max(0, qty) }))
  }

  const handleAdd = async () => {
    if (!name || !total) return
    setSaving(true)
    try {
      const selectedFlavorsList: string[] = []
      for (const [f, q] of Object.entries(flavors)) {
        for (let i = 0; i < q; i++) {
          selectedFlavorsList.push(f.toUpperCase())
        }
      }

      const orderData: any = {
        customerName: name,
        customerPhone: phone,
        address: address || 'Not provided',
        total: Number(total),
        paymentMethod: payment,
        status: 'confirmed',
        source: 'external',
        createdAt: new Date().toISOString(),
        notes: `External Order: ${notes}`,
      }

      if (orderType === 'product_box') {
        orderData.items = [{
          name: `${boxSize}-Piece Package`,
          quantity: 1,
          price: Number(total),
          flavors: selectedFlavorsList,
          pieces: boxSize,
        }]
        orderData.orderType = 'product_box'
        orderData.boxSize = boxSize
      } else {
        orderData.items = [{
          name: giftPackage || 'Custom Gift Package',
          quantity: 1,
          price: Number(total),
          flavors: selectedFlavorsList,
        }]
        orderData.orderType = 'gift_order'
        orderData.giftPackage = giftPackage
      }

      await addDoc(collection(db, 'orders'), orderData)
      setName(''); setPhone(''); setAddress('')
      setOrderType('product_box'); setBoxSize(4); setGiftPackage('')
      setFlavors({}); setTotal(''); setNotes('')
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
      <div className="admin-invoice-modal" style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
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
          {/* Customer Info */}
          <div className="admin-order-section">
            <h4 className="admin-order-section-title">Customer Information</h4>
            <div className="admin-form-field">
              <label className="admin-form-label">Customer Name *</label>
              <input className="admin-form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ahmed" />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Phone Number</label>
              <input className="admin-form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+20 1XX XXX XXXX" />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Customer Address</label>
              <input className="admin-form-input" value={address} onChange={e => setAddress(e.target.value)} placeholder="Full delivery address" />
            </div>
          </div>

          {/* Order Type */}
          <div className="admin-order-section">
            <h4 className="admin-order-section-title">Order Information</h4>
            <div className="admin-form-field">
              <label className="admin-form-label">Order Type</label>
              <div className="admin-order-type-toggle">
                <button type="button" className={`admin-order-type-btn${orderType === 'product_box' ? ' admin-order-type-btn--active' : ''}`} onClick={() => setOrderType('product_box')}>
                  Product Box
                </button>
                <button type="button" className={`admin-order-type-btn${orderType === 'gift_order' ? ' admin-order-type-btn--active' : ''}`} onClick={() => setOrderType('gift_order')}>
                  Gift Order
                </button>
              </div>
            </div>

            {orderType === 'product_box' ? (
              <div className="admin-form-field">
                <label className="admin-form-label">Box Size</label>
                <div className="admin-box-size-options">
                  {[4, 8, 12, 16].map(size => (
                    <button key={size} type="button" className={`admin-box-size-btn${boxSize === size ? ' admin-box-size-btn--active' : ''}`} onClick={() => handleBoxSizeChange(size)}>
                      {size} Pieces
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="admin-form-field">
                <label className="admin-form-label">Gift Package</label>
                <input className="admin-form-input" value={giftPackage} onChange={e => setGiftPackage(e.target.value)} placeholder="e.g. Wedding Gift Box" />
              </div>
            )}

            <div className="admin-form-field">
              <label className="admin-form-label">Selected Flavors</label>
              <div className="admin-flavor-picker">
                {FLAVORS.map(f => (
                  <div key={f.name} className="admin-flavor-row">
                    <span className="admin-flavor-name">{f.name}</span>
                    <div className="flavor-qty">
                      <button type="button" onClick={() => updateFlavorQty(f.name, (flavors[f.name] || 0) - 1)}>-</button>
                      <span>{flavors[f.name] || 0}</span>
                      <button type="button" onClick={() => updateFlavorQty(f.name, (flavors[f.name] || 0) + 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment & Notes */}
          <div className="admin-order-section">
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
          </div>

          <button className="admin-form-submit" onClick={handleAdd} disabled={saving || !name || !total} style={{ marginTop: '16px' }}>
            {saving ? 'Saving...' : 'Add Order'}
          </button>
        </div>
      </div>
    </>
  )
}