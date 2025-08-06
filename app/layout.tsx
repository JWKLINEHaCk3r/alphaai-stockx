import type { Metadata } from 'next'
import './globals.css'
import { MainNav } from '@/components/navigation/MainNav'

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI-Powered Trading Platform',
  description: 'Advanced AI trading platform for smart investment decisions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter bg-gray-900 text-white">
        <MainNav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
