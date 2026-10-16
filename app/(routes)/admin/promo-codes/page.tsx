'use client'

import { useState, useEffect } from 'react'
import DataTable from '@/components/admin/DataTable'
import AdminModal from '@/components/admin/Modal'

const emptyPromo = {
  code: '',
  discountValue: 10,
  isActive: true,
  validFrom: '',
  validUntil: '',
  maxUses: 0,
  minOrderAmount: 0,
  maxDiscountAmount: 0,
}

export default function AdminPromoCodesPage() {
  const [promos, setPromos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState(emptyPromo)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchPromos = async () => {
    try {
      const res = await fetch('/api/promo-codes')
      const data = await res.json()
      setPromos(data.promoCodes || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPromos() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyPromo)
    setModalOpen(true)
  }

  const openEdit = (promo: any) => {
    setEditing(promo)
    setForm({
      code: promo.code || '',
      discountValue: promo.discountValue || 0,
      isActive: promo.isActive ?? true,
      validFrom: promo.validFrom ? new Date(promo.validFrom).toISOString().split('T')[0] : '',
      validUntil: promo.validUntil ? new Date(promo.validUntil).toISOString().split('T')[0] : '',
      maxUses: promo.maxUses || 0,
      minOrderAmount: promo.minOrderAmount || 0,
      maxDiscountAmount: promo.maxDiscountAmount || 0,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.code) return
    setSaving(true)
    try {
      const validFrom = form.validFrom ? new Date(form.validFrom).toISOString() : ''
      const validUntil = form.validUntil ? new Date(form.validUntil).toISOString() : ''
      
      const payload = {
        id: editing?.id,
        code: form.code.toUpperCase().trim(),
        discountValue: Number(form.discountValue),
        isActive: form.isActive,
        validFrom,
        validUntil,
        maxUses: Number(form.maxUses),
        minOrderAmount: Number(form.minOrderAmount),
        maxDiscountAmount: Number(form.maxDiscountAmount),
      }

      const res = await fetch('/api/promo-codes', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to save')
      
      setModalOpen(false)
      fetchPromos()
    } catch (err) {
      console.error(err)
      alert('Error saving promo code')
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await fetch(`/api/promo-codes?id=${deleteTarget.id}`, { method: 'DELETE' })
      setPromos((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
      alert('Error deleting promo code')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <div className="admin-loading">Loading promo codes...</div>

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Promo Codes</h1>
          <p className="admin-page-sub">Manage discount codes</p>
        </div>
        <button onClick={openNew} className="admin-btn-primary">
          + Add Promo Code
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'code', label: 'Code', render: (v) => <span className="admin-mono">{v}</span> },
          { key: 'discountValue', label: 'Discount', render: (v) => `${v}%` },
          { key: 'usedCount', label: 'Used', render: (v) => v || 0 },
          { key: 'maxUses', label: 'Max Uses', render: (v) => v || '∞' },
          { key: 'isActive', label: 'Status', render: (v) => v ? 'Active' : 'Inactive' },
        ]}
        data={promos}
        onAction={(_, row) => {
          if (_ === 'edit') openEdit(row)
          if (_ === 'delete') setDeleteTarget(row)
        }}
        actions={[
          { label: 'Edit', value: 'edit' },
          { label: 'Delete', value: 'delete', color: '#C62828' },
        ]}
      />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Promo Code' : 'New Promo Code'}>
        <div className="admin-form">
          <div className="admin-form-field">
            <label className="admin-form-label">Code</label>
            <input
              className="admin-form-input"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="e.g. TOOMORE15"
              disabled={!!editing}
            />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-field">
              <label className="admin-form-label">Discount %</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.discountValue}
                onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Max Uses (0 = Unlimited)</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.maxUses}
                onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-field">
              <label className="admin-form-label">Min Order Amount (0 = None)</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.minOrderAmount}
                onChange={(e) => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Max Discount Cap (0 = None)</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.maxDiscountAmount}
                onChange={(e) => setForm({ ...form, maxDiscountAmount: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-field">
              <label className="admin-form-label">Valid From (Optional)</label>
              <input
                type="date"
                className="admin-form-input"
                value={form.validFrom}
                onChange={(e) => setForm({ ...form, validFrom: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Valid Until (Optional)</label>
              <input
                type="date"
                className="admin-form-input"
                value={form.validUntil}
                onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
              />
            </div>
          </div>
          <label className="admin-form-checkbox">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>
          <button
            onClick={handleSave}
            disabled={saving || !form.code}
            className="admin-form-submit"
          >
            {saving ? 'Saving...' : editing ? 'Update Code' : 'Create Code'}
          </button>
        </div>
      </AdminModal>

      {deleteTarget && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 300, padding: 20,
          }}
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 16, padding: '32px', maxWidth: 400, width: '100%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
              Delete Promo Code?
            </h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.6 }}>
              <strong style={{ color: '#1a1a1a' }}>{deleteTarget.id}</strong> will be permanently removed.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setDeleteTarget(null)} disabled={deleting} style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting} style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: 'none', background: deleting ? '#f87171' : '#DC2626', color: '#fff', fontSize: 14, fontWeight: 500, cursor: deleting ? 'not-allowed' : 'pointer' }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}