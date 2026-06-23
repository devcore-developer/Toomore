import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'

const steps = [
  { num: '01', title: 'Selecting the Dates', description: 'We source only premium-grade Medjool dates — plump, fresh, and naturally sweet.' },
  { num: '02', title: 'Filling & Coating', description: 'Each date is hand-pitted, filled with care, then coated in quality Belgian chocolate.' },
  { num: '03', title: 'Hand Packaging', description: 'Arranged and presented in our signature luxury boxes — ready to impress.' },
  { num: '04', title: 'Delivered Fresh', description: 'Shipped same-day to ensure you receive your order at peak freshness.' },
]

export default function Features() {
  return (
    <section className="how-section">
      <SectionTitle tag="Process" title="How It's Made" align="center" />
      <div className="steps">
        {steps.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.12}>
            <div className="step">
              <div className="step-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}