import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const bgMap: Record<string, string> = {
    signature: '#0F4C3A',
    mixed: '#E8DCC8',
    gift: '#1a5c47',
  }
  const labelColorMap: Record<string, string> = {
    signature: '#C7A56A',
    mixed: '#0F4C3A',
    gift: '#C7A56A',
  }
  const bg = bgMap[product.category] || '#0F4C3A'
  const labelColor = labelColorMap[product.category] || '#C7A56A'

  return (
    <div className="box-card">
      <div className="box-img" style={{ background: bg }}>
        <div
          className="mini-box"
          style={{
            background: labelColor === '#C7A56A' ? 'rgba(199,165,106,.2)' : 'rgba(15,76,58,.15)',
            border: `1px solid ${labelColor === '#C7A56A' ? 'rgba(199,165,106,.3)' : 'rgba(15,76,58,.2)'}`,
          }}
        >
          <span className="serif" style={{ fontSize: 10, color: labelColor, letterSpacing: 1 }}>
            {product.category.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="box-card-body">
        <h3 className="box-card-title">{product.name}</h3>
        <p className="box-card-desc">{product.description}</p>
        <div className="box-card-footer">
          <span className="box-price">{formatPrice(product.price)}</span>
          {onAddToCart ? (
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
  )
}