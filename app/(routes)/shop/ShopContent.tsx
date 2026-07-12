'use client'

import { useCart } from '@/hooks/useCart'
import { Product } from '@/lib/types'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'

export function ShopContent({ products }: { products: Product[] }) {
  const { addItem } = useCart()

  return (
    <>
      <div className="shop-mob-grid md:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addItem} />
        ))}
      </div>
      <div className="hidden md:block">
        <ProductGrid products={products} onAddToCart={addItem} />
      </div>
    </>
  )
}