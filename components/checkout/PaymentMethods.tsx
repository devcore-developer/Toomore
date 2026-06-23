interface PaymentMethodsProps {
  selected: string
  onChange: (method: string) => void
}

const methods = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'instapay', label: 'InstaPay', icon: '📱' },
  { id: 'vodafone_cash', label: 'Vodafone Cash', icon: '📲' },
]

export default function PaymentMethods({ selected, onChange }: PaymentMethodsProps) {
  return (
    <div>
      <h3 className="serif" style={{ fontSize: 20, color: '#0F4C3A', marginBottom: 16 }}>Payment Method</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {methods.map((m) => (
          <div
            key={m.id}
            onClick={() => onChange(m.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 18px',
              border: `1px solid ${selected === m.id ? '#0F4C3A' : 'rgba(15,76,58,.15)'}`,
              borderRadius: 3,
              cursor: 'pointer',
              background: selected === m.id ? 'rgba(15,76,58,.05)' : '#fff',
              transition: 'all .15s',
            }}
          >
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <span style={{ fontSize: 14, color: '#1F1F1F', flex: 1 }}>{m.label}</span>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2px solid ${selected === m.id ? '#0F4C3A' : 'rgba(15,76,58,.25)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected === m.id && (
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0F4C3A' }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}