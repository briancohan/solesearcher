'use client'

import dynamic from 'next/dynamic'

// Dynamically import ToastContainer to avoid SSR issues
const ToastContainer = dynamic(
    () => import('react-toastify').then(mod => mod.ToastContainer),
    {
        ssr: false,
        loading: () => null
    }
)

export function ClientToastContainer() {
    return (
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
    )
}
