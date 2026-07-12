'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Image from 'next/image'
import FlavorPickerModal from '@/components/shared/FlavorPickerModal'
import PremiumCarousel from '@/components/shared/PremiumCarousel'

const fallbackImages: Record<string, string> = {
  signature: '/images/1.png',
  mixed: '/images/2.png',
  gift: '/images/3.png',
}

const bgClasses = ['cream', 'mid', 'dark']

interface BoxData {
  id: string
  title: string
  pieces: number
  description: string
  price: number
  image: string | null
  bgClass: string
}

function BoxCard({ box, onSelect, zoomOut }: { box: BoxData; onSelect: () => void; zoomOut?: boolean }) {
  return (
    <div className="box-card">
      <div className={`box-img ${box.bgClass}`}>
        {box.image ? (
          <Image
            src={box.image}
            alt={box.title}
            fill
            className={`box-product-img${zoomOut ? ' box-product-img--zoom-out' : ''}`}
            loading="lazy"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <span style={{ fontSize: 12, color: '#0F4C3A', letterSpacing: 1 }}>{box.title}</span>
          </div>
        )}
      </div>
      <div className="box-card-body">
        <h3 className="box-card-title">{box.title}</h3>
        <p className="box-card-desc">{box.description}</p>
        <div className="box-card-footer">
          <span className="box-price">{box.price} EGP</span>
          <button className="btn-sm" onClick={onSelect}>Customize & Add</button>
        </div>
      </div>
    </div>
  )
}

export default function MixedBoxes() {
  const { products, loading } = useProducts('all')
  const [selectedBox, setSelectedBox] = useState<BoxData | null>(null)

  const boxes: BoxData[] = products
    .filter((p: any) => !p.isBestSeller)
    .sort((a: any, b: any) => (a.pieces || 0) - (b.pieces || 0))
    .map((p: any, i: number) => ({
      id: p.id,
      title: p.name,
      pieces: p.pieces || 0,
      description: p.description || '',
      price: p.price || 0,
      image: p.image || fallbackImages[p.category] || null,
      bgClass: bgClasses[i % bgClasses.length],
    }))

  if (loading) {
    return (
      <section className="mixed-section">
        <SectionTitle
          tag="Collections"
          title="Mixed Box Collections"
          subtitle="Discover our range of thoughtfully curated date boxes — each one a unique experience."
        />
        <p className="admin-loading">Loading...</p>
      </section>
    )
  }

  return (
    <section className="mixed-section">
      <SectionTitle
        tag="Collections"
        title="Mixed Box Collections"
        subtitle="Discover our range of thoughtfully curated date boxes — each one a unique experience."
      />

      {/* ===== DESKTOP GRID ===== */}
      <div className="boxes-grid boxes-grid--3 boxes-desktop">
        {boxes.map((box, i) => (
          <FadeIn key={box.id} delay={i * 0.1}>
            <BoxCard box={box} onSelect={() => setSelectedBox(box)} zoomOut={i === 3} />
          </FadeIn>
        ))}
      </div>

      {/* ===== MOBILE CAROUSEL ===== */}
      <div className="boxes-mob">
        <PremiumCarousel autoplayInterval={2500}>
          {boxes.map((box, i) => (
            <BoxCard key={`mob-${box.id}`} box={box} onSelect={() => setSelectedBox(box)} zoomOut={i === 3} />
          ))}
        </PremiumCarousel>
      </div>

      {selectedBox && (
        <FlavorPickerModal
          box={selectedBox}
          onClose={() => setSelectedBox(null)}
        />
      )}
    </section>
  )
}