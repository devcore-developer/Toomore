'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import DataTable from '@/components/admin/DataTable'
import AdminModal from '@/components/admin/Modal'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  flavors: [],
  category: 'signature',
  pieces: 12,
  isBestSeller: false,
  image: '',
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyProduct)
  const [flavorInput, setFlavorInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)

  const fetchProducts = async () => {
    try {
      const snap = await getDocs(collection(db, 'products'))
      const list: Product[] = []
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Product))
      setProducts(list)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImg(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      setForm((prev) => ({ ...prev, image: data.url }))
    } catch (err) {
      console.error('Image upload error:', err)
      alert('Error uploading image. You can try again or add the URL manually.')
    } finally {
      setUploadingImg(false)
      e.target.value = ''
    }
  }

  const openNew = () => {
    setEditing(null)
    setForm(emptyProduct)
    setFlavorInput('')
    setModalOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name,
      description: product.description,
      price: Number(product.price) || 0,
      flavors: Array.isArray(product.flavors) ? product.flavors : [],
      category: product.category || 'signature',
      pieces: Number(product.pieces) || 12,
      isBestSeller: product.isBestSeller || false,
      image: product.image || '',
    })
    setFlavorInput('')
    setModalOpen(true)
  }

  const addFlavor = () => {
    if (flavorInput.trim()) {
      setForm({ ...form, flavors: [...form.flavors, flavorInput.trim()] })
      setFlavorInput('')
    }
  }

  const removeFlavor = (i: number) => {
    setForm({ ...form, flavors: form.flavors.filter((_, idx) => idx !== i) })
  }

  const handleSave = async () => {
    if (!form.name) return
    setSaving(true)
    try {
      if (editing) {
        await updateDoc(doc(db, 'products', editing.id), form)
      } else {
        await addDoc(collection(db, 'products'), form)
      }
      setModalOpen(false)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert('Error saving product')
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteDoc(doc(db, 'products', deleteTarget.id))
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
      alert('Error deleting product')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <div className="admin-loading">Loading products...</div>

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">Manage your product catalog</p>
        </div>
        <button onClick={openNew} className="admin-btn-primary">
          + Add Product
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category', render: (v) => <span style={{ textTransform: 'capitalize' }}>{v}</span> },
          { key: 'price', label: 'Price', render: (v) => formatPrice(v) },
          { key: 'pieces', label: 'Pieces' },
          { key: 'isBestSeller', label: 'Best Seller', render: (v) => v ? '★ Yes' : '—' },
        ]}
        data={products}
        onAction={(_, row) => {
          if (_ === 'edit') openEdit(row)
          if (_ === 'delete') setDeleteTarget(row)
        }}
        actions={[
          { label: 'Edit', value: 'edit' },
          { label: 'Delete', value: 'delete', color: '#C62828' },
        ]}
      />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Product' : 'New Product'}>
        <div className="admin-form">
          <div className="admin-form-field">
            <label className="admin-form-label">Product Name</label>
            <input
              className="admin-form-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. The Signature Collection"
            />
          </div>
          <div className="admin-form-field">
            <label className="admin-form-label">Description</label>
            <textarea
              className="admin-form-input admin-form-textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Product description..."
            />
          </div>
          <div className="admin-form-field">
            <label className="admin-form-label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="admin-form-input"
              style={{ padding: '8px 12px' }}
            />
            {form.image && (
              <div style={{ marginTop: 12, position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', background: '#f5f5f5' }}>
                <img
                  src={form.image}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image: '' })}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    color: '#fff',
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            )}
            {uploadingImg && (
              <p style={{ marginTop: 8, fontSize: 13, color: '#6b7280' }}>Uploading image...</p>
            )}
          </div>
          <div className="admin-form-row">
            <div className="admin-form-field">
              <label className="admin-form-label">Price (EGP)</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Pieces</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.pieces}
                onChange={(e) => setForm({ ...form, pieces: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="admin-form-field">
            <label className="admin-form-label">Category</label>
            <select
              className="admin-form-input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as any })}
            >
              <option value="signature">Signature</option>
              <option value="mixed">Mixed</option>
              <option value="gift">Gift</option>
            </select>
          </div>
          <label className="admin-form-checkbox">
            <input
              type="checkbox"
              checked={form.isBestSeller || false}
              onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
            />
            Best Seller
          </label>
          <div className="admin-form-field">
            <label className="admin-form-label">Flavors</label>
            <div className="admin-flavor-add">
              <input
                className="admin-form-input"
                value={flavorInput}
                onChange={(e) => setFlavorInput(e.target.value)}
                placeholder="Add flavor..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavor())}
              />
              <button type="button" onClick={addFlavor} className="admin-flavor-add-btn">
                Add
              </button>
            </div>
            <div className="admin-flavor-tags">
              {(Array.isArray(form.flavors) ? form.flavors : []).map((f, i) => (
                <span key={i} className="admin-flavor-tag">
                  {f}
                  <button onClick={() => removeFlavor(i)} className="admin-flavor-remove" aria-label={`Remove ${f}`}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !form.name}
            className="admin-form-submit"
          >
            {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </AdminModal>

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
              Delete Product?
            </h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.6 }}>
              <strong style={{ color: '#1a1a1a' }}>{deleteTarget.name}</strong> will be permanently removed. This action cannot be undone.
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