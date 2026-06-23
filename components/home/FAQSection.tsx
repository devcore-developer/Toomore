'use client'

import { useState } from 'react'
import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import { FAQS } from '@/lib/constants'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq-section">
      <SectionTitle tag="FAQ" title="Frequently Asked Questions" align="center" />
      <div className="faq-list">
        {FAQS.map((faq: { question: string; answer: string }, i: number) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <div
                className="faq-q"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                {faq.question}
                <span className="faq-arr">{openIndex === i ? '−' : '+'}</span>
              </div>
              <div className="faq-a">{faq.answer}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}