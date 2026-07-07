'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import StatsCard from '@/components/admin/StatsCard'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import { formatPrice } from '@/lib/utils'

interface Order {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
  // حفظ التاريخ الأصلي عشان الـ Sorting
  _timestamp: any 
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, gifts: 0, revenue: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const productsSnap = await getDocs(collection(db, 'products'))
        const ordersSnap = await getDocs(collection(db, 'orders'))
        const giftsSnap = await getDocs(collection(db, 'gifts'))

        let revenue = 0
        const ordersList: Order[] = []
        
        ordersSnap.forEach((doc) => {
          const d = doc.data()
          // ✅ تأكد إن الرقم عدد صحيح عشان الجدول يظبط
          revenue += Number(d.total) || 0
          
          ordersList.push({
            id: doc.id,
            customerName: d.customerName || 'N/A',
            total: Number(d.total) || 0,
            status: d.status || 'pending',
            // ✅ حفظ الـ Timestamp الأصلي قبل التحويل لـ String
            _timestamp: d.createdAt, 
            createdAt: d.createdAt 
              ? new Date(d.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) 
              : 'N/A',
          })
        })

        setStats({
          products: productsSnap.size,
          orders: ordersSnap.size,
          gifts: giftsSnap.size,
          revenue, // ✅ المبلغ هيطلع صح دلوقتي
        })

        // ✅ الـ Sorting بيحصل قبل التحويل لـ String وبيشتغل تمام
        const sortedOrders = ordersList.sort((a, b) => {
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
    fetchData()
  }, [])

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>
  }

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Overview of your store performance</p>

      <div className="admin-stats-grid">
        <StatsCard label="Total Products" value={stats.products} />
        <StatsCard label="Total Orders" value={stats.orders} />
        <StatsCard label="Gift Requests" value={stats.gifts} />
        <StatsCard label="Total Revenue" value={formatPrice(stats.revenue)} color="#C65A2E" />
      </div>

      <h2 className="admin-section-title">Recent Orders</h2>

      <DataTable
        columns={[
          { key: 'id', label: 'Order ID', render: (v: string) => <span className="admin-mono">{v.slice(0, 8).toUpperCase()}</span> },
          { key: 'customerName', label: 'Customer' },
          { key: 'total', label: 'Total', render: (v: number) => formatPrice(v) },
          { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
          { key: 'createdAt', label: 'Date' },
        ]}
        data={recentOrders}
      />
    </div>
  )
}