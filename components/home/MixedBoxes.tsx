import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const boxes = [
  {
    title: 'Dark Indulgence',
    description: 'Rich 70% dark chocolate coatings paired with roasted pistachio and tahini cream fillings.',
    price: '320 EGP',
    bgClass: 'dark',
    boxLabel: 'DARK',
    boxStyle: { background: 'rgba(183,138,82,0.2)', border: '1px solid rgba(183,138,82,0.3)' },
    labelColor: '#B78A52',
  },
  {
    title: 'Classic Collection',
    description: 'A beloved selection of our classic milk chocolate and white chocolate stuffed dates.',
    price: '280 EGP',
    bgClass: 'cream',
    boxLabel: 'CLASSIC',
    boxStyle: { background: 'rgba(14,91,79,0.08)', border: '1px solid rgba(14,91,79,0.12)' },
    labelColor: '#0E5B4F',
  },
  {
    title: 'The Gift Box',
    description: 'Luxury presentation box with a curated mix of 24 dates — perfect for gifting.',
    price: '580 EGP',
    bgClass: 'mid',
    boxLabel: 'GIFT',
    boxStyle: { background: 'rgba(183,138,82,0.15)', border: '1px solid rgba(183,138,82,0.25)' },
    labelColor: '#B78A52',
  },
]

export default function MixedBoxes() {
  return (
    <section className="mixed-section">
      <SectionTitle
        tag="Collections"
        title="Mixed Box Collections"
        subtitle="Discover our range of thoughtfully curated date boxes — each one a unique experience."
      />
      <div className="boxes-grid">
        {boxes.map((box, i) => (
          <FadeIn key={box.title} delay={i * 0.1}>
            <div className="box-card">
              <div className={`box-img ${box.bgClass}`}>
                <div className="mini-box" style={box.boxStyle}>
                  <span
                    className="heading"
                    style={{ fontSize: 10, color: box.labelColor, letterSpacing: '0.1em' }}
                  >
                    {box.boxLabel}
                  </span>
                </div>
              </div>
              <div className="box-card-body">
                <h3 className="box-card-title">{box.title}</h3>
                <p className="box-card-desc">{box.description}</p>
                <div className="box-card-footer">
                  <span className="box-price">{box.price}</span>
                  <button className="btn-sm">Shop Now</button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}