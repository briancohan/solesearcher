'use client'
import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'

import Button from '@/app/server_components/Button'

interface ShareButtonProps {
  url: string
  data: Record<string, string>
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, data }) => {
  const href = `${url}?${new URLSearchParams(data).toString()}`

  const writeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(href)
      toast.success('Copied URL to clipboard')
    } catch (err) {
      toast.error('Failed to copy URL')
    }
  }

  return (
    <Button aria-label='Share' onClick={writeToClipboard}>
      <Icon icon='material-symbols:share' className='w-6 h-6' />
    </Button>
  )
}

export default ShareButton
