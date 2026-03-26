import React from 'react'
import { Icon } from '@iconify/react'

import TrackLengthCurve from '@/components/TrackLengthCurve'
import { convert, hslToHex } from '@/lib/calcs'
import { hue, legend_text } from '@/lib/constants'
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
  unitSystem: UnitSystem
  track: number
}

const DataCard: React.FC<DataCardProps> = ({ icon, title, results, unitSystem, track }) => {
  return (
    <div className='relative flex flex-col gap-8 px-4 py-5 overflow-hidden rounded-lg shadow shadow-zinc-600 bg-zinc-700 sm:px-6 sm:pt-6'>
      <div className='flex flex-row items-center h-16'>
        <div className='absolute p-3 rounded-md bg-zinc-500'>
          <Icon icon={icon} className='w-6 h-6 text-gray-100 transform -scale-x-100' />
        </div>
        <p className='ml-16 text-2xl truncate font-medum text-sole-tan'>
          {title}
          <br />
          <span className='text-xl'>in {unitSystem == 'Metric' ? 'Millimeters' : 'Inches'}</span>
        </p>
      </div>

      <div className='flex flex-col content-center gap-3 size-auto'>
        <p className='text-lg text-center text-sole-tan'>Predicted Values</p>
        <table className='text-center border-collapse table-auto'>
          <thead className='text-zinc-300'>
            <tr>
              <td className='m2'></td>
              <td className='m2'>Average</td>
              <td className='m2'>95% Range</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([key, value]) => {
              const typedKey = key as keyof MeasurementResults
              return (
                <tr key={key}>
                  <td
                    className='font-bold tracking-wider text-left m2'
                    style={{ color: hslToHex(hue[typedKey] ?? 0, 75, 70) }}>
                    {legend_text[typedKey]}
                  </td>
                  <td className='m2' style={{ color: hslToHex(hue[typedKey] ?? 0, 75, 70) }}>
                    {unitSystem == 'Metric'
                      ? Math.round(value.avg)
                      : fractionToHTML(floatToFraction(convert(value.avg, 'mm', 'in')))}
                  </td>
                  <td className='grid grid-cols-[4fr_1fr_4fr] m2'>
                    <span className='text-center'>
                      {unitSystem == 'Metric'
                        ? Math.round(value.lower)
                        : fractionToHTML(floatToFraction(convert(value.lower, 'mm', 'in')))}
                    </span>
                    <span>&#8596;</span>
                    <span className='text-center'>
                      {unitSystem == 'Metric'
                        ? Math.round(value.upper)
                        : fractionToHTML(floatToFraction(convert(value.upper, 'mm', 'in')))}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <p className='text-lg text-center text-sole-tan'>Probabilty Distribution</p>
        <TrackLengthCurve data={results} unitSystem={unitSystem} track={track} />
      </div>
    </div>
  )
}

export default DataCard
