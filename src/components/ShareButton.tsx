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
      toast.error('Failed to share')
    }
  }

  const writeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(href)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  if (navigator.canShare()) {
    return (
      <Button aria-label='Share' onClick={share}>
        <Icon icon='material-symbols:share' className='w-6 h-6' />
      </Button>
    )
  }
  return (
    <Button aria-label='Copy URL' onClick={writeToClipboard}>
      <Icon icon='mingcute:copy-line' className='w-6 h-6' />
    </Button>
  )
}

export default ShareButton
