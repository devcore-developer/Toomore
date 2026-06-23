interface ArabicPatternProps {
  opacity?: number
  color?: string
}

export default function ArabicPattern({ opacity = 0.05, color = '#C7A56A' }: ArabicPatternProps) {
  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <pattern id="arabic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="0.5" />
          <circle cx="0" cy="0" r="4" fill="none" stroke={color} strokeWidth="0.5" />
          <circle cx="60" cy="0" r="4" fill="none" stroke={color} strokeWidth="0.5" />
          <circle cx="0" cy="60" r="4" fill="none" stroke={color} strokeWidth="0.5" />
          <circle cx="60" cy="60" r="4" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="30" y1="18" x2="30" y2="0" stroke={color} strokeWidth="0.3" />
          <line x1="30" y1="42" x2="30" y2="60" stroke={color} strokeWidth="0.3" />
          <line x1="18" y1="30" x2="0" y2="30" stroke={color} strokeWidth="0.3" />
          <line x1="42" y1="30" x2="60" y2="30" stroke={color} strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#arabic-pattern)`} />
    </svg>
  )
}