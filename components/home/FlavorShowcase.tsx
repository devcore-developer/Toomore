import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const flavors = [
  {
    name: 'Hazelnut Chocolate',
    description: 'Creamy hazelnut blended with rich milk chocolate for a velvety finish.',
    image: '/images/flavor-hazelnut.png',
  },
  {
    name: 'Dark Mocha',
    description: 'Deep 70% dark chocolate meets aromatic espresso in every bite.',
    image: '/images/flavor-mocha.png',
  },
  {
    name: 'White Mocha',
    description: 'Smooth white chocolate with a hint of coffee, delicate and sweet.',
    image: '/images/flavor-white.png',
  },
  {
    name: 'Peanut Butter',
    description: 'Roasted peanut butter filling coated in premium milk chocolate.',
    image: '/images/flavor-peanut.png',
  },
]

export default function FlavorShowcase() {
  return (
    <section className="flavor-showcase-section">
      <SectionTitle
        tag="Our Flavors"
        title="Exceptional Flavors, Perfectly Crafted."
        subtitle="Each date is hand-filled and coated with the finest chocolates, creating a symphony of flavors in every bite."
      />
      <div className="flavors-grid">
        {flavors.map((f, i) => (
          <FadeIn key={f.name} delay={i * 0.1}>
            <div className="flavor-card">
              <div className="flavor-card-img">
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                />
              </div>
              <div className="flavor-card-body">
                <h3 className="flavor-card-name">{f.name}</h3>
                <p className="flavor-card-desc">{f.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}