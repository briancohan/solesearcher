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

  const share = async () => {
    try {
      await navigator.share({
        title: 'Sole Searcher',
        text: 'View Sole Searcher Results',
        url: href,
      })
    } catch (err) {
      toast.error('Failed to share URL')
    }
  }

  const writeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(href)
      toast.success('Copied URL to clipboard')
    } catch (err) {
      toast.error('Failed to copy URL')
    }
  }

  return (
    <Button aria-label='Share' onClick={navigator.canShare() ? share : writeToClipboard}>
      <Icon icon='material-symbols:share' className='w-6 h-6' />
    </Button>
  )
}

export default ShareButton
