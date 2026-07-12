'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import FlavorPickerModal from '@/components/shared/FlavorPickerModal'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

const fallbackImages: Record<string, string> = {
  signature: '/images/1.png',
  mixed: '/images/2.png',
  gift: '/images/3.png',
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showFlavorPicker, setShowFlavorPicker] = useState(false)
  
  const productImage = product.image || fallbackImages[product.category] || null

  return (
    <>
      <div className="box-card">
        <div className="box-img">
          {productImage ? (
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="box-product-img"
              loading="lazy"
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="mini-box">
              <span className="serif" style={{ fontSize: 10, color: '#0F4C3A', letterSpacing: 1 }}>
                {product.category?.toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="box-card-body">
          <h3 className="box-card-title">{product.price === 160 ? '4-Piece Package' : product.price === 280 ? '8-Piece Package' : product.price === 400 ? '12-Piece Package' : product.price === 520 ? '16-Piece Package' : product.name}</h3>
          <p className="box-card-desc">{product.description}</p>
          <div className="box-card-footer">
            <span className="box-price">{formatPrice(product.price)}</span>
            
            {product.pieces ? (
              <button 
                className="btn-sm" 
                onClick={() => setShowFlavorPicker(true)}
              >
                Customize & Add
              </button>
            ) : onAddToCart ? (
              <button
                className="btn-sm"
                onClick={() => onAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            ) : (
              <Link
                href={`/shop/${product.id}`}
                className="btn-sm"
                aria-label={`View ${product.name}`}
              >
                View
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* مودال اختيار النكهات — خارج الكارت تماماً */}
      {showFlavorPicker && (
        <FlavorPickerModal 
          box={{
            id: product.id,
            title: product.name,
            pieces: product.pieces,
            price: product.price
          }} 
          onClose={() => setShowFlavorPicker(false)} 
        />
      )}
    </>
  )
}