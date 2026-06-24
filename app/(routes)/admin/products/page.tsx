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
    setForm({ name: product.name, description: product.description, price: product.price, flavors: product.flavors, category: product.category, pieces: product.pieces, isBestSeller: product.isBestSeller })
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

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid rgba(14,91,79,0.12)',
    fontSize: 14,
    fontFamily: 'var(--font-inter), sans-serif' as const,
    outline: 'none',
    background: '#F9F6F0',
  }

  if (loading) return <div style={{ color: '#6A675F', padding: 40 }}>Loading products...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 32, fontWeight: 600, color: '#0E5B4F', marginBottom: 4 }}>
            Products
          </h1>
          <p style={{ fontSize: 14, color: '#6A675F' }}>Manage your product catalog</p>
        </div>
        <button
          onClick={openNew}
          style={{
            padding: '12px 24px',
            borderRadius: 12,
            border: 'none',
            background: '#0E5B4F',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Product Name</label>
            <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. The Signature Collection" />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Price (EGP)</label>
              <input type="number" style={inputStyle} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Pieces</label>
              <input type="number" style={inputStyle} value={form.pieces} onChange={(e) => setForm({ ...form, pieces: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Category</label>
            <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })}>
              <option value="signature">Signature</option>
              <option value="mixed">Mixed</option>
              <option value="gift">Gift</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isBestSeller || false} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} />
              Best Seller
            </label>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Flavors</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input style={{ ...inputStyle, flex: 1 }} value={flavorInput} onChange={(e) => setFlavorInput(e.target.value)} placeholder="Add flavor..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavor())} />
              <button type="button" onClick={addFlavor} style={{ padding: '0 16px', borderRadius: 10, border: '1px solid rgba(14,91,79,0.2)', background: 'none', cursor: 'pointer', color: '#0E5B4F', fontWeight: 600 }}>Add</button>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {form.flavors.map((f, i) => (
                <span key={i} style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(14,91,79,0.08)', color: '#0E5B4F', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {f}
                  <button onClick={() => removeFlavor(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C62828', fontSize: 14, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !form.name}
            style={{
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: (saving || !form.name) ? '#ccc' : '#0E5B4F',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: (saving || !form.name) ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              marginTop: 8,
            }}
          >
            {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </AdminModal>
    </div>
  )
}