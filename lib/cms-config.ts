export interface CMSFieldConfig {
  key: string
  label: string
  type: 'image' | 'text' | 'textarea'
  recommendedWidth?: number
  recommendedHeight?: number
  aspectRatio?: string
  maxFileSize?: number
  formats?: string
  defaultValue?: string
}

export interface CMSSectionConfig {
  id: string
  title: string
  icon: string
  type?: 'fields' | 'array'
  fields: CMSFieldConfig[]
  arrayItemFields?: CMSFieldConfig[]
}

export const CMS_SECTIONS: CMSSectionConfig[] = [
  {
    id: 'hero',
    title: 'Hero',
    icon: '🏠',
    fields: [
      { key: 'hero_desktop', label: 'Desktop Hero Image', type: 'image', recommendedWidth: 1686, recommendedHeight: 933, aspectRatio: '16:9', maxFileSize: 5, formats: 'JPG / PNG / WebP', defaultValue: '/images/hero-product.png' },
      { key: 'hero_mobile', label: 'Mobile Hero Image', type: 'image', recommendedWidth: 750, recommendedHeight: 1334, aspectRatio: '9:16', maxFileSize: 5, formats: 'JPG / PNG / WebP', defaultValue: '/images/hero-mobile.png' },
    ],
  },
  {
    id: 'bestseller',
    title: 'Best Seller',
    icon: '⭐',
    fields: [
      { key: 'bestseller_desktop', label: 'Desktop Banner', type: 'image', recommendedWidth: 1440, recommendedHeight: 730, aspectRatio: '~2:1', maxFileSize: 5, formats: 'JPG / PNG / WebP', defaultValue: '/images/bestseller-bg.png' },
      { key: 'bestseller_mobile', label: 'Mobile Banner', type: 'image', recommendedWidth: 750, recommendedHeight: 1200, aspectRatio: '5:8', maxFileSize: 5, formats: 'JPG / PNG / WebP', defaultValue: '/images/bestseller-mobile.png' },
      { key: 'bestseller_title', label: 'Title', type: 'text', defaultValue: 'The Signature Collection' },
      { key: 'bestseller_subtitle', label: 'Subtitle', type: 'textarea', defaultValue: 'Our most loved stuffed Medjool date, handcrafted with premium ingredients.' },
      
      // أضف هذا السطر الجديد هنا ⬇️
      { key: 'bestseller_price', label: 'Price (EGP)', type: 'text', defaultValue: '280' },

      { key: 'bestseller_cta_text', label: 'CTA Button Text', type: 'text', defaultValue: 'Order Now' },
      { key: 'bestseller_cta_link', label: 'CTA Button Link', type: 'text', defaultValue: '/shop' },
    ],
  },
  {
    id: 'flavors',
    title: 'Flavors',
    icon: '🍫',
    type: 'array',
    fields: [],
    arrayItemFields: [
      { key: 'name', label: 'Flavor Name', type: 'text' },
      { key: 'image', label: 'Flavor Image', type: 'image', recommendedWidth: 600, recommendedHeight: 600, aspectRatio: '1:1', maxFileSize: 3, formats: 'JPG / PNG / WebP' },
      { key: 'desc', label: 'Short Description', type: 'textarea' },
    ],
  },
  {
    id: 'products',
    title: 'Shop Products',
    icon: '📦',
    type: 'array',
    fields: [],
    arrayItemFields: [
      { key: 'image', label: 'Product Image', type: 'image', recommendedWidth: 600, recommendedHeight: 600, aspectRatio: '1:1', maxFileSize: 3, formats: 'JPG / PNG / WebP' },
      { key: 'name', label: 'Product Title', type: 'text' },
      { key: 'subtitle', label: 'Product Subtitle', type: 'text' },
      { key: 'desc', label: 'Short Description', type: 'textarea' },
    ],
  },
  {
    id: 'gifting',
    title: 'Gifting',
    icon: '🎁',
    fields: [
      { key: 'gifting_desktop', label: 'Desktop Banner', type: 'image', recommendedWidth: 1440, recommendedHeight: 700, aspectRatio: '~2:1', maxFileSize: 5, formats: 'JPG / PNG / WebP', defaultValue: '/images/gifting-bg.png' },
      { key: 'gifting_mobile', label: 'Mobile Banner', type: 'image', recommendedWidth: 1000, recommendedHeight: 1948, aspectRatio: '~1:2', maxFileSize: 5, formats: 'JPG / PNG / WebP', defaultValue: '/images/gifting-mobile.png' },
      { key: 'gifting_title', label: 'Title', type: 'text', defaultValue: 'A New Kind of Sweet Gift.' },
      { key: 'gifting_subtitle', label: 'Subtitle', type: 'textarea', defaultValue: 'Thoughtful, elegant, and unforgettable — perfect for birthdays, thank yous, or just because.' },
      { key: 'gifting_cta_text', label: 'CTA Button Text', type: 'text', defaultValue: 'Request Custom Order' },
      { key: 'gifting_cta_link', label: 'Cta Button Link', type: 'text', defaultValue: '/gifting' },
    ],
  },
  {
    id: 'why',
    title: 'Why TOOMORE',
    icon: '✨',
    type: 'array',
    fields: [],
    arrayItemFields: [
      { key: 'image', label: 'Card Image/Icon', type: 'image', recommendedWidth: 200, recommendedHeight: 200, aspectRatio: '1:1', maxFileSize: 2, formats: 'JPG / PNG / WebP / SVG' },
      { key: 'title', label: 'Card Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
    ],
  },
  {
    id: 'footer',
    title: 'Footer',
    icon: '📋',
    fields: [
      { key: 'footer_logo', label: 'Footer Logo', type: 'image', recommendedWidth: 200, recommendedHeight: 80, aspectRatio: '5:2', maxFileSize: 2, formats: 'PNG / SVG', defaultValue: '/icons/logo.png' },
      { key: 'footer_instagram', label: 'Instagram URL', type: 'text', defaultValue: 'https://instagram.com/toomore.eg' },
      { key: 'footer_facebook', label: 'Facebook URL', type: 'text', defaultValue: '#' },
      { key: 'footer_tiktok', label: 'TikTok URL', type: 'text', defaultValue: '#' },
      { key: 'footer_whatsapp', label: 'WhatsApp Number', type: 'text', defaultValue: '+201XXXXXXXXX' },
      { key: 'footer_email', label: 'Email Address', type: 'text', defaultValue: 'hello@toomore.eg' },
      { key: 'footer_desc', label: 'Company Description', type: 'textarea', defaultValue: 'Premium handcrafted Medjool dates, stuffed with the finest ingredients.' },
      { key: 'footer_copyright', label: 'Copyright Text', type: 'text', defaultValue: '© 2024 TOOMORE. All rights reserved.' },
    ],
  },
]

export const CMS_DEFAULTS: Record<string, any> = {
  hero_desktop: '/images/hero-product.png',
  hero_mobile: '/images/hero-mobile.png',
  bestseller_desktop: '/images/bestseller-bg.png',
  bestseller_mobile: '/images/bestseller-mobile.png',
  bestseller_title: 'The Signature Collection',
  bestseller_subtitle: 'Our most loved stuffed Medjool date, handcrafted with premium ingredients.',
  bestseller_cta_text: 'Order Now',
  bestseller_cta_link: '/shop',
  gifting_desktop: '/images/gifting-bg.png',
  gifting_mobile: '/images/gifting-mobile.png',
  gifting_title: 'A New Kind of Sweet Gift.',
  gifting_subtitle: 'Thoughtful, elegant, and unforgettable — perfect for birthdays, thank yous, or just because.',
  gifting_cta_text: 'Request Custom Order',
  gifting_cta_link: '/gifting',
  footer_logo: '/icons/logo.png',
  footer_instagram: 'https://instagram.com/toomore.eg',
  footer_facebook: '#',
  footer_tiktok: '#',
  footer_whatsapp: '+201XXXXXXXXX',
  footer_email: 'hello@toomore.eg',
  footer_desc: 'Premium handcrafted Medjool dates, stuffed with the finest ingredients.',
  footer_copyright: '© 2024 TOOMORE. All rights reserved.',
  flavors: [
    { name: 'Hazelnut Chocolate', image: '/images/flavor-hazelnut.png', desc: 'Milk chocolate filled with roasted hazelnut cream.' },
    { name: 'Dark Mocha', image: '/images/flavor-mocha.png', desc: 'Dark chocolate blended with coffee & cocoa.' },
    { name: 'White Mocha', image: '/images/flavor-white.png', desc: 'Creamy white chocolate with hazelnut coffee.' },
    { name: 'Peanut Butter', image: '/images/flavor-peanut.png', desc: 'Milk chocolate with peanut butter & crunch.' },
  ],
  products: [
    { name: '4-Piece Package', image: '/images/1.png', subtitle: 'Perfect Introduction', desc: 'A perfect bite-sized introduction to our stuffed dates.' },
    { name: '8-Piece Package', image: '/images/2.png', subtitle: 'Ideal Mix', desc: 'The ideal mix to discover your favorite flavors.' },
    {Name: '12-Piece Package', image: '/images/3.png', subtitle: 'Generous Assortment', desc: 'A generous assortment for you or to share.' },
    { name: '16-Piece Package', image: '/images/4.png', subtitle: 'Ultimate Experience', desc: 'The ultimate experience, fully customized to your taste.' },
  ],
  why: [
    { title: 'Premium Medjool Dates', image: '', desc: 'We use only the highest quality Medjool dates, hand-sorted for perfection.' },
    { title: 'Artisan Fillings', image: '', desc: 'Every flavor is crafted with premium Belgian chocolate and natural ingredients.' },
    { title: 'Luxury Packaging', image: '', desc: 'Our boxes are designed to impress, making every order a gift-worthy experience.' },
    { title: 'Fast Delivery', image: '', desc: 'Fresh delivery across Alexandria and Egypt to your doorstep.' },
  ],
}