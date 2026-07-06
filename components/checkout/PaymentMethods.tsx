'use client'

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
  const handleSelect = (id: string) => {
    onChange(id)
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect(id)
    }
  }

  return (
    <div className="payment-methods" role="radiogroup" aria-label="Payment method">
      <h3 className="checkout-section-heading">Payment Method</h3>
      <div className="payment-methods-list">
        {methods.map((m) => (
          <div
            key={m.id}
            className={`payment-method${selected === m.id ? ' payment-method--active' : ''}`}
            onClick={() => handleSelect(m.id)}
            onKeyDown={(e) => handleKeyDown(e, m.id)}
            role="radio"
            tabIndex={0}
            aria-checked={selected === m.id}
          >
            <span className="payment-method-icon" aria-hidden="true">{m.icon}</span>
            <span className="payment-method-label">{m.label}</span>
            <div className="payment-radio">
              {selected === m.id && <div className="payment-radio-dot" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}