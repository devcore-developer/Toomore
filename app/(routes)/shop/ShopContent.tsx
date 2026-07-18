'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/lib/types'
import { FLAVORS } from '@/lib/constants'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import FlavorShowcase from '@/components/home/FlavorShowcase'
import SingleFlavorModal from '@/components/shared/SingleFlavorModal'

export function ShopContent({ products }: { products: Product[] }) {
  const { addItem } = useCart()
  const [selectedFlavor, setSelectedFlavor] = useState<typeof FLAVORS[number] | null>(null)

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

      <div style={{ marginTop: '80px' }}>
        <FlavorShowcase
          tag="Shop by Flavor"
          title="Choose Your Favorite Date"
          subtitle="Can't decide on a box? Pick your favorite flavors individually."
          onFlavorClick={(flavor) => setSelectedFlavor(flavor)}
        />
      </div>

      {selectedFlavor && (
        <SingleFlavorModal
          flavor={selectedFlavor}
          onClose={() => setSelectedFlavor(null)}
        />
      )}
    </>
  )
}