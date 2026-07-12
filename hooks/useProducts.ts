import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = category && category !== 'all' ? `?category=${category}` : ''
        const res = await fetch(`/api/products${params}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Products fetch error:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
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
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        const found = (data.products || []).find((p: Product) => p.id === productId) || null
        setProduct(found)
      } catch (err) {
        console.error('Product fetch error:', err)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  return { product, loading }
}