interface StatsCardProps {
  label: string
  value: string | number
  sub?: string
  color?: string
}

export default function StatsCard({ label, value, sub, color = '#0E5B4F' }: StatsCardProps) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-label">{label}</div>
      <div className="admin-stat-value" style={{ color }}>
        {value}
      </div>
      {sub && <div className="admin-stat-sub">{sub}</div>}
    </div>
  )
}