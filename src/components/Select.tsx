import { Dispatch, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Label from '@/app/server_components/Label'

interface SelectProps {
  name: string
  label?: string | React.ReactNode
  options: string[]
  value: string | number
  onChange: Dispatch<any>
  className?: string
}

const Select: React.FC<SelectProps> = ({ name, label, options, value, onChange, className }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div>
          {label && <Label name='name'>{label}</Label>}
          <div className={twMerge('relative mt-2', className)}>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-zinc-700 py-1.5 pl-3 pr-10 text-left text-gray-100 shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-sole-green sm:text-sm sm:leading-6'>
              <span className='block truncate'>{value}</span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <ChevronUpDownIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-zinc-700 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      clsx({
                        'bg-sole-green text-white': active,
                        'text-gray-100': !active,
                        'relative cursor-default select-none py-2 pl-3 pr-9': true,
                      })
                    }
                    value={option}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx({
                            'font-semibold': selected,
                            'font-normal': !selected,
                            'block truncate': true,
                          })}>
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={clsx({
                              'text-white': active,
                              'text-sole-green': !active,
                              'absolute inset-y-0 right-0 flex items-center pr-4': true,
                            })}>
                            <CheckIcon className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}

export default Select
