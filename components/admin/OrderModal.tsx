'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { formatPrice } from '@/lib/utils'

interface OrderModalProps {
  orderId: string | null
  onClose: () => void
}

export default function OrderModal({ orderId, onClose }: OrderModalProps) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!orderId) return
    setLoading(true)
    getDoc(doc(db, 'orders', orderId))
      .then((snap) => {
        if (snap.exists()) {
          setOrder({ id: snap.id, ...snap.data() })
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [orderId])

  if (!orderId) return null

  const paymentLabels: Record<string, string> = {
    cod: 'Cash on Delivery',
    instapay: 'InstaPay',
    vodafone_cash: 'Vodafone Cash',
  }

  return (
    <>
      <div className="admin-modal-overlay" onClick={onClose} />
      <div className="admin-invoice-modal">
        <div className="admin-invoice-header">
          <h2>Order Invoice</h2>
          <button className="admin-invoice-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="admin-invoice-loading">Loading details...</div>
        ) : order ? (
          <div className="admin-invoice-body">
            {/* Top Info */}
            <div className="admin-invoice-meta">
              <div className="admin-invoice-meta-item">
                <span className="admin-invoice-label">Order ID</span>
                <span className="admin-invoice-value mono">{order.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="admin-invoice-meta-item">
                <span className="admin-invoice-label">Date</span>
                <span className="admin-invoice-value">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</span>
              </div>
              <div className="admin-invoice-meta-item">
                <span className="admin-invoice-label">Payment</span>
                <span className="admin-invoice-value">{paymentLabels[order.paymentMethod] || order.paymentMethod}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="admin-invoice-section">
              <h4>Customer Details</h4>
              <div className="admin-invoice-grid">
                <div><strong>Name:</strong> {order.customerName || 'N/A'}</div>
                <div><strong>Phone:</strong> {order.customerPhone || 'N/A'}</div>
                <div className="admin-invoice-full"><strong>Address:</strong> {order.address || 'N/A'}</div>
              </div>
            </div>

            {/* Items */}
            <div className="admin-invoice-section">
              <h4>Items Ordered</h4>
              <div className="admin-invoice-items">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="admin-invoice-item">
                    <div className="admin-invoice-item-info">
                      <span className="admin-invoice-item-name">
                        {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                      </span>
                      {/* لو فيه أطعمة مختارة */}
                      {item.flavors && item.flavors.length > 0 && (
                        <div className="admin-invoice-flavors">
                          {Object.entries(
                            item.flavors.reduce((acc: Record<string, number>, f: string) => {
                              acc[f] = (acc[f] || 0) + 1
                              return acc
                            }, {})
                          ).map(([flavor, count]) => (
                            <span key={flavor} className="admin-flavor-chip">{count as number}x {flavor}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="admin-invoice-item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="admin-invoice-section">
                <h4>Notes</h4>
                <p className="admin-invoice-notes">{order.notes}</p>
              </div>
            )}

            {/* Payment Screenshot */}
            {order.paymentScreenshot && (
              <div className="admin-invoice-section">
                <h4>Payment Screenshot</h4>
                <div className="admin-invoice-screenshot">
                  <img src={order.paymentScreenshot} alt="Payment Proof" />
                </div>
              </div>
            )}

            {/* Total Footer */}
            <div className="admin-invoice-total-row">
              <span className="admin-invoice-total-label">Total Amount</span>
              <span className="admin-invoice-total-amount">{formatPrice(order.total)}</span>
            </div>
          </div>
        ) : (
          <div className="admin-invoice-loading">Order not found.</div>
        )}
      </div>
    </>
  )
}