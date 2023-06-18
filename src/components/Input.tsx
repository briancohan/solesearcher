import { Dispatch } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Label from '@/app/server_components/Label'
import BaseInput from '@/components/BaseInput'
import Rating from '@/app/server_components/Rating'

export interface InputProps {
  name: string
  value: string | number
  onChange: Dispatch<any>
  stars?: number
  type?: string
  inline?: boolean
  className?: string
}

const Input: React.FC<InputProps> = ({ name, type = 'text', value = '', inline = false, stars = 0, className, ...props }) => {
  return (
    <div className={twMerge(clsx({ 'flex gap-2': true, 'flex-col': !inline, 'flex-row': inline }), className)}>
      <Label name={name} className="flex items-center gap-2">{stars > 0 && <Rating stars={stars} />}{name}</Label>
      <BaseInput type={type} name={name} value={value} {...props} />
    </div>
  )
}

export default Input
