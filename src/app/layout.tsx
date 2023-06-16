import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sole Searcher',
  description: 'Simple app to determine the shod outsole track length and unshod barefoot track length based on known insole measurements, nominal shoe size, and subject height for Search & Rescue purposes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
