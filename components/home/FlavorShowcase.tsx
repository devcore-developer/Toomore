'use client'

import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import { FLAVORS } from '@/lib/constants'

interface FlavorShowcaseProps {
  tag?: string
  title?: string
  subtitle?: string
  onFlavorClick?: (flavor: typeof FLAVORS[number]) => void
}

export default function FlavorShowcase({
  tag = 'Our Flavors',
  title = 'Exceptional Flavors, Perfectly Crafted.',
  subtitle = 'Choose your favorite handcrafted Medjool date flavor.',
  onFlavorClick
}: FlavorShowcaseProps) {
  const Wrapper = ({ flavor, children }: { flavor: typeof FLAVORS[number]; children: React.ReactNode }) => {
    if (onFlavorClick) {
      return (
        <div onClick={() => onFlavorClick(flavor)} style={{ cursor: 'pointer' }}>
          {children}
        </div>
      )
    }
    return <a href="/shop" style={{ textDecoration: 'none' }}>{children}</a>
  }

  return (
    <section className="flavor-showcase-section">
      <SectionTitle tag={tag} title={title} subtitle={subtitle} />
      <div className="flavors-grid">
        {FLAVORS.map((f, i) => (
          <FadeIn key={f.name} delay={i * 0.1}>
            <Wrapper flavor={f}>
              <div className="flavor-card">
                <div className="flavor-card-img">
                  <div className="flavor-card-img-light" />
                  <img src={f.image} alt={f.name} loading="lazy" />
                  <div className="flavor-card-img-shadow" />
                </div>
                <div className="flavor-card-body">
                  <span className="flavor-badge">{f.badge}</span>
                  <h3 className="flavor-card-name">{f.name}</h3>
                  <p className="flavor-card-desc">{f.description}</p>
                  <span className="flavor-type">{f.type}</span>
                </div>
              </div>
            </Wrapper>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}