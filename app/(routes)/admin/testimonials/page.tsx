'use client'

import { useState, useEffect } from 'react'
import StatusBadge from '@/components/admin/StatusBadge'

interface Testimonial {
  id: string
  name: string
  title: string
  text: string
  rating: number
  active: boolean
  createdAt: string
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', title: '', text: '', rating: 5 })
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchAll = async () => {
    const res = await fetch('/api/testimonials/all')
    const data = await res.json()
    setTestimonials(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ name: '', title: '', text: '', rating: 5 })
    setSubmitting(false)
    fetchAll()
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/testimonials/${deleteTarget.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
      alert('Error deleting testimonial')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="admin-testimonials-page">
      <h1 className="admin-page-title">إدارة التقييمات</h1>
      <p className="admin-page-sub">أضف تقييمات العملاء اللي هتظهر في الصفحة الرئيسية</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="admin-testimonials-form">
        <div className="admin-form-row">
          <input
            placeholder="Name *"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="admin-form-input"
          />
          <input
            placeholder="Job Title (Optional)"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="admin-form-input"
          />
        </div>
        <textarea
          placeholder="Testimonial Text *"
          value={form.text}
          onChange={e => setForm({ ...form, text: e.target.value })}
          required
          rows={3}
          className="admin-form-input admin-form-textarea"
        />
        <div className="admin-rating-picker">
          <span className="admin-rating-label">Rating:</span>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              onClick={() => setForm({ ...form, rating: star })}
              className={`admin-star-btn${star <= form.rating ? ' admin-star-btn--active' : ''}`}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="admin-form-submit"
        >
          {submitting ? 'Adding...' : 'Add Testimonial'}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p className="admin-loading">Loading...</p>
      ) : (
        <div className="admin-testimonials-list">
          {testimonials.length === 0 && (
            <p className="admin-empty-state">
              No testimonials yet — Add the first testimonial from the form above
            </p>
          )}
          {testimonials.map(t => (
            <div key={t.id} className="admin-testimonial-card">
              <div className="admin-testimonial-content">
                <div className="admin-testimonial-meta">
                  <strong>{t.name}</strong>
                  {t.title && <span>— {t.title}</span>}
                  <span className="admin-testimonial-stars">
                    {'★'.repeat(t.rating)}
                  </span>
                </div>
                <p className="admin-testimonial-text">&ldquo;{t.text}&rdquo;</p>
              </div>
              <button
                onClick={() => setDeleteTarget(t)}
                className="admin-btn-danger-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

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
              Delete Testimonial?
            </h3>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.6 }}>
              Testimonial by <strong style={{ color: '#1a1a1a' }}>{deleteTarget.name}</strong> will be permanently removed. This action cannot be undone.
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