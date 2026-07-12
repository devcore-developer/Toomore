import { FAQ, Testimonial } from './types'

export const SITE_NAME = 'TOOMORE'
export const WHATSAPP_NUMBER = '+201XXXXXXXXX'
export const FREE_DELIVERY_THRESHOLD = 500
export const CURRENCY = 'EGP'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'Our Story', href: '/story' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_SHOP_LINKS = [
  { label: 'Best Sellers', href: '/shop?filter=best-seller' },
  { label: 'Mixed Boxes', href: '/shop?category=mixed' },
  { label: 'Gift Boxes', href: '/shop?category=gift' },
]

export const FOOTER_COMPANY_LINKS = [
  { label: 'Our Story', href: '/story' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Why Us', href: '/#why-toomore' },
]

export const FOOTER_CONTACT_LINKS = [
  { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: 'Instagram', href: 'https://instagram.com/toomore.eg' },
  { label: 'hello@toomore.eg', href: 'mailto:hello@toomore.eg' },
  { label: 'Alexandria, Egypt', href: '#' },
]

export const OCCASIONS = [
  'Weddings', 'Engagements', 'Corporate', 'Ramadan', 'Baby Showers', 'Eid Gifts',
]

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "I ordered the Gift Box for my mother's birthday and she cried — in the best way. The packaging alone is worth it.",
    author: 'Nour M.',
    location: 'Alexandria, Egypt',
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
    location: 'New Alexandria',
    rating: 5,
  },
]

export const FAQS: FAQ[] = [
  {
    question: 'What are Medjool dates?',
    answer: 'Medjool dates are large, soft, naturally sweet dates known for their rich caramel-like flavor and premium quality. They are often called the \'King of Dates\' because of their size, texture, and taste.',
  },
  {
    question: 'Why did TooMore choose Medjool dates only?',
    answer: 'We believe great products start with great ingredients. That\'s why TooMore uses only premium Medjool dates to deliver the best taste, texture, and quality in every bite.',
  },
  {
    question: 'What makes Medjool different from regular dates?',
    answer: 'Medjool dates are larger, softer, juicier, and naturally sweeter than most other date varieties. They also have a richer texture, making them perfect for premium stuffed dates.',
  },
  {
    question: 'Are your dates natural?',
    answer: 'Yes. Our Medjool dates are naturally grown and carefully selected. We keep their natural goodness while pairing them with high-quality fillings for an indulgent experience.',
  },
  {
    question: 'Are your dates fresh all year round?',
    answer: 'Yes. We carefully store and package our dates to maintain their freshness, flavor, and soft texture throughout the year.',
  },
  {
    question: 'Are they suitable for athletes?',
    answer: 'Absolutely. Medjool dates provide natural carbohydrates for quick energy, making them a great pre- or post-workout snack.',
  },
  {
    question: 'Can they be eaten as a healthy snack?',
    answer: 'Yes. TooMore dates are a satisfying snack made with premium Medjool dates, offering natural energy and great taste whenever you need it.',
  },
  {
    question: 'Are they suitable for children?',
    answer: 'Yes. They are a delicious snack for children when enjoyed as part of a balanced diet. Adult supervision is recommended for younger children.',
  },
  {
    question: 'Are they suitable for people who avoid refined sugar?',
    answer: 'Yes. Medjool dates are naturally sweet, making them a great choice for people looking to reduce refined sugar in their snacks.',
  },
  {
    question: 'Can I send TooMore as a gift?',
    answer: 'Absolutely. TooMore makes a thoughtful and premium gift for family, friends, colleagues, and special occasions.',
  },
  {
    question: 'What does \'TooMore\' mean?',
    answer: 'TooMore represents abundance, generosity, and enjoying more of life\'s best moments — starting with premium Medjool dates.',
  },
  {
    question: 'Which flavor should I try first?',
    answer: 'If it\'s your first TooMore experience, start with our best-selling flavors such as Peanut Butter or White Mocha, then explore the rest to find your favorite.',
  },
  {
    question: 'Which TooMore flavor is the most popular?',
    answer: 'Our Peanut Butter flavor is currently one of our customer favorites thanks to its perfect balance of creamy, nutty richness and naturally sweet Medjool dates.',
  },
]