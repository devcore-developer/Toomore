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

export const metadata: Metadata = {
  title: 'TOOMORE — Premium Stuffed Medjool Dates',
  description:
    'Handcrafted Mejdool dates filled with premium ingredients — milk chocolate, dark chocolate, pistachios, and more.',
  other: {
    'og:title': 'TOOMORE — Premium Stuffed Medjool Dates',
    'og:description': 'Handcrafted Mejdool dates filled with premium ingredients — milk chocolate, dark chocolate, pistachios, and more.',
    'og:image': '/images/og-image.png',
    'og:url': 'https://toomore.eg',
    'og:type': 'website',
    'og:site_name': 'TOOMORE',
    'og:locale': 'en_US',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'TOOMORE — Premium Stuffed Medjool Date',
    'twitter:description': 'Handcrafted Mejdool dates filled with premium chocolate, pistachios & more.',
    'twitter:image': '/images/og-image.png',
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme Color — Browser tab color */}
        <meta name="theme-color" content="#0E5B4F" />
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