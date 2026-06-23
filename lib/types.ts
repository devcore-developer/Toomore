export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  flavors: string[]
  category: 'signature' | 'mixed' | 'gift'
  isBestSeller?: boolean
  pieces: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface GiftRequest {
  eventType: string
  quantity: number
  eventDate: string
  phone: string
  notes: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Testimonial {
  text: string
  author: string
  location: string
  rating: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerName: string
  customerPhone: string
  address: string
  paymentMethod: 'cod' | 'instapay' | 'vodafone_cash'
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string
}