import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface ProductHeroProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductHero({ product, onAddToCart }: ProductHeroProps) {
  const bgMap: Record<string, string> = {
    signature: '#0F4C3A',
    mixed: '#1a5c47',
    gift: '#0F4C3A',
  }

  return (
    <section className="bestseller" style={{ padding: '80px 64px' }}>
      <div className="product-card-large">
        <div
          className="large-box"
          style={{ background: bgMap[product.category] || '#0F4C3A' }}
        >
          <div className="large-box-label">TOOMORE</div>
          <div className="large-box-sub">{product.category} Box</div>
        </div>
      </div>
      <div className="product-info">
        <span className="section-tag">
          {product.category === 'signature' ? 'Best Seller' : product.category}
        </span>
        <h2 className="serif section-title">{product.name}</h2>
        <p className="section-sub" style={{ marginBottom: 0 }}>
          {product.description}
        </p>
        <p className="price">
          {formatPrice(product.price)} <span>/ Box of {product.pieces}</span>
        </p>
        <div className="flavors">
          {product.flavors.map((f) => (
            <Badge key={f}>{f}</Badge>
          ))}
        </div>
        <Button variant="dark" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </section>
  )
}