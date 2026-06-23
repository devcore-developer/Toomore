import { useCartStore } from '@/store/cart-store'

export function useCart() {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const total = useCartStore((s) => s.total)
  const count = useCartStore((s) => s.count)

  return { items, addItem, removeItem, updateQuantity, clearCart, total, count }
}