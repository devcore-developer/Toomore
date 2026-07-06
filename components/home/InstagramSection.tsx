import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const posts = Array.from({ length: 5 }, (_, i) => i + 1)

export default function InstagramSection() {
  return (
    <section className="insta-section">
      <SectionTitle
        tag="Follow Us"
        title="@toomore.eg"
        subtitle="Follow our journey on Instagram for daily indulgence."
        align="center"
      />
      <div className="insta-grid">
        {posts.map((n) => (
          <div key={n} className="insta-item">
            <FadeIn delay={n * 0.06}>
              <div className="insta-box-hint">
                <span>Post {n}</span>
              </div>
            </FadeIn>
            <div className="insta-overlay">
              <span className="insta-icon">↗</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}