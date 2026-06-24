'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'

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

  if (loading) return <div style={{ color: '#6A675F', padding: 40 }}>Loading gift requests...</div>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 32, fontWeight: 600, color: '#0E5B4F', marginBottom: 4 }}>
        Gift Requests
      </h1>
      <p style={{ fontSize: 14, color: '#6A675F', marginBottom: 32 }}>Manage custom gifting requests</p>

      <DataTable
        columns={[
          { key: 'id', label: 'ID', render: (v) => <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{v.slice(0, 8).toUpperCase()}</span> },
          { key: 'eventType', label: 'Event', render: (v) => <span style={{ textTransform: 'capitalize' }}>{v}</span> },
          { key: 'quantity', label: 'Quantity' },
          { key: 'eventDate', label: 'Event Date' },
          { key: 'phone', label: 'Phone' },
          { key: 'notes', label: 'Notes', render: (v) => <span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v || '—'}</span> },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
          { key: 'createdAt', label: 'Submitted' },
        ]}
        data={gifts}
        onAction={(_, row) => updateStatus(row, _)}
        actions={['pending', 'confirmed', 'completed', 'cancelled'].map((s) => ({
          label: s.charAt(0).toUpperCase() + s.slice(1),
          value: s,
        }))}
      />
    </div>
  )
}