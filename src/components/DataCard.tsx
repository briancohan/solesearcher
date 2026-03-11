import React from 'react'
import { Icon } from '@iconify/react'

import TrackLengthCurve from '@/components/TrackLengthCurve'
import { hslToHex } from '@/lib/calcs'
import { hue, legend_text } from '@/lib/constants'
import convert from '@/lib/convert'
import floatToFraction from '@/lib/floatToFraction'

function fractionToHTML({ whole, numerator, denominator }: Fraction): JSX.Element {
  return (
    <>
      <span>{whole}</span> <sup>{numerator}</sup>&frasl;<sub>{denominator}</sub>
    </>
  )
}

interface DataCardProps {
  icon: string
  title: string
  results: MeasurementResults
}

const DataCard: React.FC<DataCardProps> = ({ icon, title, results }) => {
  return (
    <div className='relative flex flex-col gap-8 px-4 py-5 overflow-hidden rounded-lg shadow shadow-zinc-600 bg-zinc-700 sm:px-6 sm:pt-6'>
      <div className='flex flex-row items-center h-16'>
        <div className='absolute p-3 rounded-md bg-zinc-500'>
          <Icon icon={icon} className='w-6 h-6 text-gray-100 transform -scale-x-100' />
        </div>
        <p className='ml-16 text-2xl truncate font-medum text-sole-tan'>{title}</p>
      </div>

      <div className='flex flex-col content-center gap-3 size-auto'>
        <p className='text-lg text-center text-sole-tan'>Predicted Values</p>
        <div className='grid grid-cols-3 gap-5 mx-auto max-w-fit'>
          {Object.entries(results).map(([key, value]) => {
            const typedKey = key as keyof MeasurementResults
            return (
              <React.Fragment key={key}>
                <span className='font-bold tracking-wider' style={{ color: hslToHex(hue[typedKey] ?? 0, 75, 70) }}>
                  {legend_text[typedKey]}
                </span>
                <span className='text-right'>{Math.round(value.avg)} mm</span>
                <span className='text-right'>{fractionToHTML(floatToFraction(convert(value.avg, 'mm', 'in')))} in</span>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div>
        <p className='text-lg text-center text-sole-tan'>Probabilty Distribution for Predictions</p>
        <TrackLengthCurve data={results} />
      </div>
    </div>
  )
}

export default DataCard
