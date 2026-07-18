'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'
import { SINGLE_FLAVOR_PRICE } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/lib/types'

interface SingleFlavorModalProps {
  flavor: {
    name: string
    image: string
  }
  onClose: () => void
}

export default function SingleFlavorModal({ flavor, onClose }: SingleFlavorModalProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [quantity, setQuantity] = useState(1)
  const total = SINGLE_FLAVOR_PRICE * quantity

  const handleAdd = () => {
    const item: CartItem = {
      id: `flavor-${flavor.name}-${Date.now()}`,
      name: flavor.name,
      description: `${quantity}x ${flavor.name}`,
      price: total,
      image: flavor.image,
      flavors: Array(quantity).fill(flavor.name.toUpperCase()),
      category: 'signature',
      isBestSeller: false,
      pieces: quantity,
      quantity: 1,
    }
    addItem(item)
    onClose()
  }

  return (
    <>
      <div className="flavor-modal-overlay" onClick={onClose} />
      <div className="flavor-modal single-flavor-modal">
        <div className="flavor-modal-header">
          <div>
            <h3 className="flavor-modal-title">{flavor.name}</h3>
            <p className="flavor-modal-price">{formatPrice(SINGLE_FLAVOR_PRICE)} per piece</p>
          </div>
          <button className="flavor-modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="single-flavor-body">
          <div className="single-flavor-img-wrap">
            <Image src={flavor.image} alt={flavor.name} fill className="single-flavor-img" />
          </div>

          <div className="single-flavor-details">
            <span className="single-flavor-qty-label">Quantity</span>
            <div className="flavor-qty single-flavor-qty">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="single-flavor-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <button className="flavor-modal-add-btn" onClick={handleAdd}>
          Add to Cart — {formatPrice(total)}
        </button>
      </div>
    </>
  )
}