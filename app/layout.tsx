import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = 'https://www.toomoredates.shop'

export const metadata: Metadata = {
  title: 'TOOMORE — Premium Stuffed Medjool Dates',
  description:
    'Handcrafted Mejdool dates filled with premium ingredients — milk chocolate, dark chocolate, pistachios, and more.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'TOOMORE — Premium Stuffed Medjool Dates',
    description:
      'Handcrafted Mejdool dates filled with premium ingredients — milk chocolate, dark chocolate, pistachios, and more.',
    url: SITE_URL,
    siteName: 'TOOMORE',
    images: [
      {
        url: '/images/og-image.png', // تأكد إن الصورة دي موجودة في مجلد public/images
        width: 1200,
        height: 630,
        alt: 'TOOMORE — Premium Stuffed Medjool Dates',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOOMORE — Premium Stuffed Medjool Dates',
    description:
      'Handcrafted Mejdool dates filled with premium chocolate, pistachios & more.',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <meta name="theme-color" content="#0E5B4F" />
        {/* كود التحقق من جوجل فقط هو الموجود هنا، الفافيكون يعمل تلقائياً */}
        <meta name="google-site-verification" content="voxlv21v9YstqHZSODz8nwTVbccksfvGZknK-VSRWtM" />
      </head>
      <body>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <footer className="main-footer">
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  )
}