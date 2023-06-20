import { Dispatch } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Label from '@/app/server_components/Label'
import BaseInput from '@/components/BaseInput'

export interface InputProps {
  name: string
  label: string | React.ReactNode
  value: string | number
  onChange: Dispatch<any>
  type?: string
  inline?: boolean
  className?: string
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  value = '',
  inline = false,
  className,
  ...props
}) => {
  return (
    <div className={twMerge(clsx({ 'flex gap-2': true, 'flex-col': !inline, 'flex-row': inline }), className)}>
      <Label name={name} className='flex items-center gap-2'>
        {label}
      </Label>
      <BaseInput type={type} name={name} value={value} {...props} />
    </div>
  )
}

export default Input
