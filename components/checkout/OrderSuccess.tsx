import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/lib/types'

interface OrderSuccessProps {
  order: {
    id: string
    items: CartItem[]
    subtotal: number
    total: number
    promoCode?: {
      code: string
      discountValue: number
      discountAmount: number
    } | null
  }
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  const hasPromo = order.promoCode && order.promoCode.discountAmount > 0

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
          {order.items.map((item) => (
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
          
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #eee' }}>
            <div className="checkout-success-item">
              <span>Original Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            
            {hasPromo && order.promoCode && (
              <>
                <div className="checkout-success-item">
                  <span>Promo Code: {order.promoCode.code}</span>
                  <span>-{order.promoCode.discountValue}%</span>
                </div>
                <div className="checkout-success-item">
                  <span>Discount Amount</span>
                  <span>-{formatPrice(order.promoCode.discountAmount)}</span>
                </div>
              </>
            )}
            
            <div className="checkout-success-total">
              <span>Final Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <Link href="/" className="checkout-success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}