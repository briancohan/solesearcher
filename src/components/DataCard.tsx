import { Disclosure } from '@headlessui/react'
import { Icon } from '@iconify/react'

import TrackLengthGraph from '@/components/TrackLengthGraph'
import convert from '@/lib/convert'
import floatToFraction from '@/lib/floatToFraction'

const wordMap: { [key: string]: string } = {
  insole: 'Insole Length',
  nominal: 'Nominal Size',
  height: 'Subject Height',
}

function fractionToHTML({ whole, numerator, denominator }: Fraction): JSX.Element {
  return (
    <>
      <span className='text-2xl'>{whole}</span> <sup>{numerator}</sup>&frasl;<sub>{denominator}</sub>
    </>
  )
}

function getBestMeasurements(best: string, results: MeasurementResults): Measurement {
  let bestMeasurement: Measurement = { avg: 0, lower: 0, upper: 0 }
  if (results.insole && best === 'insole') {
    bestMeasurement = results.insole
  } else if (results.nominal && best === 'nominal') {
    bestMeasurement = results.nominal
  } else if (results.height && best === 'height') {
    bestMeasurement = results.height
  }
  return bestMeasurement
}

interface DataCardProps {
  icon: string
  title: string
  best: string
  results: MeasurementResults
}

const DataCard: React.FC<DataCardProps> = ({ icon, title, best, results }) => {
  const bestMeasurement = getBestMeasurements(best, results)
  const lowerMM = bestMeasurement.lower
  const upperMM = bestMeasurement.upper
  const lowerIN = convert(lowerMM, 'mm', 'in')
  const upperIN = convert(upperMM, 'mm', 'in')

  return (
    <div className='relative px-4 py-5 overflow-hidden rounded-lg shadow shadow-zinc-600 bg-zinc-700 sm:px-6 sm:pt-6'>
      <div className='mb-2'>
        <div className='absolute p-3 rounded-md bg-zinc-500'>
          <Icon icon={icon} className='w-6 h-6 text-gray-100 transform -scale-x-100' />
        </div>
        <p className='ml-16 text-lg font-medium truncate text-sole-tan'>{title}</p>
        <p className='ml-16 text-sm font-medium truncate text-zinc-300'>From {wordMap[best]}</p>
      </div>
      <div className='flex flex-col items-baseline gap-3 ml-16'>
        <p className='text-2xl font-semibold text-gray-100'>
          <span>{Math.round(lowerMM)}</span> - <span>{Math.round(upperMM)}</span> mm
        </p>
        <p className='text-gray-300 semibold'>
          <span>{fractionToHTML(floatToFraction(lowerIN))}</span> -{' '}
          <span>{fractionToHTML(floatToFraction(upperIN))}</span> <span className='text-2xl'>in</span>
        </p>
      </div>
      <div className='pt-6'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Panel className='grid text-gray-500'>
                <TrackLengthGraph data={results} />
              </Disclosure.Panel>
              <Disclosure.Button className='flex items-center text-sm text-zinc-300'>
                {open ? (
                  <>
                    <span>Hide Details</span>
                    <Icon icon='mdi:chevron-up' className='w-8 h-8' />
                  </>
                ) : (
                  <>
                    <span>Show Details</span>
                    <Icon icon='mdi:chevron-down' className='w-8 h-8' />
                  </>
                )}
              </Disclosure.Button>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

export default DataCard
