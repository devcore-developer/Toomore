'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
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
      const confirmed = window.confirm(
        `Are you sure you want to delete gift request ${gift.id.slice(0, 8).toUpperCase()}?\n\nThis action cannot be undone.`
      )
      if (!confirmed) return
      try {
        await deleteDoc(doc(db, 'gifts', gift.id))
        setGifts((prev) => prev.filter((g) => g.id !== gift.id))
      } catch (err) {
        console.error(err)
        alert('Error deleting gift request')
      }
    } else {
      updateStatus(gift, action)
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
    </div>
  )
}