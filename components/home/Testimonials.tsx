import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <SectionTitle tag="Reviews" title="What Our Customers Say" />
      <div className="test-grid">
        {TESTIMONIALS.map((test, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="test-card">
              <div className="test-avatar">{test.author.charAt(0)}</div>
              <div className="stars">{'★'.repeat(test.rating)}</div>
              <p className="test-text">&ldquo;{test.text}&rdquo;</p>
              <div className="test-author">
                <strong>{test.author}</strong>
                {test.location}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}