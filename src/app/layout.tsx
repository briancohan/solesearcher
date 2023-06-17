import { Inter } from 'next/font/google'

import Navbar from '@/components/NavBar'

import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sole Searcher',
  description:
    'Simple app to determine the shod outsole track length and unshod barefoot track length based on known insole measurements, nominal shoe size, and subject height for Search & Rescue purposes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-zinc-800 text-zinc-100`}>
        <header>
          <Navbar />
        </header>
        <main className='pt-8 mx-auto text-lg/7 max-w-7xl'>{children}</main>
      </body>
    </html>
  )
}
