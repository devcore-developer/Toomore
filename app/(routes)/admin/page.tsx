'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import StatsCard from '@/components/admin/StatsCard'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import OrderModal from '@/components/admin/OrderModal'
import AddOrderModal from '@/components/admin/AddOrderModal'
import { formatPrice } from '@/lib/utils'

interface Order {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
  source?: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, websiteOrders: 0, externalOrders: 0, gifts: 0, revenue: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchData = async () => {
    try {
      const productsSnap = await getDocs(collection(db, 'products'))
      const ordersSnap = await getDocs(collection(db, 'orders'))
      const giftsSnap = await getDocs(collection(db, 'gifts'))

      let revenue = 0
      let websiteOrders = 0
      let externalOrders = 0
      const ordersList: Order[] = []
      
      ordersSnap.forEach((doc) => {
        const d = doc.data()
        revenue += Number(d.total) || 0
        
        // حساب الأوردرات الموقع والخارجية
        if (d.source === 'external') {
          externalOrders++
        } else {
          websiteOrders++
        }

        ordersList.push({
          id: doc.id,
          customerName: d.customerName || 'N/A',
          total: Number(d.total) || 0,
          status: d.status || 'pending',
          source: d.source || 'website',
          createdAt: d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A',
          _timestamp: d.createdAt,
        } as any)
      })

      setStats({
        products: productsSnap.size,
        websiteOrders,
        externalOrders,
        gifts: giftsSnap.size,
        revenue,
      })

      const sortedOrders = ordersList.sort((a: any, b: any) => {
        const timeA = a._timestamp?.seconds ? a._timestamp.seconds : 0
        const timeB = b._timestamp?.seconds ? b._timestamp.seconds : 0
        return timeB - timeA
      }).slice(0, 5)

      setRecentOrders(sortedOrders)
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>
  }

  return (
    <div>
      <div className="admin-page-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Overview of your store performance</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="admin-btn-primary">
          + Add External Order
        </button>
      </div>

      <div className="admin-stats-grid">
        <StatsCard label="Website Orders" value={stats.websiteOrders} />
        <StatsCard label="External Orders" value={stats.externalOrders} color="#1565C0" />
        <StatsCard label="Gift Requests" value={stats.gifts} color="#7B1FA2" />
        <StatsCard label="Total Revenue" value={formatPrice(stats.revenue)} color="#C65A2E" />
      </div>

      <h2 className="admin-section-title">Recent Orders</h2>

      <DataTable
        columns={[
          { key: 'id', label: 'Order ID', render: (v: string) => <span className="admin-mono">{v.slice(0, 8).toUpperCase()}</span> },
          { key: 'customerName', label: 'Customer' },
          { key: 'total', label: 'Total', render: (v: number) => formatPrice(v) },
          { key: 'source', label: 'Source', render: (v: string) => (
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              padding: '3px 8px', 
              borderRadius: '6px', 
              background: v === 'external' ? '#E3F2FD' : '#E8F5E9', 
              color: v === 'external' ? '#1565C0' : '#2E7D32' 
            }}>
              {v === 'external' ? 'External' : 'Website'}
            </span>
          )},
          { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
          { key: 'createdAt', label: 'Date' },
        ]}
        data={recentOrders}
        onRowClick={(row) => setSelectedOrderId(row.id)}
      />

      <OrderModal orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
      <AddOrderModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdded={fetchData} />
    </div>
  )
}