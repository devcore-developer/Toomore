'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/lib/types'
import { Flavor } from '@/lib/flavors'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import FlavorShowcase from '@/components/home/FlavorShowcase'
import SingleFlavorModal from '@/components/shared/SingleFlavorModal'

export function ShopContent({ products }: { products: Product[] }) {
  const { addItem } = useCart()
  // النكهات القادمة من FlavorShowcase (المصدر الموحد) — لا توجد قائمة نكهات يدوية
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null)

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
          flavor={{ name: selectedFlavor.name, image: selectedFlavor.image || '' }}
          onClose={() => setSelectedFlavor(null)}
        />
      )}
    </>
  )
}