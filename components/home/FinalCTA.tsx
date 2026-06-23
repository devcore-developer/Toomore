import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'

export default function FinalCTA() {
  return (
    <section className="final-cta-section">
      <FadeIn>
        <h2 className="heading">Ready to Indulge?</h2>
        <p>
          Order your TOOMORE box today — and experience dates the way they were
          always meant to be.
        </p>
        <div className="cta-btns">
          <Link href="/shop" className="btn-white">
            Shop Now
          </Link>
          <button className="btn-outline-white">
            Order on WhatsApp
          </button>
        </div>
      </FadeIn>
    </section>
  )
}