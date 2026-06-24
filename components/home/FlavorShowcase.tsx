import FadeIn from '@/components/shared/FadeIn'

const flavors = [
  { name: 'Hazelnut Chocolate', x: '12.5%' },
  { name: 'Dark Mocha', x: '37.5%' },
  { name: 'White Mocha', x: '62.5%' },
  { name: 'Peanut Butter', x: '87.5%' },
]

export default function FlavorShowcase() {
  return (
    <section className="flavor-showcase-section">
      <div className="flavor-showcase-img-wrap">
        <FadeIn>
          <img
            src="/images/flavors-showcase.png"
            alt="TOOMORE Stuffed Medjool Dates Flavors"
            className="flavor-showcase-img"
          />
        </FadeIn>
        {flavors.map((f, i) => (
          <FadeIn key={f.name} delay={0.1 + i * 0.08}>
            <div className="flavor-label" style={{ left: f.x }}>
              {f.name}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}