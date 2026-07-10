'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'

const flavors = [
  'HAZELNUT CHOCOLATE',
  'DARK MOCHA',
  'WHITE MOCHA',
  'PEANUT BUTTER'
]

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
  
  // بنجهز الكميات بحيث كل الأطعمة بتبدأ بصفر
  const initialQuantities: Record<string, number> = {}
  flavors.forEach(f => initialQuantities[f] = 0)
  
  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities)

  const totalSelected = Object.values(quantities).reduce((sum, q) => sum + q, 0)
  const isValid = totalSelected === box.pieces

  const updateQty = (flavor: string, delta: number) => {
    setQuantities(prev => {
      const newQty = Math.max(0, (prev[flavor] || 0) + delta)
      
      // لو الزيادة هتخلي العدد يزيد عن حد البوكس، ماتعملش حاجة
      const currentTotal = Object.values(prev).reduce((sum, q) => sum + q, 0) - (prev[flavor] || 0) + newQty
      if (currentTotal > box.pieces) return prev
      
      return { ...prev, [flavor]: newQty }
    })
  }

  const handleAdd = () => {
    if (!isValid) return

    // بجهز مصفوفة الأطعمة النهائية للسلة
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
      image: undefined, // ممكن تضيف صورة افتراضية هنا لو حابب
      flavors: selectedFlavors,
      category: 'mixed' as const,
      isBestSeller: false,
      pieces: box.pieces,
      quantity: 1
    }

    addItem(customBox)
    onClose()
  }

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
          {flavors.map(f => (
            <div key={f} className="flavor-modal-row">
              <span className="flavor-modal-name">{f}</span>
              <div className="flavor-qty">
                <button onClick={() => updateQty(f, -1)} disabled={quantities[f] === 0}>−</button>
                <span>{quantities[f]}</span>
                <button onClick={() => updateQty(f, 1)}>+</button>
              </div>
            </div>
          ))}
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