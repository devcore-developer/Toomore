'use client'

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react'

interface PremiumCarouselProps {
  children: ReactNode[]
  autoplayInterval?: number
  className?: string
}

export default function PremiumCarousel({
  children,
  autoplayInterval = 4500,
  className = '',
}: PremiumCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = children.length
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)
  const isDragging = useRef(false)
  const pausedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const next = useCallback(() => {
    setIndex(i => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + total) % total)
  }, [total])

  const pause = useCallback(() => {
    pausedRef.current = true
    if (resumeRef.current) clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => {
      pausedRef.current = false
    }, 5000)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next()
    }, autoplayInterval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (resumeRef.current) clearTimeout(resumeRef.current)
    }
  }, [next, autoplayInterval])

  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX
    isDragging.current = true
    pause()
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    dragDelta.current = e.touches[0].clientX - dragStartX.current
  }

  const onTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if (Math.abs(dragDelta.current) > 50) {
      dragDelta.current > 0 ? prev() : next()
    }
    dragDelta.current = 0
  }

  const onMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX
    isDragging.current = true
    pause()
    e.preventDefault()
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if (Math.abs(dragDelta.current) > 50) {
      dragDelta.current > 0 ? prev() : next()
    }
    dragDelta.current = 0
  }

  const onMouseLeave = () => {
    isDragging.current = false
    dragDelta.current = 0
  }

  const getPos = (i: number) => {
    let diff = i - index
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    if (diff === 0) return 'center'
    if (diff === -1) return 'left'
    if (diff === 1) return 'right'
    return 'hidden'
  }

  return (
    <div
      className={`premium-carousel ${className}`}
      onMouseEnter={pause}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="premium-carousel-stage">
        {children.map((child, i) => (
          <div
            className="premium-carousel-slide"
            data-position={getPos(i)}
            key={i}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}