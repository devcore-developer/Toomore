import { NextResponse } from 'next/server'

const products = [
  {
    id: 'signature-collection',
    name: 'The Signature Collection',
    description: '12 handcrafted Medjool dates filled with a curated selection of our finest flavors.',
    price: 350,
    flavors: ['Milk Chocolate', 'Dark Choc & Pistachio', 'White Choc & Almond', 'Caramel'],
    category: 'signature',
    isBestSeller: true,
    pieces: 12,
  },
  {
    id: 'dark-indulgence',
    name: 'Dark Indulgence',
    description: 'Rich 70% dark chocolate coatings paired with roasted pistachio and tahini cream fillings.',
    price: 320,
    flavors: ['Dark Chocolate', 'Pistachio', 'Tahini Cream'],
    category: 'mixed',
    pieces: 12,
  },
  {
    id: 'classic-collection',
    name: 'Classic Collection',
    description: 'A beloved selection of our classic milk chocolate and white chocolate stuffed dates.',
    price: 280,
    flavors: ['Milk Chocolate', 'White Chocolate'],
    category: 'mixed',
    pieces: 12,
  },
  {
    id: 'gift-box',
    name: 'The Gift Box',
    description: 'Luxury presentation box with a curated mix of 24 dates — perfect for gifting.',
    price: 580,
    flavors: ['Mixed Selection'],
    category: 'gift',
    pieces: 24,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let filtered = products
  if (category && category !== 'all') {
    filtered = products.filter((p) => p.category === category)
  }

  return NextResponse.json({ products: filtered })
}