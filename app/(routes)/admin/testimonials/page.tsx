'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: string
  name: string
  title: string
  text: string
  rating: number
  active: boolean
  createdAt: string
}

const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid rgba(14,91,79,0.12)',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  background: '#fff',
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
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8, color: '#0E5B4F', fontFamily: 'var(--font-heading)' }}>
        إدارة التقييمات
      </h1>
      <p style={{ fontSize: 14, color: '#6A675F', marginBottom: 32 }}>
        أضف تقييمات العملاء اللي هتظهر في الصفحة الرئيسية
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{
        background: '#fff', borderRadius: 16, padding: 24, marginBottom: 40,
        border: '1px solid rgba(14,91,79,0.12)', display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <input
            placeholder="Name *"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            placeholder="Job Title (Optional)"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />
        </div>
        <textarea
          placeholder="Testimonial Text *"
          value={form.text}
          onChange={e => setForm({ ...form, text: e.target.value })}
          required
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, color: '#6A675F' }}>Rating:</span>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              onClick={() => setForm({ ...form, rating: star })}
              style={{
                background: 'none', border: 'none', fontSize: 24, cursor: 'pointer',
                color: star <= form.rating ? '#B78A52' : '#ddd', padding: 0,
              }}
            >
              ★
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: '#0E5B4F', color: '#fff', border: 'none', borderRadius: 10,
            padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1, alignSelf: 'flex-start',
          }}
        >
          {submitting ? 'Adding...' : 'Add Testimonial'}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p style={{ color: '#6A675F', textAlign: 'center' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {testimonials.length === 0 && (
            <p style={{ color: '#6A675F', textAlign: 'center', padding: '40px 0' }}>
              No testimonials yet — Add the first testimonial from the form above
            </p>
          )}
          {testimonials.map(t => (
            <div key={t.id} style={{
              background: '#fff', borderRadius: 12, padding: 20,
              border: '1px solid rgba(14,91,79,0.12)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <strong style={{ fontSize: 15, color: '#1E1E1E' }}>{t.name}</strong>
                  {t.title && (
                    <span style={{ fontSize: 13, color: '#6A675F' }}>— {t.title}</span>
                  )}
                  <span style={{ color: '#B78A52', fontSize: 13, marginLeft: 'auto' }}>
                    {'★'.repeat(t.rating)}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#6A675F', lineHeight: 1.6 }}>
                  "{t.text}"
                </p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                style={{
                  background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8,
                  padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600, flexShrink: 0,
                }}
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