import { FAQ, Testimonial } from './types'

export const SITE_NAME = 'TOOMORE'
export const WHATSAPP_NUMBER = '+201XXXXXXXXX'
export const FREE_DELIVERY_THRESHOLD = 500
export const CURRENCY = 'EGP'

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Mixed Boxes', href: '/shop?category=mixed' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'Our Story', href: '/story' },
  { label: 'FAQ', href: '/faq' },
]

export const FOOTER_SHOP_LINKS = [
  { label: 'Best Sellers', href: '/shop?filter=best-seller' },
  { label: 'Mixed Boxes', href: '/shop?category=mixed' },
  { label: 'Gift Boxes', href: '/shop?category=gift' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
]

export const FOOTER_COMPANY_LINKS = [
  { label: 'Our Story', href: '/story' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '#' },
]

export const FOOTER_CONTACT_LINKS = [
  { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: 'Instagram', href: 'https://instagram.com/toomore.eg' },
  { label: 'hello@toomore.eg', href: 'mailto:hello@toomore.eg' },
  { label: 'Cairo, Egypt', href: '#' },
]

export const OCCASIONS = [
  'Weddings', 'Engagements', 'Corporate', 'Ramadan', 'Baby Showers', 'Eid Gifts',
]

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "I ordered the Gift Box for my mother's birthday and she cried — in the best way. The packaging alone is worth it.",
    author: 'Nour M.',
    location: 'Cairo, Egypt',
    rating: 5,
  },
  {
    text: 'We ordered 50 custom boxes for our corporate event. Every single guest was impressed. TOOMORE delivered beyond expectations.',
    author: 'Ahmed K.',
    location: 'Alexandria',
    rating: 5,
  },
  {
    text: "The dark chocolate pistachio ones are absolutely divine. I've tried many stuffed dates brands, but nothing comes close.",
    author: 'Yasmin R.',
    location: 'Giza',
    rating: 5,
  },
  {
    text: 'The packaging is absolutely stunning. I\'ve never seen dates presented this way. Will definitely order again for every occasion.',
    author: 'Layla H.',
    location: 'New Cairo',
    rating: 5,
  },
]

export const FAQS: FAQ[] = [
  {
    question: 'Do you deliver outside Cairo?',
    answer: 'Yes! We deliver nationwide across Egypt. Cairo and Alexandria receive same-day delivery. Other governorates are delivered within 1-3 business days via our trusted courier partners.',
  },
  {
    question: 'How should I store the dates?',
    answer: 'Keep your TOOMORE dates in a cool, dry place away from direct sunlight. For best results, store them in the refrigerator. They stay fresh for up to 3 weeks when refrigerated.',
  },
  {
    question: 'Can I customize the box for my event?',
    answer: 'Absolutely. We offer custom branding, ribbon colors, and personalized messages for events of 20+ boxes. Use our gifting request form or contact us on WhatsApp to discuss your requirements.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery, InstaPay, and Vodafone Cash. For orders above 1,000 EGP, a 50% deposit is required to confirm your order.',
  },
  {
    question: 'Are your products suitable as Ramadan gifts?',
    answer: 'TOOMORE dates are perfect for Ramadan gifting. We offer special Ramadan packaging and bulk pricing for large orders. Contact us early to secure your Ramadan custom order.',
  },
]