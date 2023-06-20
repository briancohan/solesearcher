import React, { Dispatch } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Label from '@/app/server_components/Label'
import BaseInput from '@/components/BaseInput'
import Select from '@/components/Select'

interface InputVariableProps {
  name: string
  label: string | React.ReactNode
  inputValue: string | number
  selectValue: string
  onInputChange: Dispatch<any>
  onSelectChange: Dispatch<any>
  inline?: boolean
  className?: string
}

const units: unit[] = ['mm', 'cm', 'in']

const InputVariable: React.FC<InputVariableProps> = ({
  name,
  label,
  inputValue,
  selectValue,
  inline = false,
  className,
  onInputChange,
  onSelectChange,
  ...props
}) => {
  return (
    <div className={twMerge(clsx({ 'flex gap-2': true, 'flex-col': !inline, 'flex-row': inline }), className)}>
      <Label name={name} className='flex items-center gap-2'>
        {label}
      </Label>
      <div className='relative rounded-md shadow-sm'>
        <BaseInput type='number' name={name} value={inputValue} onChange={onInputChange} {...props} />
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <label htmlFor={`${name}-unit`} className='sr-only'>
            {name} Unit
          </label>
          <Select
            name={`${name}-unit`}
            options={units}
            value={selectValue}
            className='w-20 mt-0'
            onChange={onSelectChange}
          />
        </div>
      </div>
    </div>
  )
}

export default InputVariable
