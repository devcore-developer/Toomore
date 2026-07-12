'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import GiftModal from '@/components/admin/GiftModal'

interface GiftRequest {
  id: string
  eventType: string
  quantity: string
  eventDate: string
  phone: string
  notes: string
  status: string
  createdAt: string
}

export default function AdminGiftsPage() {
  const [gifts, setGifts] = useState<GiftRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<GiftRequest | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchGifts = async () => {
    try {
      const snap = await getDocs(collection(db, 'gifts'))
      const list: GiftRequest[] = []
      snap.forEach((d) => {
        const data = d.data()
        list.push({
          id: d.id,
          eventType: data.eventType || 'N/A',
          quantity: data.quantity || '',
          eventDate: data.eventDate || '',
          phone: data.phone || '',
          notes: data.notes || '',
          status: data.status || 'pending',
          createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A',
        })
      })
      setGifts(list)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGifts() }, [])

  const updateStatus = async (gift: GiftRequest, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'gifts', gift.id), { status: newStatus })
      fetchGifts()
    } catch (err) {
      console.error(err)
      alert('Error updating status')
    }
  }

  const handleAction = async (action: string, gift: GiftRequest) => {
    if (action === '__delete__') {
      setDeleteTarget(gift)
    } else {
      updateStatus(gift, action)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/gifts?id=${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setGifts((prev) => prev.filter((g) => g.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
      alert('Error deleting gift request')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <div className="admin-loading">Loading gift requests...</div>

  return (
    <div>
      <h1 className="admin-page-title">Gift Requests</h1>
      <p className="admin-page-sub">Manage custom gifting requests (Click a row to view details)</p>

      <DataTable
        columns={[
          { key: 'id', label: 'ID', render: (v) => <span className="admin-mono">{v.slice(0, 8).toUpperCase()}</span> },
          { key: 'eventType', label: 'Event', render: (v) => <span style={{ textTransform: 'capitalize' }}>{v}</span> },
          { key: 'quantity', label: 'Quantity' },
          { key: 'eventDate', label: 'Event Date' },
          { key: 'phone', label: 'Phone' },
          { key: 'notes', label: 'Notes', render: (v) => <span className="admin-truncate">{v || '—'}</span> },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
          { key: 'createdAt', label: 'Submitted' },
        ]}
        data={gifts}
        onRowClick={(row) => setSelectedGiftId(row.id)}
        onAction={(action, row) => handleAction(action, row)}
        actions={[
          ...['pending', 'confirmed', 'completed', 'cancelled'].map((s) => ({
            label: s.charAt(0).toUpperCase() + s.slice(1),
            value: s,
          })),
          { label: '— Delete Request —', value: '__delete__' },
        ]}
      />

      <GiftModal giftId={selectedGiftId} onClose={() => setSelectedGiftId(null)} />

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 300,
            padding: 20,
          }}
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: '32px',
              maxWidth: 400,
              width: '100%',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
              Delete Gift Request?
            </h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.6 }}>
              Gift request <strong style={{ color: '#1a1a1a' }}>#{deleteTarget.id.slice(0, 8).toUpperCase()}</strong> will be permanently removed. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  color: '#374151',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 10,
                  border: 'none',
                  background: deleting ? '#f87171' : '#DC2626',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}