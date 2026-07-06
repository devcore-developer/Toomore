'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'
import { FAQS } from '@/lib/constants'

interface FAQSectionProps {
  limit?: number
}

export default function FAQSection({ limit }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const displayedFaqs = limit ? FAQS.slice(0, limit) : FAQS
  const hasMore = limit && FAQS.length > limit

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(i)
    }
  }

  return (
    <section className="faq-section">
      <div className="faq-header">
        <span className="faq-eyebrow">SUPPORT</span>
        <span className="faq-diamond">✦</span>
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <span className="faq-diamond">✦</span>
      </div>

      <div className="faq-list">
        {displayedFaqs.map((faq: { question: string; answer: string }, i: number) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div
              className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`}
              onClick={() => toggle(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              role="button"
              tabIndex={0}
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
            >
              <div className="faq-item-top">
                <span className="faq-item-num">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="faq-q">{faq.question}</h4>
                <div className="faq-chevron" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div
                className="faq-a-wrap"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
              >
                <div className="faq-a">{faq.answer}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {hasMore && (
        <div className="faq-see-more">
          <Link href="/faq" className="faq-see-more-btn">
            See All Questions
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}