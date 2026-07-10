import FadeIn from '@/components/shared/FadeIn'
import Image from 'next/image'

interface FeaturesProps {
  images?: string[]
}

const steps = [
  {
    num: '01',
    title: 'Pick the Date',
    description: 'We carefully select only premium Medjool dates, naturally sweet and perfectly fresh.',
  },
  {
    num: '02',
    title: 'Fill It',
    description: 'Each date is hand-filled with carefully selected premium ingredients.',
  },
  {
    num: '03',
    title: 'Coat It',
    description: 'Finished with rich Belgian chocolate for a smooth, indulgent coating.',
  },
  {
    num: '04',
    title: 'Pack It',
    description: 'Beautifully packed in our signature luxury box, ready to gift.',
  },
]

export default function Features({ images }: FeaturesProps) {
  return (
    <section className="how-section">

      {/* ===== DESKTOP VERSION ===== */}
      <div className="how-desktop">
        <div className="how-header">
          <span className="how-eyebrow">PROCESS</span>
          <h2 className="how-heading">
            <span className="how-diamond">◆</span>
            How It&apos;s Made
            <span className="how-diamond">◆</span>
          </h2>
        </div>

        <div className="how-grid">
          {steps.map((step, i) => (
            <FadeIn key={`d-${step.num}`} delay={i * 0.12}>
              <div className={`how-step${i === steps.length - 1 ? ' how-step--last' : ''}`}>
                <div className="how-step-img">
                  {images?.[i] ? (
                    <Image
                      src={images[i]}
                      alt={step.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 70px, (max-width: 1024px) 200px, 25vw"
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <div className="how-step-placeholder" />
                  )}
                </div>
                <div className="how-step-badge">{step.num}</div>
                <h4 className="how-step-title">{step.title}</h4>
                <p className="how-step-desc">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ===== MOBILE VERSION ===== */}
      <div className="how-mob">
        <FadeIn>
          <span className="how-mob-eyebrow">◆ PROCESS ◆</span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="how-mob-heading">How It&apos;s Made</h2>
        </FadeIn>

        <div className="how-mob-timeline">
          {steps.map((step, i) => (
            <div key={`m-${step.num}`} className="how-mob-step">
              <FadeIn delay={0.1 + i * 0.1}>
                {/* Timeline Circle */}
                <div className="how-mob-step-head">
                  <div className="how-mob-tl-circle">
                    <span>{step.num}</span>
                  </div>
                </div>

                {/* Image Card */}
                <div className="how-mob-step-card">
                  <div className="how-mob-step-img">
                    {images?.[i] ? (
                      <Image
                        src={images[i]}
                        alt={step.title}
                        fill
                        loading="lazy"
                        sizes="260px"
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <div className="how-step-placeholder" />
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="how-mob-step-title">{step.title}</h3>

                {/* Decorative Divider */}
                <div className="how-mob-step-divider-line">
                  <span />
                  <span className="how-mob-diamond">◆</span>
                  <span />
                </div>

                {/* Description */}
                <p className="how-mob-step-desc">{step.description}</p>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}