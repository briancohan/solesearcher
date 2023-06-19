import { Dispatch } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Label from '@/app/server_components/Label'
import Rating from '@/app/server_components/Rating'
import BaseInput from '@/components/BaseInput'
import Select from '@/components/Select'

interface InputVariableProps {
  name: string
  inputValue: string | number
  selectValue: string
  onInputChange: Dispatch<any>
  onSelectChange: Dispatch<any>
  stars?: number
  inline?: boolean
  className?: string
}

const units: unit[] = ['mm', 'cm', 'in']

const InputVariable: React.FC<InputVariableProps> = ({
  name,
  inputValue,
  selectValue,
  inline = false,
  className,
  stars = 0,
  onInputChange,
  onSelectChange,
  ...props
}) => {
  return (
    <div className={twMerge(clsx({ 'flex gap-2': true, 'flex-col': !inline, 'flex-row': inline }), className)}>
      <Label name={name} className='flex items-center gap-2'>
        {stars > 0 && <Rating stars={stars} />}
        {name}
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
            value='mm'
            hideLabel={true}
            className='mt-0'
            onChange={onSelectChange}
          />
        </div>
      </div>
    </div>
  )
}

export default InputVariable
