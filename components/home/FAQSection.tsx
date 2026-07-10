'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'
import { FAQS } from '@/lib/constants'

interface FAQSectionProps {
  limit?: number
}

export default function FAQSection({ limit }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [mobOpen, setMobOpen] = useState<number | null>(0)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobAnswerRefs = useRef<(HTMLDivElement | null)[]>([])
  const displayedFaqs = limit ? FAQS.slice(0, limit) : FAQS
  const hasMore = limit && FAQS.length > limit

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const mobToggle = (i: number) => {
    setMobOpen(mobOpen === i ? null : i)
  }

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(i)
    }
  }

  return (
    <section className="faq-section">

      {/* ===== DESKTOP VERSION ===== */}
      <div className="faq-desktop">
        <div className="faq-header">
          <span className="faq-eyebrow">SUPPORT</span>
          <span className="faq-diamond">✦</span>
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <span className="faq-diamond">✦</span>
        </div>

        <div className="faq-list">
          {displayedFaqs.map((faq: { question: string; answer: string }, i: number) => (
            <FadeIn key={`d-${i}`} delay={i * 0.06}>
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
                  ref={(el) => { answerRefs.current[i] = el }}
                  style={{
                    maxHeight: openIndex === i ? `${answerRefs.current[i]?.scrollHeight || 400}px` : '0',
                    opacity: openIndex === i ? 1 : 0,
                    transition: 'max-height 0.22s ease, opacity 0.1s ease',
                  }}
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
      </div>

      {/* ===== MOBILE VERSION ===== */}
      <div className="faq-mob">
        <div className="faq-mob-deco faq-mob-deco-tr" />
        <div className="faq-mob-deco faq-mob-deco-bl" />

        <FadeIn>
          <span className="faq-mob-eyebrow">FAQ</span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="faq-mob-heading">Frequently Asked Questions</h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="faq-mob-sub">Everything you need to know before ordering.</p>
        </FadeIn>

        <div className="faq-mob-list">
          {displayedFaqs.map((faq: { question: string; answer: string }, i: number) => (
            <FadeIn key={`m-${i}`} delay={0.2 + i * 0.1}>
              <div
                className={`faq-mob-card${mobOpen === i ? ' faq-mob-card--open' : ''}`}
                onClick={() => mobToggle(i)}
                role="button"
                tabIndex={0}
                aria-expanded={mobOpen === i}
              >
                <div className="faq-mob-q-row">
                  <span className="faq-mob-q">{faq.question}</span>
                  <span className={`faq-mob-chevron${mobOpen === i ? ' faq-mob-chevron--open' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                      <path d="M6 9L12 15L18 9" stroke="#C89A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div
                  className="faq-mob-a-wrap"
                  ref={(el) => { mobAnswerRefs.current[i] = el }}
                  style={{
                    maxHeight: mobOpen === i ? `${mobAnswerRefs.current[i]?.scrollHeight || 400}px` : '0',
                    opacity: mobOpen === i ? 1 : 0,
                    transition: 'max-height 0.22s ease, opacity 0.1s ease',
                  }}
                >
                  <p className="faq-mob-a">{faq.answer}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {hasMore && (
          <div className="faq-mob-more">
            <Link href="/faq" className="faq-mob-more-btn">
              See All Questions
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}
      </div>

    </section>
  )
}