'use client'
import Header from '@/app/server_components/Header'
import Rating from '@/app/server_components/Rating'
import Input from '@/components/Input'
import Select from '@/components/Select'
import useLocalStorage from '@/lib/hooks/useLocalStorage'

const classifications = ["Men's", "Women's", 'Youth']
const sexes = ['Male', 'Female']

export default function Home() {
  const [insole, setInsole] = useLocalStorage('insole', 292)
  const [nominal, setNominal] = useLocalStorage('nominal', 11.5)
  const [classification, setClassification] = useLocalStorage('classification', 'm')
  const [height, setHeight] = useLocalStorage('height', 1828)
  const [sex, setSex] = useLocalStorage('sex', 'm')

  return (
    <div>
      <Header as='h1' className='text-5xl text-center'>
        Sole Searcher
      </Header>

      <form className='grid max-w-3xl grid-cols-2 gap-6 px-4 py-5 mx-auto sm:px-6'>
        <Input name='Insole Length' type='number' value={insole} onChange={setInsole} className='col-span-2' />
        <Input name='Nominal Shoe Size - US' type='number' value={nominal} onChange={setNominal} />
        <Select
          name='Footwear Classification'
          options={classifications}
          value={classification}
          onChange={setClassification}
        />
        <Input name='Subject Height' type='number' value={height} onChange={setHeight} />
        <Select name='Birth Sex' options={sexes} value={sex} onChange={setSex} />
      </form>
    </div>
  )
}
