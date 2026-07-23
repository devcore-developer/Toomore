'use client'

import { useState } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import { useCMS } from '@/hooks/useCMS'
import { CMS_DEFAULTS } from '@/lib/cms-config'

const DEFAULT_FLAVORS = [
  { name: 'Hazelnut Chocolate', image: '/images/flavor-hazelnut.png', desc: 'Milk chocolate filled with roasted hazelnut cream.', badge: 'BEST SELLER', type: 'Milk Chocolate' },
  { name: 'Dark Mocha', image: '/images/flavor-mocha.png', desc: 'Dark chocolate blended with coffee & cocoa.', badge: 'SIGNATURE', type: 'Dark Chocolate' },
  { name: 'White Mocha', image: '/images/flavor-white.png', desc: 'Creamy white chocolate with hazelnut coffee.', badge: 'NEW', type: 'White Chocolate' },
  { name: 'Peanut Butter', image: '/images/flavor-peanut.png', desc: 'Milk chocolate with peanut butter & crunch.', badge: 'LIMITED', type: 'Crunchy' },
]

interface FlavorShowcaseProps {
  tag?: string
  title?: string
  subtitle?: string
  onFlavorClick?: (flavor: any) => void
}

export default function FlavorShowcase({
  tag = 'Our Flavors',
  title = 'Exceptional Flavors, Perfectly Crafted.',
  subtitle = 'Choose your favorite handcrafted Medjool date flavor.',
  onFlavorClick
}: FlavorShowcaseProps) {
  const { getArray } = useCMS()
  const flavors = getArray('flavors', DEFAULT_FLAVORS)

  return (
    <section className="flavor-showcase-section">
      <SectionTitle tag={tag} title={title} subtitle={subtitle} />
      <div className="flavors-grid">
        {flavors.map((f, i) => {
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (onFlavorClick) {
              return <div onClick={() => onFlavorClick(f)} style={{ cursor: 'pointer' }}>{children}</div>
            }
            return <a href="/shop" style={{ textDecoration: 'none' }}>{children}</a>
          }

          return (
            <FadeIn key={f.name} delay={i * 0.1}>
              <Wrapper>
                <div className="flavor-card">
                  <div className="flavor-card-img">
                    <div className="flavor-card-img-light" />
                    <img src={f.image} alt={f.name} loading="lazy" />
                    <div className="flavor-card-img-shadow" />
                  </div>
                  <div className="flavor-card-body">
                    <span className="flavor-badge">{f.badge || 'NEW'}</span>
                    <h3 className="flavor-card-name">{f.name}</h3>
                    <p className="flavor-card-desc">{f.desc}</p>
                    <span className="flavor-type">{f.type || ''}</span>
                  </div>
                </div>
              </Wrapper>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}