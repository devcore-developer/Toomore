import { Product } from '@/lib/types'
import ProductCard from './ProductCard'
import PremiumCarousel from '@/components/shared/PremiumCarousel'

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="shop-empty">
        <p className="serif" style={{ fontSize: 20, color: '#0F4C3A', marginBottom: 8 }}>
          No products found
        </p>
        <p style={{ fontSize: 14 }}>Try a different category or check back later.</p>
      </div>
    )
  }

  return (
    <>
      {/* ===== DESKTOP GRID ===== */}
      <div className="boxes-grid shop-desktop">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {/* ===== MOBILE CAROUSEL ===== */}
      <div className="shop-mob">
        <PremiumCarousel autoplayInterval={2500}>
          {products.map((product) => (
            <ProductCard key={`mob-${product.id}`} product={product} onAddToCart={onAddToCart} />
          ))}
        </PremiumCarousel>
      </div>
    </>
  )
}