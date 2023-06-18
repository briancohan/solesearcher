import { Dispatch } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Label from '@/app/server_components/Label'
import BaseInput from '@/components/BaseInput'

export interface InputProps {
  name: string
  value: string | number
  onChange: (value: string | number) => [string | number, Dispatch<string | number>]
  type?: string
  inline?: boolean
  className?: string
}

const Input: React.FC<InputProps> = ({ name, type = 'text', value = '', inline = false, className, ...props }) => {
  return (
    <div className={twMerge(clsx({ 'flex gap-2': true, 'flex-col': !inline, 'flex-row': inline }), className)}>
      <Label name={name}>{name}</Label>
      <BaseInput type={type} name={name} value={value} {...props} />
    </div>
  )
}

export default Input
