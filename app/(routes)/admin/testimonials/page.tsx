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

  const handleDelete = async (id: string) => {
    if (!confirm('متأكد من الحذف؟')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    fetchAll()
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
                onClick={() => handleDelete(t.id)}
                className="admin-btn-danger-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}