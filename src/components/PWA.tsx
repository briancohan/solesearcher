'use client'
import { useEffect } from 'react'

import Head from 'next/head'

export default function PWA() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then((registration) => console.log('scope is: ', registration.scope))
    }
  }, [])

  return (
    <Head>
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='/icon-512x512.png'></link>
      <meta name='theme-color' content='#000' />
    </Head>
  )
}
