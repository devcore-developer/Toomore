import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'signature-collection',
    name: 'The Signature Collection',
    description:
      '12 handcrafted Medjool dates filled with a curated selection of our finest flavors — milk chocolate, dark chocolate with pistachio, and white chocolate with almond.',
    price: 350,
    flavors: ['Milk Chocolate', 'Dark Choc & Pistachio', 'White Choc & Almond', 'Caramel'],
    category: 'signature',
    isBestSeller: true,
    pieces: 12,
  },
  {
    id: 'dark-indulgence',
    name: 'Dark Indulgence',
    description:
      'Rich 70% dark chocolate coatings paired with roasted pistachio and tahini cream fillings.',
    price: 320,
    flavors: ['Dark Chocolate', 'Pistachio', 'Tahini Cream'],
    category: 'mixed',
    pieces: 12,
  },
  {
    id: 'classic-collection',
    name: 'Classic Collection',
    description:
      'A beloved selection of our classic milk chocolate and white chocolate stuffed dates.',
    price: 280,
    flavors: ['Milk Chocolate', 'White Chocolate'],
    category: 'mixed',
    pieces: 12,
  },
  {
    id: 'gift-box',
    name: 'The Gift Box',
    description:
      'Luxury presentation box with a curated mix of 24 dates — perfect for gifting.',
    price: 580,
    flavors: ['Mixed Selection'],
    category: 'gift',
    pieces: 24,
  },
]

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // محاكاة API call
    setTimeout(() => {
      let filtered = MOCK_PRODUCTS
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category === category)
      }
      setProducts(filtered)
      setLoading(false)
    }, 300)
  }, [category])

  return { products, loading }
}

export function useProduct(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!productId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setTimeout(() => {
      const found = MOCK_PRODUCTS.find((p) => p.id === productId) || null
      setProduct(found)
      setLoading(false)
    }, 200)
  }, [productId])

  return { product, loading }
}