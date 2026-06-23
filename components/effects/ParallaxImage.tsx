'use client'

import { useRef, useEffect, useState } from 'react'

interface ParallaxImageProps {
  src?: string
  alt?: string
  height?: number
  bgColor?: string
  children?: React.ReactNode
}

export default function ParallaxImage({
  alt = '',
  height = 400,
  bgColor = '#0F4C3A',
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollPercent = rect.top / window.innerHeight
      setOffset(scrollPercent * 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height,
        background: bgColor,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s linear',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}