'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import { formatPrice } from '@/lib/utils'

const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

interface Order {
  id: string
  customerName: string
  customerPhone: string
  address: string
  total: number
  paymentMethod: string
  status: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const snap = await getDocs(collection(db, 'orders'))
      const list: Order[] = []
      snap.forEach((d) => {
        const data = d.data()
        list.push({
          id: d.id,
          customerName: data.customerName || 'N/A',
          customerPhone: data.customerPhone || '',
          address: data.address || '',
          total: data.total || 0,
          paymentMethod: data.paymentMethod || 'cod',
          status: data.status || 'pending',
          createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A',
        })
      })
      setOrders(list)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (order: Order, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', order.id), { status: newStatus })
      fetchOrders()
    } catch (err) {
      console.error(err)
      alert('Error updating status')
    }
  }

  if (loading) return <div style={{ color: '#6A675F', padding: 40 }}>Loading orders...</div>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 32, fontWeight: 600, color: '#0E5B4F', marginBottom: 4 }}>
        Orders
      </h1>
      <p style={{ fontSize: 14, color: '#6A675F', marginBottom: 32 }}>Manage customer orders</p>

      <DataTable
        columns={[
          { key: 'id', label: 'Order ID', render: (v) => <span style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: 13 }}>{v.slice(0, 8).toUpperCase()}</span> },
          { key: 'customerName', label: 'Customer' },
          { key: 'customerPhone', label: 'Phone' },
          { key: 'total', label: 'Total', render: (v) => <span style={{ fontWeight: 600, color: '#C65A2E' }}>{formatPrice(v)}</span> },
          { key: 'paymentMethod', label: 'Payment', render: (v) => {
            const labels: Record<string, string> = { cod: 'Cash on Delivery', instapay: 'InstaPay', vodafone_cash: 'Vodafone Cash' }
            return labels[v] || v
          }},
          { key: 'status', label: 'Status', render: (v, row) => <StatusBadge status={v} /> },
          { key: 'createdAt', label: 'Date' },
        ]}
        data={orders}
        onAction={(_, row) => updateStatus(row, _)}
        actions={statuses.map((s) => ({
          label: s.charAt(0).toUpperCase() + s.slice(1),
          value: s,
        }))}
      />
    </div>
  )
}