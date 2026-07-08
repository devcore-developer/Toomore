
interface StatusBadgeProps {
  status: string
}

const colors: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#FFF3E0', text: '#E65100' },
  confirmed: { bg: '#E3F2FD', text: '#1565C0' },
  shipped: { bg: '#F3E5F5', text: '#7B1FA2' },
  delivered: { bg: '#E8F5E9', text: '#2E7D32' },
  completed: { bg: '#E8F5E9', text: '#2E7D32' },
  cancelled: { bg: '#FFEBEE', text: '#C62828' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = colors[status] || { bg: '#F5F5F5', text: '#616161' }
  const isFinished = status === 'delivered' || status === 'completed'

  return (
    <span
      className="admin-status-badge"
      style={{ 
        background: c.bg, 
        color: c.text,
        fontWeight: isFinished ? 700 : 500,
        gap: isFinished ? '6px' : '0',
        paddingRight: isFinished ? '8px' : '10px'
      }}
    >
      {isFinished && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {status}
    </span>
  )
}