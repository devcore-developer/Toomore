import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const flavors = [
  {
    name: 'Hazelnut Chocolate',
    description: 'Hazelnut chocolate coated with dark chocolate.',
    image: '/images/flavor-hazelnut.png',
  },
  {
    name: 'Dark Mocha',
    description: 'Coffee cream coated with dark chocolate.',
    image: '/images/flavor-mocha.png',
  },
  {
    name: 'White Mocha',
    description: 'Filling coffee cream coated with white chocolate.',
    image: '/images/flavor-white.png',
  },
  {
    name: 'Peanut Butter',
    description: 'Peanut butter coated with dark chocolate.',
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