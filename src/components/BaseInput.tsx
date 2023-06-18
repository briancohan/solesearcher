'use client'
import { Dispatch } from 'react'
import { Input as MUIInput } from '@mui/base/'

interface BaseInputProps {
  name: string
  type?: string
  value: string | number
  onChange: Dispatch<any>
}

const BaseInput: React.FC<BaseInputProps> = ({ name, type = 'text', value = '', onChange, ...props }) => {
  return (
    <MUIInput
      type={type}
      name={name}
      id={name}
      value={value}
      {...props}
      className='w-full'
      slotProps={{
        input: {
          className:
            'block w-full rounded-md border-0 py-1.5 px-4 text-gray-100 shadow-sm ring-1 bg-zinc-700 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sole-green sm:text-sm sm:leading-6',
          onChange: (e) => onChange(e.target.value),
        },
      }}
    />
  )
}

export default BaseInput
