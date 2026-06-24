interface StatsCardProps {
  label: string
  value: string | number
  sub?: string
  color?: string
}

export default function StatsCard({ label, value, sub, color = '#0E5B4F' }: StatsCardProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: '24px 28px',
      border: '1px solid rgba(14,91,79,0.08)',
      flex: 1,
      minWidth: 200,
    }}>
      <div style={{ fontSize: 13, color: '#6A675F', marginBottom: 8, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-cormorant), serif',
        fontSize: 36,
        fontWeight: 600,
        color,
        lineHeight: 1.1,
        marginBottom: sub ? 4 : 0,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: '#6A675F' }}>{sub}</div>
      )}
    </div>
  )
}