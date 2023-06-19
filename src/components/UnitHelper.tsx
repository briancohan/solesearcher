import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import floatToFraction from '@/lib/floatToFraction'

interface UnitHelperProps {
  className?: string
}

const UnitHelper: React.FC<UnitHelperProps> = ({ className }) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={twMerge('flex items-center justify-center w-12 h-12 rounded-full bg-sole-green', className)}>
        <Icon icon='ph:ruler' className='w-6 h-6 text-white' />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                <Dialog.Panel className='relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-zinc-800 sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                  <div>
                    <div className='flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-sole-green'>
                      <Icon icon='ph:ruler' className='w-6 h-6 text-white' />
                    </div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-200'>
                        Measurement Cheat Sheet
                      </Dialog.Title>
                      <div className='flex flex-col gap-8 mt-2 text-zinc-300'>
                        <table className='w-full divide-y divide-gray-300 table-auto'>
                          <thead>
                            <tr>
                              <th>Fraction</th>
                              <th>Decimal</th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-600'>
                            {Array.from({ length: 16 }, (_, i) => {
                              const { numerator, denominator } = floatToFraction(i / 16)
                              return (
                                <tr key={i} className={clsx({ 'text-sole-tan font-bold': denominator <= 4 })}>
                                  <td className='py-1'>
                                    <sup>{numerator}</sup>&frasl;<sub>{denominator}</sub>
                                  </td>
                                  <td className='py-1'>{(i / 16).toFixed(4)}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                        <table className='w-full divide-y divide-gray-300 table-auto'>
                          <thead>
                            <tr>
                              <th>Feet</th>
                              <th>Inches</th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-600'>
                            {Array.from({ length: 7 }, (_, i) => {
                              return (
                                <tr key={i}>
                                  <td className='py-1'>{i}</td>
                                  <td className='py-1'>{i * 12}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full px-3 py-2 text-sm font-semibold rounded-md shadow-sm text-zinc-800 bg-sole-green hover:bg-sole-tan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sole-tan'
                      onClick={() => setOpen(false)}>
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default UnitHelper
