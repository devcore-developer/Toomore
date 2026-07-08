'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface GiftModalProps {
  giftId: string | null
  onClose: () => void
}

export default function GiftModal({ giftId, onClose }: GiftModalProps) {
  const [gift, setGift] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!giftId) return
    setLoading(true)
    getDoc(doc(db, 'gifts', giftId))
      .then((snap) => {
        if (snap.exists()) {
          setGift({ id: snap.id, ...snap.data() })
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [giftId])

  if (!giftId) return null

  return (
    <>
      <div className="admin-modal-overlay" onClick={onClose} />
      <div className="admin-invoice-modal">
        <div className="admin-invoice-header">
          <h2>Gift Request Details</h2>
          <button className="admin-invoice-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="admin-invoice-loading">Loading details...</div>
        ) : gift ? (
          <div className="admin-invoice-body">
            <div className="admin-invoice-meta">
              <div className="admin-invoice-meta-item">
                <span className="admin-invoice-label">Request ID</span>
                <span className="admin-invoice-value mono">{gift.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="admin-invoice-meta-item">
                <span className="admin-invoice-label">Submitted</span>
                <span className="admin-invoice-value">{gift.createdAt ? new Date(gift.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</span>
              </div>
              <div className="admin-invoice-meta-item">
                <span className="admin-invoice-label">Status</span>
                <span className="admin-invoice-value" style={{textTransform: 'capitalize'}}>{gift.status || 'pending'}</span>
              </div>
            </div>

            <div className="admin-invoice-section">
              <h4>Event Details</h4>
              <div className="admin-invoice-grid">
                <div><strong>Event Type:</strong> <span style={{textTransform: 'capitalize'}}>{gift.eventType || 'N/A'}</span></div>
                <div><strong>Quantity:</strong> {gift.quantity || 'N/A'}</div>
                <div><strong>Event Date:</strong> {gift.eventDate || 'N/A'}</div>
              </div>
            </div>

            <div className="admin-invoice-section">
              <h4>Contact Info</h4>
              <div className="admin-invoice-grid">
                <div><strong>Phone:</strong> {gift.phone || 'N/A'}</div>
              </div>
            </div>

            {gift.notes && (
              <div className="admin-invoice-section">
                <h4>Notes</h4>
                <p className="admin-invoice-notes">{gift.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="admin-invoice-loading">Request not found.</div>
        )}
      </div>
    </>
  )
}