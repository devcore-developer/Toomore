'use client'

import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductGrid from '@/components/product/ProductGrid'

// الخرائط دي هتغير الاسم والسعر والوصف بناءً على الاسم القديم
const shopOverrides: Record<string, any> = {
  'The Signature Collection': {
    name: '4-Piece Package',
    price: 160,
    pieces: 4,
    description: 'A perfect bite-sized introduction to our stuffed dates.'
  },
  'Dark Indulgence': {
    name: '8-Piece Package',
    price: 280,
    pieces: 8,
    description: 'The ideal mix to discover your favorite flavors.'
  },
  'Classic Collection': {
    name: '12-Piece Package',
    price: 400,
    pieces: 12,
    description: 'A generous assortment for you or to share.'
  },
  'The Gift Box': {
    name: '16-Piece Package',
    price: 520,
    pieces: 16,
    description: 'The ultimate experience, fully customized to your taste.'
  }
}

export default function ShopPage() {
  const { products, loading } = useProducts('all')
  const { addItem } = useCart()

  // بنحدث الداتا هنا قبل ما نعرضها
  const updatedProducts = products.map(p => ({
    ...p,
    ...(shopOverrides[p.name] || {})
  }))

  return (
    <section className="shop-page">
      <SectionTitle
        tag="Shop"
        title="Our Collection"
        subtitle="Explore our handcrafted stuffed Mejdool dates — each box is a masterpiece."
      />
      {loading ? (
        <p className="shop-loading">Loading...</p>
      ) : (
        <ProductGrid products={updatedProducts} onAddToCart={addItem} />
      )}
    </section>
  )
}