'use client'
import { useEffect, useState } from 'react'

import Header from '@/app/server_components/Header'
import DataCard from '@/components/DataCard'
import Input from '@/components/Input'
import Select from '@/components/Select'
import calculateMeasurements from '@/lib/calcs'
import useLocalStorage from '@/lib/hooks/useLocalStorage'

const classifications: Classification[] = ["Men's", "Women's", 'Youth']
const sexes: Sex[] = ['Male', 'Female']

export default function Home() {
  const [insole, setInsole] = useLocalStorage<number>('insole', 292)
  const [nominal, setNominal] = useLocalStorage<number>('nominal', 11.5)
  const [classification, setClassification] = useLocalStorage<Classification>('classification', classifications[0])
  const [height, setHeight] = useLocalStorage<number>('height', 1828)
  const [sex, setSex] = useLocalStorage<Sex>('sex', sexes[0])
  const [measurements, setMeasurements] = useState<Results>({ shod: {}, unshod: {}, best: 'insole' } as Results)

  useEffect(() => {
    const results = calculateMeasurements(insole, nominal, classification, height, sex)
    console.log(results)
    setMeasurements(results)
  }, [insole, nominal, classification, height, sex])

  return (
    <div>
      <Header as='h1' className='text-5xl text-center'>
        Sole Searcher
      </Header>

      <form className='grid max-w-3xl grid-cols-2 gap-6 px-4 py-5 mx-auto sm:px-6'>
        <Input
          name='Insole Length'
          type='number'
          value={insole}
          onChange={setInsole}
          stars={3}
          className='col-span-2'
        />
        <Input name='Nominal Shoe Size - US' type='number' value={nominal} onChange={setNominal} stars={2} />
        <Select
          name='Footwear Classification'
          options={classifications}
          value={classification}
          onChange={setClassification}
        />
        <Input name='Subject Height' type='number' value={height} onChange={setHeight} stars={1} />
        <Select name='Birth Sex' options={sexes} value={sex} onChange={setSex} />
      </form>

      <Header as='h2' className='text-3xl text-center'>
        Track Lengths
      </Header>
      <div className='grid items-start max-w-3xl grid-cols-1 gap-5 mx-auto mt-5 sm:grid-cols-2'>
        <DataCard
          best={measurements.best}
          results={measurements.shod}
          title='Outsole Track Length'
          icon='mingcute:shoe-line'
        />
        <DataCard
          best={measurements.best}
          results={measurements.unshod}
          title='Barefoot Track Length'
          icon='icon-park-outline:foot'
        />
      </div>
    </div>
  )
}
