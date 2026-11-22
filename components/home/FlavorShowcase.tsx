'use client'

import FadeIn from '@/components/shared/FadeIn'
import SectionTitle from '@/components/shared/SectionTitle'
import { useFlavors } from '@/hooks/useFlavors'
import { FALLBACK_FLAVORS } from '@/lib/flavors'

interface FlavorShowcaseProps {
  tag?: string
  title?: string
  subtitle?: string
  onFlavorClick?: (flavor: any) => void
  cmsData?: Record<string, any> // بيانات السيرفر للصفحة الرئيسية
}

export default function FlavorShowcase({
  tag = 'Our Flavors',
  title = 'Exceptional Flavors, Perfectly Crafted.',
  subtitle = 'Choose your favorite handcrafted Medjool date flavor.',
  onFlavorClick,
  cmsData // استقبال البيانات من السيرفر
}: FlavorShowcaseProps) {
  // المصدر الموحد للنكهات على العميل (نفس بيانات لوحة الأدمن)
  // يحل محل قائمة DEFAULT_FLAVORS اليدوية القديمة و useCMS
  const { flavors: fetchedFlavors } = useFlavors()

  // بيانات السيرفر أولاً (الصفحة الرئيسية)، ثم المصدر الموحد،
  // ثم الإعدادات الافتراضية الرسمية أثناء التحميل أو عند فشل الاتصال
  const flavors = Array.isArray(cmsData?.flavors) && cmsData.flavors.length > 0
    ? cmsData.flavors
    : (fetchedFlavors.length > 0 ? fetchedFlavors : FALLBACK_FLAVORS)

  return (
    <section className="flavor-showcase-section">
      <SectionTitle tag={tag} title={title} subtitle={subtitle} />
      <div className="flavors-grid">
        {flavors.map((f, i) => {
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (onFlavorClick) {
              return <div onClick={() => onFlavorClick(f)} style={{ cursor: 'pointer' }}>{children}</div>
            }
            return <a href="/shop" style={{ textDecoration: 'none' }}>{children}</a>
          }

          return (
            <FadeIn key={f.name} delay={i * 0.1}>
              <Wrapper>
                <div className="flavor-card">
                  <div className="flavor-card-img">
                    <div className="flavor-card-img-light" />
                    <img src={f.image} alt={f.name} loading="lazy" />
                    <div className="flavor-card-img-shadow" />
                  </div>
                  <div className="flavor-card-body">
                    <span className="flavor-badge">{f.badge || 'NEW'}</span>
                    <h3 className="flavor-card-name">{f.name}</h3>
                    <p className="flavor-card-desc">{f.desc}</p>
                    <span className="flavor-type">{f.type || ''}</span>
                  </div>
                </div>
              </Wrapper>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}