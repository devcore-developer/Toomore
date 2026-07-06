import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import Image from 'next/image'

export default function StorySection() {
  return (
    <section className="story-section">
      {/* Subtle Arabic geometric pattern */}
      <svg className="story-pattern" viewBox="0 0 320 320" fill="none">
        <rect x="0" y="0" width="320" height="320" stroke="#0E5B4F" strokeWidth="1" />
        <rect x="40" y="40" width="240" height="240" stroke="#0E5B4F" strokeWidth="0.8" />
        <rect x="80" y="80" width="160" height="160" stroke="#0E5B4F" strokeWidth="0.6" />
        <line x1="0" y1="160" x2="320" y2="160" stroke="#0E5B4F" strokeWidth="0.5" />
        <line x1="160" y1="0" x2="160" y2="320" stroke="#0E5B4F" strokeWidth="0.5" />
        <circle cx="160" cy="160" r="80" stroke="#0E5B4F" strokeWidth="0.5" />
        <circle cx="160" cy="160" r="120" stroke="#0E5B4F" strokeWidth="0.4" />
      </svg>

      <FadeIn>
        <div className="story-visual">
          <Image
            src="/images/Our_Story_Banner.png"
            alt="Our Story"
            fill
            className="story-visual-img"
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="story-text">
          <SectionTitle tag="Our Story" title="A Modern Take on an Ancient Treasure" />
          <p>
            Dates have always been Egypt&apos;s finest gift to the world —
            nourishing, rich, deeply meaningful. But somewhere along the way, they
            were taken for granted.
          </p>
          <p>
            TOOMORE was born out of a simple obsession: what if we treated the
            Mejdool date the way it truly deserves? Premium ingredients.
            Thoughtful craftsmanship. Beautiful presentation.
          </p>
          <p className="story-highlight">
            The result is something you don&apos;t just eat — you experience.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}