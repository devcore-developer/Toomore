import { Product } from '@/lib/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#4A4A4A' }}>
        <p className="serif" style={{ fontSize: 20, color: '#0F4C3A', marginBottom: 8 }}>
          No products found
        </p>
        <p style={{ fontSize: 14 }}>Try a different category or check back later.</p>
      </div>
    )
  }

  return (
    <div className="boxes-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}