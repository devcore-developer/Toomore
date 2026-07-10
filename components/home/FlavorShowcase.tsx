import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const flavors = [
  {
    name: 'Hazelnut Chocolate',
    description: 'Milk chocolate filled with roasted hazelnut cream.',
    image: '/images/flavor-hazelnut.png',
    badge: 'BEST SELLER',
    type: 'Milk Chocolate',
    nameClass: 'flavor-name-sm',
  },
  {
    name: 'Dark Mocha',
    description: 'Dark chocolate blended with coffee & cocoa.',
    image: '/images/flavor-mocha.png',
    badge: 'SIGNATURE',
    type: 'Dark Chocolate',
  },
  {
    name: 'White Mocha',
    description: 'Creamy white chocolate with hazelnut coffee.',
    image: '/images/flavor-white.png',
    badge: 'NEW',
    type: 'White Chocolate',
  },
  {
    name: 'Peanut Butter',
    description: 'Milk chocolate with peanut butter & crunch.',
    image: '/images/flavor-peanut.png',
    badge: 'LIMITED',
    type: 'Crunchy',
  },
]

export default function FlavorShowcase() {
  return (
    <section className="flavor-showcase-section">
      <SectionTitle
        tag="Our Flavors"
        title="Exceptional Flavors, Perfectly Crafted."
        subtitle="Choose your favorite handcrafted Medjool date flavor."
      />
      <div className="flavors-grid">
        {flavors.map((f, i) => (
          <FadeIn key={f.name} delay={i * 0.1}>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <div className="flavor-card">
                <div className="flavor-card-img">
                  <div className="flavor-card-img-light" />
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                  />
                  <div className="flavor-card-img-shadow" />
                </div>
                <div className="flavor-card-body">
                  <span className="flavor-badge">{f.badge}</span>
                  <h3 className={`flavor-card-name ${f.nameClass || ''}`}>{f.name}</h3>
                  <p className="flavor-card-desc">{f.description}</p>
                  <span className="flavor-type">{f.type}</span>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}