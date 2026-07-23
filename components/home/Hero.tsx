'use client'

import Link from 'next/link'
import FadeIn from '@/components/shared/FadeIn'
import { useCMS } from '@/hooks/useCMS'

export default function Hero() {
  const { get } = useCMS()

  const heroDesktop = get('hero_desktop', '/images/hero-product.png')
  const heroMobile = get('hero_mobile', '/images/hero-mobile.png')

  return (
    <>
      <style>{`
        .hero-mob-cta {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 14px;
          margin-top: 32px;
        }
        .hero-mob-shop {
          width: 100%;
          height: 52px;
          background: var(--orange);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font-body);
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(198,90,46,0.25);
          text-decoration: none;
        }
        .hero-mob-shop:active { transform: scale(0.97); }
        .hero-mob-wa {
          width: 100%;
          height: 52px;
          background: #F8F3EB;
          color: #0F5B4C;
          border: 2px solid #0F5B4C;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font-body);
          letter-spacing: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          padding: 0 20px;
        }
        .hero-mob-wa-icon-wrap {
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 50%;
          background: rgba(15,91,76,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease;
        }
        .hero-mob-wa-icon {
          width: 17px;
          height: 17px;
          fill: #0F5B4C;
          transition: fill 0.25s ease;
        }
        .hero-mob-wa-arrow {
          width: 26px;
          height: 26px;
          min-width: 26px;
          border-radius: 50%;
          border: 1.5px solid rgba(15,91,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.25s ease, transform 0.25s ease;
          margin-left: auto;
        }
        .hero-mob-wa-arrow svg {
          width: 13px;
          height: 13px;
          stroke: #0F5B4C;
          fill: none;
          strokeWidth: 2;
          strokeLinecap: round;
          strokeLinejoin: round;
          transition: stroke 0.25s ease;
        }
        .hero-mob-wa:hover {
          background: #0F5B4C;
          border-color: #0F5B4C;
          color: #fff;
          box-shadow: 0 6px 24px rgba(15,91,76,0.18);
        }
        .hero-mob-wa:hover .hero-mob-wa-icon-wrap { background: rgba(255,255,255,0.2); }
        .hero-mob-wa:hover .hero-mob-wa-icon { fill: #fff; }
        .hero-mob-wa:hover .hero-mob-wa-arrow { border-color: rgba(255,255,255,0.3); transform: translateX(4px); }
        .hero-mob-wa:hover .hero-mob-wa-arrow svg { stroke: #fff; }
        .hero-mob-wa:active {
          background: #0F5B4C;
          border-color: #0F5B4C;
          color: #fff;
          transform: scale(0.97);
        }
        .hero-mob-wa:active .hero-mob-wa-icon-wrap { background: rgba(255,255,255,0.2); }
        .hero-mob-wa:active .hero-mob-wa-icon { fill: #fff; }
        .hero-mob-wa:active .hero-mob-wa-arrow { border-color: rgba(255,255,255,0.3); }
        .hero-mob-wa:active .hero-mob-wa-arrow svg { stroke: #fff; }
        @media (max-width: 767px) { .hero-btns { display: none !important; } }
        @media (min-width: 768px) { .hero-mob-cta { display: none !important; } }
      `}</style>

      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroDesktop})` }}
      >
        <div className="hero-mob-img-wrap">
          <img
            src={heroMobile}
            alt="Toomore Premium Dates"
            className="hero-mob-img"
          />
        </div>

        <div className="hero-content">
          <FadeIn>
            <div className="hero-tag">
              <span className="hero-tag-line" />
              Egyptian Mejdool Dates
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="hero-title heading">
              Dates,<br /><em>Reimagined.</em>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="hero-sub">
              Handcrafted Mejdool dates filled with premium ingredients — milk
              chocolate, dark chocolate, pistachios, and more. The perfect luxury
              for every moment.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="hero-mob-cta">
              <Link href="/shop" className="hero-mob-shop">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Shop Boxes
              </Link>
              <a
                href="https://wa.me/201556847277?text=Hi%20TOOMORE!%20I%E2%80%99d%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-mob-wa"
              >
                <span className="hero-mob-wa-icon-wrap">
                  <svg className="hero-mob-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <span>Order via WhatsApp</span>
                <span className="hero-mob-wa-arrow">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                  </svg>
                </span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="hero-btns">
              <Link href="/shop" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Shop Boxes
              </Link>
              <a
                href="https://wa.me/201556847277?text=Hi%20TOOMORE!%20I%E2%80%99d%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-green"
              >
                <svg className="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Order on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}