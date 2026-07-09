'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const pauseRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragStartX = useRef(0)
  const dragCurrentX = useRef(0)
  const isDragging = useRef(false)

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

  const total = testimonials.length

  const goNext = useCallback(() => {
    if (total === 0) return
    setActiveIndex(i => (i + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    if (total === 0) return
    setActiveIndex(i => (i - 1 + total) % total)
  }, [total])

  const pause = useCallback(() => {
    pauseRef.current = true
    if (resumeRef.current) clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => {
      pauseRef.current = false
    }, 5000)
  }, [])

  useEffect(() => {
    if (total === 0) return
    timerRef.current = setInterval(() => {
      if (!pauseRef.current) goNext()
    }, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (resumeRef.current) clearTimeout(resumeRef.current)
    }
  }, [goNext, total])

  const getPos = (i: number) => {
    let diff = i - activeIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    if (diff === 0) return 'center'
    if (diff === -1) return 'left'
    if (diff === 1) return 'right'
    return 'hidden'
  }

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX
    dragCurrentX.current = 0
    isDragging.current = true
    pause()
  }

  const handleDragMove = (clientX: number, element: HTMLElement) => {
    if (!isDragging.current) return
    dragCurrentX.current = clientX - dragStartX.current
    element.style.transform = `translateX(${dragCurrentX.current}px)`
  }

  const handleDragEnd = (clientX: number, element: HTMLElement) => {
    if (!isDragging.current) return
    isDragging.current = false
    element.style.transform = ''
    const diff = clientX - dragStartX.current
    if (Math.abs(diff) > 50) {
      diff > 0 ? goPrev() : goNext()
    }
  }

  if (loading) return null
  if (testimonials.length === 0) return null

  const active = testimonials[activeIndex]

  return (
    <section className="testimonials-section">

      {/* ===== MOBILE VERSION ===== */}
      <div className="test-mob">
        <FadeIn>
          <SectionTitle
            tag="Testimonials"
            title="What People Say"
            subtitle="Real experiences from our community of date lovers."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="test-mob-card-wrap"
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.currentTarget)}
            onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, e.currentTarget)}
            onMouseDown={(e) => {
              e.preventDefault()
              handleDragStart(e.clientX)
            }}
            onMouseMove={(e) => handleDragMove(e.clientX, e.currentTarget)}
            onMouseUp={(e) => handleDragEnd(e.clientX, e.currentTarget)}
            onMouseLeave={(e) => {
              if (isDragging.current) {
                isDragging.current = false
                e.currentTarget.style.transform = ''
              }
            }}
          >
            <div className="test-mob-card">
              <div className="test-mob-stars">
                {'★'.repeat(active.rating)}{'☆'.repeat(5 - active.rating)}
              </div>
              <span className="test-mob-quote">&ldquo;</span>
              <p className="test-mob-text">&ldquo;{active.text}&rdquo;</p>
              <div className="test-mob-author">
                <strong className="test-mob-name">{active.name}</strong>
                <span className="test-mob-verified">Verified Customer</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="test-mob-dots">
          {testimonials.slice(0, 4).map((t, i) => (
            <button
              key={`dot-${t.id}`}
              className={`test-mob-dot${i === activeIndex ? ' test-mob-dot--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ===== DESKTOP VERSION ===== */}
      <div className="test-desktop">
        <SectionTitle
          tag="Testimonials"
          title="What People Say"
          subtitle="Real experiences from our community of date lovers."
        />

        <div
          className="test-carousel"
          onMouseEnter={pause}
        >
          {/* Left Arrow */}
          <button className="test-arrow test-arrow--l" onClick={goPrev} aria-label="Previous testimonial">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>

          {/* Cards Stage */}
          <div className="test-carousel-stage">
            {testimonials.map((t, i) => (
              <div
                className="test-carousel-slide"
                data-position={getPos(i)}
                key={t.id}
              >
                <div className="test-card test-card--premium">
                  <div className="test-stars">
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <span className="test-deco-quote">&ldquo;</span>
                  <p className="test-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="test-author">
                    <strong>{t.name}</strong>
                    <span>Verified Customer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="test-arrow test-arrow--r" onClick={goNext} aria-label="Next testimonial">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="test-desktop-dots">
          {testimonials.slice(0, 4).map((t, i) => (
            <button
              key={`dd-${t.id}`}
              className={`test-desktop-dot${i === activeIndex ? ' test-desktop-dot--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}