'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  desktopCols?: number
  mobileCardWidth?: string
}

export default function ScrollSnapCarousel({
  children,
  className = '',
  desktopCols = 4,
  mobileCardWidth = '68vw',
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)

  const check = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isDesktop) {
      check()
      const el = trackRef.current
      el?.addEventListener('scroll', check, { passive: true })
      const ro = new ResizeObserver(check)
      el && ro.observe(el)
      return () => { el?.removeEventListener('scroll', check); ro.disconnect() }
    }
  }, [check, isDesktop])

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' })
  }

  return (
    <div
      className={`snap-carousel ${className}`}
      style={{ '--snap-cols': desktopCols, '--snap-card-w': mobileCardWidth } as React.CSSProperties}
    >
      <div ref={trackRef} className="snap-carousel-track">
        {children}
      </div>
      {isDesktop && canLeft && (
        <button className="snap-arrow snap-arrow--l" onClick={() => scroll('left')} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
      {isDesktop && canRight && (
        <button className="snap-arrow snap-arrow--r" onClick={() => scroll('right')} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
    </div>
  )
}