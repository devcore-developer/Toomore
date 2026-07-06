import FadeIn from '@/components/shared/FadeIn'
import Image from 'next/image'

interface FeaturesProps {
  images?: string[]
}

const steps = [
  {
    num: '1',
    title: 'Pick the Date',
    description: 'We start with only the finest Mejdool dates — plump, fresh, and naturally sweet.',
  },
  {
    num: '2',
    title: 'Fill It',
    description: 'Each date is hand-pitted and filled with care using premium natural ingredients.',
  },
  {
    num: '3',
    title: 'Coat It',
    description: 'Dipped in rich Belgian chocolate for a smooth, indulgent finish.',
  },
  {
    num: '4',
    title: 'Pack It',
    description: 'Carefully packed in our signature luxury boxes — ready to gift, no wrapping needed.',
  },
]

export default function Features({ images }: FeaturesProps) {
  return (
    <section className="how-section">
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
          <FadeIn key={step.num} delay={i * 0.12}>
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
    </section>
  )
}