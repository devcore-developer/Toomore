interface StatusBadgeProps {
  status: string
}

const colors: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#FFF3E0', text: '#E65100' },
  confirmed: { bg: '#E3F2FD', text: '#1565C0' },
  shipped: { bg: '#F3E5F5', text: '#7B1FA2' },
  delivered: { bg: '#E8F5E9', text: '#2E7D32' },
  cancelled: { bg: '#FFEBEE', text: '#C62828' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = colors[status] || { bg: '#F5F5F5', text: '#616161' }

  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      background: c.bg,
      color: c.text,
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  )
}