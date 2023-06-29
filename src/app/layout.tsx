import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'

import { Inter } from 'next/font/google'

import Footer from '@/app/server_components/Footer'
import Navbar from '@/components/NavBar'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sole Searcher',
  description:
    'Simple app to determine the shod outsole track length and unshod barefoot track length based on known insole measurements, nominal shoe size, and subject height for Search & Rescue purposes.',
  keywords: ['search', 'rescue', 'tracking', 'barefoot', 'shod', 'sole', 'footwear', 'foot', 'length', 'measure'],
  manifest: '/manifest.json',
  themeColor: '#758063',
  author: 'Brian Cohan',
  publisher: 'tracking-books.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-zinc-800 text-zinc-100`}>
        <header>
          <Navbar />
        </header>
        <main className='relative p-2 mx-auto max-w-7xl'>{children}</main>
        <Footer />
        <ToastContainer
          position='bottom-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <Analytics />
      </body>
    </html>
  )
}
