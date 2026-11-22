'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart-store'
import { useFlavors } from '@/hooks/useFlavors'

interface BoxProps {
  id: string
  title: string
  pieces: number
  price: number
}

interface FlavorPickerModalProps {
  box: BoxProps
  onClose: () => void
}

export default function FlavorPickerModal({ box, onClose }: FlavorPickerModalProps) {
  const addItem = useCartStore((s) => s.addItem)

  // النكهات من المصدر الموحد (hooks/useFlavors) — نفس بيانات لوحة الأدمن مباشرة
  const { flavors, loading } = useFlavors()
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  // تهيئة عدادات الكميات عند وصول النكهات (أو تحديثها من الأدمن)
  useEffect(() => {
    const initialQuantities: Record<string, number> = {}
    flavors.forEach(f => {
      const name = f?.name ? f.name.toUpperCase() : ''
      if (name) initialQuantities[name] = 0
    })
    setQuantities(initialQuantities)
  }, [flavors])

  const totalSelected = Object.values(quantities).reduce((sum, q) => sum + q, 0)
  const isValid = totalSelected === box.pieces

  const updateQty = (flavor: string, delta: number) => {
    setQuantities(prev => {
      const newQty = Math.max(0, (prev[flavor] || 0) + delta)
      const currentTotal = Object.values(prev).reduce((sum, q) => sum + q, 0) - (prev[flavor] || 0) + newQty
      if (currentTotal > box.pieces) return prev
      return { ...prev, [flavor]: newQty }
    })
  }

  const handleAdd = () => {
    if (!isValid) return
    const selectedFlavors: string[] = []
    for (const [flavor, qty] of Object.entries(quantities)) {
      for (let i = 0; i < qty; i++) {
        selectedFlavors.push(flavor)
      }
    }

    const customBox = {
      id: `${box.id}-${Date.now()}`,
      name: box.title,
      description: `Custom: ${Object.entries(quantities).filter(([, q]) => q > 0).map(([f, q]) => `${q}x ${f}`).join(', ')}`,
      price: box.price,
      image: undefined,
      flavors: selectedFlavors,
      category: 'mixed' as const,
      isBestSeller: false,
      pieces: box.pieces,
      quantity: 1
    }

    addItem(customBox)
    onClose()
  }

  if (loading) return (
    <>
      <div className="flavor-modal-overlay" onClick={onClose} />
      <div className="flavor-modal">
        <p>Loading flavors...</p>
      </div>
    </>
  )

  return (
    <>
      <div className="flavor-modal-overlay" onClick={onClose} />
      <div className="flavor-modal">
        <div className="flavor-modal-header">
          <div>
            <h3 className="flavor-modal-title">{box.title}</h3>
            <p className="flavor-modal-price">{box.price} EGP</p>
          </div>
          <button className="flavor-modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="flavor-modal-sub">Select quantities for each flavor. Total must equal {box.pieces}.</p>

        <div className="flavor-modal-counter">
          <span className={isValid ? 'flavor-counter-valid' : 'flavor-counter-invalid'}>
            {totalSelected} / {box.pieces} pieces selected
          </span>
        </div>

        <div className="flavor-modal-list">
          {flavors.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No flavors available at the moment.</p>
          ) : (
            flavors.map(f => {
              const fName = f.name.toUpperCase()
              return (
                <div key={fName} className="flavor-modal-row">
                  <span className="flavor-modal-name">{fName}</span>
                  <div className="flavor-qty">
                    <button onClick={() => updateQty(fName, -1)} disabled={quantities[fName] === 0}>−</button>
                    <span>{quantities[fName] || 0}</span>
                    <button onClick={() => updateQty(fName, 1)}>+</button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <button
          className={`flavor-modal-add-btn ${!isValid ? 'flavor-modal-add-btn--disabled' : ''}`}
          onClick={handleAdd}
          disabled={!isValid}
        >
          Add to Cart — {box.price} EGP
        </button>
      </div>
    </>
  )
}