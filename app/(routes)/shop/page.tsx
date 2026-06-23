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
    <section className="mixed" style={{ minHeight: '70vh' }}>
      <SectionTitle
        tag="Shop"
        title="Our Collection"
        subtitle="Explore our handcrafted stuffed Medjool dates — each box is a masterpiece."
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <span
            key={cat.id}
            className="occ-tag"
            style={{
              cursor: 'pointer',
              background: activeCategory === cat.id ? 'rgba(15,76,58,.15)' : undefined,
              borderColor: activeCategory === cat.id ? 'rgba(15,76,58,.4)' : undefined,
              color: activeCategory === cat.id ? '#0F4C3A' : undefined,
            }}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </span>
        ))}
      </div>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#4A4A4A', padding: 40 }}>Loading...</p>
      ) : (
        <ProductGrid products={products} onAddToCart={addItem} />
      )}
    </section>
  )
}