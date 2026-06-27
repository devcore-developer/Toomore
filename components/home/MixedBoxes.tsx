import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Image from 'next/image'

const boxes = [
  {
    title: 'Dark Indulgence',
    description: 'Rich 70% dark chocolate coatings paired with roasted pistachio and tahini cream fillings.',
    price: '320 EGP',
    image: '/images/1.png',       // ← صورة البوكس
    bgClass: 'dark',
  },
  {
    title: 'Classic Collection',
    description: 'A beloved selection of our classic milk chocolate and white chocolate stuffed dates.',
    price: '280 EGP',
    image: '/images/2.png',    // ← صورة البوكس
    bgClass: 'cream',
  },
  {
    title: 'The Gift Box',
    description: 'Luxury presentation box with a curated mix of 24 dates — perfect for gifting.',
    price: '580 EGP',
    image: '/images/3.png',       // ← صورة البوكس
    bgClass: 'mid',
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
                {/* ← الصورة بدل الـ mini-box */}
                <Image
                  src={box.image}
                  alt={box.title}
                  width={240}
                  height={240}
                  className="box-product-img"
                />
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