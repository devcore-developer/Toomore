'use client'

import { useParams } from 'next/navigation'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import ProductHero from '@/components/product/ProductHero'

export default function ProductPage() {
  const params = useParams()
  const productId = params.productId as string
  const { product, loading } = useProduct(productId)
  const { addItem } = useCart()

  if (loading) {
    return (
      <div className="shop-loading-full">
        <p>Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="shop-loading-full">
        <p className="serif" style={{ fontSize: 24, color: '#0F4C3A', marginBottom: 12 }}>
          Product Not Found
        </p>
        <p>This product doesn&apos;t exist or has been removed.</p>
      </div>
    )
  }

  return <ProductHero product={product} onAddToCart={addItem} />
}