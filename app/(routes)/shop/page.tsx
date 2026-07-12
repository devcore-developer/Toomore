'use client'

import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'

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

  const updatedProducts = products.map(p => ({
    ...p,
    ...(shopOverrides[p.name] || {})
  }))

  const sortedProducts = [...updatedProducts].sort((a, b) => (a.pieces || 0) - (b.pieces || 0))

return (
    <section className="shop-page">
      <SectionTitle
        tag="Shop"
        title="Our Collection"
        subtitle="Explore our handcrafted stuffed Mejdool dates — each box is a masterpiece."
      />
      {loading ? (
        <>
          <div className="shop-skeleton-mob flex flex-col gap-5 px-5 md:hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shop-skel-card">
                <div className="shop-skel-img" />
                <div className="shop-skel-body">
                  <div className="shop-skel-line shop-skel-line--title" />
                  <div className="shop-skel-line shop-skel-line--desc" />
                  <div className="shop-skel-line shop-skel-line--desc" />
                  <div className="shop-skel-footer">
                    <div className="shop-skel-line shop-skel-line--price" />
                    <div className="shop-skel-btn" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <div className="shop-skel-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="shop-skel-card">
                  <div className="shop-skel-img" />
                  <div className="shop-skel-body">
                    <div className="shop-skel-line shop-skel-line--title" />
                    <div className="shop-skel-line shop-skel-line--desc" />
                    <div className="shop-skel-line shop-skel-line--desc" />
                    <div className="shop-skel-footer">
                      <div className="shop-skel-line shop-skel-line--price" />
                      <div className="shop-skel-btn" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-5 px-5 md:hidden">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addItem} />
            ))}
          </div>
          <div className="hidden md:block">
            <ProductGrid products={sortedProducts} onAddToCart={addItem} />
          </div>
        </>
      )}
    </section>
  )
}