import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/lib/types'

interface OrderSuccessProps {
  items: CartItem[]
  total: number
}

export default function OrderSuccess({ items, total }: OrderSuccessProps) {
  return (
    <div className="checkout-success-overlay">
      <div className="checkout-success-card">
        <div className="checkout-success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="checkout-success-title">Order Confirmed!</h2>
        <p className="checkout-success-sub">Thank you for choosing TOOMORE. We’ll contact you shortly to confirm your order.</p>
        
        <div className="checkout-success-summary">
          <h4>Your Order</h4>
          {items.map((item) => (
            <div key={item.id} className="checkout-success-item-wrap">
              <div className="checkout-success-item">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
              {/* عرض الأطعمة لو هي بوكس مكس */}
              {item.flavors && item.flavors.length > 0 && (
                <div className="checkout-success-flavors">
                  {Object.entries(
                    item.flavors.reduce((acc: Record<string, number>, f: string) => {
                      acc[f] = (acc[f] || 0) + 1
                      return acc
                    }, {})
                  ).map(([flavor, count]) => (
                    <span key={flavor} className="checkout-flavor-chip">
                      {count}x {flavor}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="checkout-success-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <Link href="/" className="checkout-success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}