'use client'
import { useEffect, useState } from 'react'

import Header from '@/app/server_components/Header'
import DataCard from '@/components/DataCard'
import Input from '@/components/Input'
import InputVariable from '@/components/InputVariable'
import Select from '@/components/Select'
import calculateMeasurements from '@/lib/calcs'
import convert from '@/lib/convert'
import useLocalStorage from '@/lib/hooks/useLocalStorage'

const classifications: Classification[] = ["Men's", "Women's", 'Youth']
const sexes: Sex[] = ['Male', 'Female']

export default function Home() {
  const [insole, setInsole] = useLocalStorage<number>('insole', 292)
  const [insoleUnit, setInsoleUnit] = useLocalStorage<unit>('insoleUnit', 'mm')
  const [nominal, setNominal] = useLocalStorage<number>('nominal', 11.5)
  const [classification, setClassification] = useLocalStorage<Classification>('classification', classifications[0])
  const [height, setHeight] = useLocalStorage<number>('height', 1828)
  const [heightUnit, setHeightUnit] = useLocalStorage<unit>('heightUnit', 'mm')
  const [sex, setSex] = useLocalStorage<Sex>('sex', sexes[0])
  const [measurements, setMeasurements] = useState<Results>({ shod: {}, unshod: {}, best: 'insole' } as Results)

  useEffect(() => {
    const results = calculateMeasurements(
      convert(insole, insoleUnit, 'mm'),
      nominal,
      classification,
      convert(height, heightUnit, 'mm'),
      sex,
    )
    console.log(results)
    setMeasurements(results)
  }, [insole, nominal, classification, height, sex, insoleUnit, heightUnit])

  return (
    <div>
      <Header as='h1' className='text-5xl text-center'>
        Sole Searcher
      </Header>

      <form className='grid max-w-3xl grid-cols-2 gap-6 px-4 py-5 mx-auto sm:px-6'>
        <InputVariable
          name='Insole Length'
          inputValue={insole}
          onInputChange={setInsole}
          selectValue={insoleUnit}
          onSelectChange={setInsoleUnit}
          stars={3}
          className='col-span-2'
        />
        <Input name='Nominal Shoe Size - US' value={nominal} onChange={setNominal} stars={2} />
        <Select
          name='Footwear Classification'
          options={classifications}
          value={classification}
          onChange={setClassification}
        />
        <InputVariable
          name='Subject Height'
          inputValue={height}
          onInputChange={setHeight}
          selectValue={heightUnit}
          onSelectChange={setHeightUnit}
          stars={1}
        />
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
