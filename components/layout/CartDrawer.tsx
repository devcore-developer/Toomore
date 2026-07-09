'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const router = useRouter()
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCartStore()

  return (
    <>
      {/* الـ Overlay بيظهر ويختفي بس */}
      {isOpen && <div className="cart-overlay" onClick={closeCart} />}
      
      {/* الـ Drawer ثابت في الصفحة دايماً وبيتحرك بالـ CSS */}
      <div className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Your Cart</h2>
          <button className="cart-drawer-close" onClick={closeCart} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="cart-empty-text">Your cart is empty</p>
            <button className="cart-continue-btn" onClick={() => { closeCart(); router.push('/shop') }}>Continue Shopping</button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="cart-drawer-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="cart-item-img-inner" />
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                    <div className="cart-item-actions">
                      <div className="cart-qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase">+</button>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label="Remove">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cart-drawer-footer">
              <div className="cart-footer-row">
                <span className="cart-footer-label">Subtotal ({count()} items)</span>
                <span className="cart-footer-total">{formatPrice(total())}</span>
              </div>
              <button className="cart-checkout-btn" onClick={() => { closeCart(); setTimeout(() => router.push('/checkout'), 300) }}>
                Proceed to Checkout
              </button>
              <button className="cart-continue-link" onClick={() => { closeCart(); router.push('/shop') }}>Continue Shopping</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}