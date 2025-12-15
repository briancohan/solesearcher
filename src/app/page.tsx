'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

import { usePathname, useSearchParams } from 'next/navigation'

import Button from '@/app/server_components/Button'
import Header from '@/app/server_components/Header'
import Rating from '@/app/server_components/Rating'
import DataCard from '@/components/DataCard'
import Input from '@/components/Input'
import InputVariable from '@/components/InputVariable'
import Select from '@/components/Select'
import ShareButton from '@/components/ShareButton'
import UnitHelper from '@/components/UnitHelper'
import calculateMeasurements from '@/lib/calcs'
import convert from '@/lib/convert'
import useLocalStorage from '@/lib/hooks/useLocalStorage'

const classifications: Classification[] = ["Men's", "Women's", 'Youth']
const sexes: Sex[] = ['Male', 'Female']

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [insole, setInsole] = useLocalStorage<number>('insole', 292)
  const [insoleUnit, setInsoleUnit] = useLocalStorage<unit>('insoleUnit', 'mm')
  const [nominal, setNominal] = useLocalStorage<number>('nominal', 11.5)
  const [classification, setClassification] = useLocalStorage<Classification>('classification', classifications[0])
  const [height, setHeight] = useLocalStorage<number>('height', 1828)
  const [heightUnit, setHeightUnit] = useLocalStorage<unit>('heightUnit', 'mm')
  const [sex, setSex] = useLocalStorage<Sex>('sex', sexes[0])
  const [measurements, setMeasurements] = useState<Results>({ shod: {}, unshod: {}, best: 'insole' } as Results)

  const params = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const results = calculateMeasurements(
      convert(insole, insoleUnit, 'mm'),
      nominal,
      classification,
      convert(height, heightUnit, 'cm'),
      sex,
    )
    setMeasurements(results)
  }, [insole, nominal, classification, height, sex, insoleUnit, heightUnit])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (params.has('insole')) {
      setInsole(Number(params.get('insole')))
    }
    if (params.has('insoleUnit')) {
      setInsoleUnit(params.get('insoleUnit') as unit)
    }
    if (params.has('nominal')) {
      setNominal(Number(params.get('nominal')))
    }
    if (params.has('classification')) {
      setClassification(params.get('classification') as Classification)
    }
    if (params.has('height')) {
      setHeight(Number(params.get('height')))
    }
    if (params.has('heightUnit')) {
      setHeightUnit(params.get('heightUnit') as unit)
    }
    if (params.has('sex')) {
      setSex(params.get('sex') as Sex)
    }
  }, [])

  function resetForm() {
    setInsole(0)
    setInsoleUnit('mm')
    setNominal(0)
    setClassification(classifications[0])
    setHeight(0)
    setHeightUnit('mm')
    setSex(sexes[0])
  }

  return (
    <div>
      <Header as='h1' className='text-5xl text-center'>
        Sole Searcher
      </Header>

      <form className='flex flex-col max-w-3xl gap-6 px-4 py-5 mx-auto sm:px-6'>
        <div className='flex justify-center gap-12'>
          <Button onClick={resetForm} aria-label='Reset Form'>
            <Icon icon='carbon:reset' className='w-6 h-6' />
          </Button>
          <UnitHelper className='absolute top-4 right-4' />
          <ShareButton
            url={typeof window !== 'undefined' ? window.location.origin + pathname : ''}
            data={{
              insole: insole.toString(),
              insoleUnit,
              nominal: nominal.toString(),
              classification,
              height: height.toString(),
              heightUnit,
              sex,
            }}
          />
        </div>
        <div>
          <InputVariable
            name='insole'
            inputValue={insole}
            onInputChange={setInsole}
            selectValue={insoleUnit}
            onSelectChange={setInsoleUnit}
            label={
              <div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>
                <Rating stars={3} /> Insole Length
              </div>
            }
          />
        </div>
        <div className='grid items-end grid-cols-2 gap-6'>
          <Input
            type='number'
            name='nominal'
            value={nominal}
            onChange={setNominal}
            label={
              <div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>
                <Rating stars={2} /> Nominal Shoe Size - US
              </div>
            }
          />
          <Select
            name='footwearClass'
            label='Footwear Classification'
            options={classifications}
            value={mounted ? classification : classifications[0]}
            onChange={setClassification}
          />
        </div>
        <div className='grid items-end grid-cols-2 gap-6'>
          <InputVariable
            name='height'
            inputValue={height}
            onInputChange={setHeight}
            selectValue={heightUnit}
            onSelectChange={setHeightUnit}
            label={
              <div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>
                <Rating stars={1} /> Subject Height
              </div>
            }
          />
          <Select name='sex' label='Birth Sex' options={sexes} value={mounted ? sex : sexes[0]} onChange={setSex} />
        </div>
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
