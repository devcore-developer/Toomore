import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Badge from '@/components/ui/Badge'

export default function BestSeller() {
  return (
    <section className="bestseller-section">
      <FadeIn>
        <div className="product-card-large">
          <div className="large-box">
            <div className="large-box-label">TOOMORE</div>
            <div className="large-box-sub">Signature Box</div>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="product-info">
          <SectionTitle tag="Best Seller" title="The Signature Collection" />
          <p className="section-sub" style={{ marginBottom: 0 }}>
            12 handcrafted Medjool dates filled with a curated selection of our
            finest flavors — milk chocolate, dark chocolate with pistachio, and
            white chocolate with almond.
          </p>
          <p className="price">
            350 EGP <span>/ Box of 12</span>
          </p>
          <div className="flavors">
            <Badge>Milk Chocolate</Badge>
            <Badge>Dark Choc &amp; Pistachio</Badge>
            <Badge>White Choc &amp; Almond</Badge>
            <Badge>Caramel</Badge>
          </div>
          <button className="btn-dark">Add to Cart</button>
        </div>
      </FadeIn>
    </section>
  )
}