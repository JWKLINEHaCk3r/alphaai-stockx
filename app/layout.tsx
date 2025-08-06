import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/navigation/MainNav'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <MainNav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
