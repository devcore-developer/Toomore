'use client'

import { useState } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Image from 'next/image'
import FlavorPickerModal from '@/components/shared/FlavorPickerModal'

const boxes = [
  {
    id: 'box-4',
    title: '4-Piece Package',
    pieces: 4,
    description: 'A perfect bite-sized introduction to our stuffed dates.',
    price: 160,
    image: '/images/1.png',
    bgClass: 'cream',
  },
  {
    id: 'box-12',
    title: '12-Piece Package',
    pieces: 12,
    description: 'A generous assortment for you or to share.',
    price: 400,
    image: '/images/2.png',
    bgClass: 'mid',
  },
  {
    id: 'box-16',
    title: '16-Piece Package',
    pieces: 16,
    description: 'The ultimate experience, fully customized to your taste.',
    price: 520,
    image: '/images/3.png',
    bgClass: 'dark',
  },
]

export default function MixedBoxes() {
  const [selectedBox, setSelectedBox] = useState<typeof boxes[0] | null>(null)

  return (
    <section className="mixed-section">
      <SectionTitle
        tag="Collections"
        title="Mixed Box Collections"
        subtitle="Discover our range of thoughtfully curated date boxes — each one a unique experience."
      />
      <div className="boxes-grid boxes-grid--3">
        {boxes.map((box, i) => (
          <FadeIn key={box.id} delay={i * 0.1}>
            <div className="box-card">
              <div className={`box-img ${box.bgClass}`}>
                <Image
                  src={box.image}
                  alt={box.title}
                  fill
                  className="box-product-img"
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="box-card-body">
                <h3 className="box-card-title">{box.title}</h3>
                <p className="box-card-desc">{box.description}</p>
                <div className="box-card-footer">
                  <span className="box-price">{box.price} EGP</span>
                  <button className="btn-sm" onClick={() => setSelectedBox(box)}>Customize & Add</button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
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