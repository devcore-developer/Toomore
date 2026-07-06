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
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyProduct)
  const [flavorInput, setFlavorInput] = useState('')
  const [saving, setSaving] = useState(false)

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
      price: product.price,
      flavors: product.flavors,
      category: product.category,
      pieces: product.pieces,
      isBestSeller: product.isBestSeller,
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

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"?`)) return
    try {
      await deleteDoc(doc(db, 'products', product.id))
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert('Error deleting product')
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
          if (_ === 'delete') handleDelete(row)
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
              {form.flavors.map((f, i) => (
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
    </div>
  )
}