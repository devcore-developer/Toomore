'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductGrid from '@/components/product/ProductGrid'
import Badge from '@/components/ui/Badge'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'signature', label: 'Signature' },
  { id: 'mixed', label: 'Mixed Boxes' },
  { id: 'gift', label: 'Gift Boxes' },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { products, loading } = useProducts(activeCategory)
  const { addItem } = useCart()

  return (
    <section className="shop-page">
      <SectionTitle
        tag="Shop"
        title="Our Collection"
        subtitle="Explore our handcrafted stuffed Mejdool dates — each box is a masterpiece."
      />
      <div className="shop-filters">
        {categories.map((cat) => (
          <span
            key={cat.id}
            className={`shop-filter-pill${activeCategory === cat.id ? ' shop-filter-pill--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveCategory(cat.id)
              }
            }}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </span>
        ))}
      </div>
      {loading ? (
        <p className="shop-loading">Loading...</p>
      ) : (
        <ProductGrid products={products} onAddToCart={addItem} />
      )}
    </section>
  )
}