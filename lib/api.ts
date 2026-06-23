const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export async function fetchProducts(category?: string) {
  const params = category ? `?category=${category}` : ''
  const res = await fetch(`${API_BASE}/api/products${params}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return data.products
}

export async function placeOrder(order: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  if (!res.ok) throw new Error('Failed to place order')
  return res.json()
}

export async function submitGiftRequest(gift: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/gifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gift),
  })
  if (!res.ok) throw new Error('Failed to submit gift request')
  return res.json()
}