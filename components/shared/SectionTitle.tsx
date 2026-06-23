import FadeIn from './FadeIn'

interface SectionTitleProps {
  tag?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  tagColor?: string
}

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = 'left',
  light = false,
  tagColor,
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'center' : undefined
  const titleColor = light ? '#fff' : undefined
  const subColor = light ? 'rgba(255,255,255,0.65)' : undefined

  return (
    <FadeIn>
      <div style={{ textAlign: alignment, marginBottom: subtitle ? 0 : undefined }}>
        {tag && (
          <span
            className="section-tag"
            style={{ textAlign: alignment, color: tagColor || undefined }}
          >
            {tag}
          </span>
        )}
        <h2
          className="section-title"
          style={{ color: titleColor, textAlign: alignment }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="section-sub"
            style={{
              color: subColor,
              textAlign: alignment,
              margin: alignment === 'center' ? '0 auto' : undefined,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </FadeIn>
  )
}