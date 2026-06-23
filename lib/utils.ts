export function formatPrice(price: number, currency: string = 'EGP'): string {
  return `${price} ${currency}`
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateOrderId(): string {
  return `TM-${Date.now().toString(36).toUpperCase()}`
}