'use client'

import { useState, useEffect } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

interface Testimonial {
  id: string
  name: string
  title?: string
  text: string
  rating: number
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setTestimonials([])
        setLoading(false)
      })
  }, [])

  if (loading) return null

  return (
    <section className="testimonials-section">
      <SectionTitle
        tag="Testimonials"
        title="What People Say"
        subtitle="Real experiences from our community of date lovers."
      />
      <div className="test-grid">
        {testimonials.slice(0, 4).map((t, i) => (
          <FadeIn key={t.id} delay={i * 0.1}>
            <div className="test-card">
              <div className="test-avatar">
                {t.name.charAt(0)}
              </div>
              <div className="stars">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="test-text">"{t.text}"</p>
              <div className="test-author">
                <strong>{t.name}</strong>
                {t.title && <span>{t.title}</span>}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}