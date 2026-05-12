'use client'
import { Suspense, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

import { usePathname, useSearchParams } from 'next/navigation'

import Button from '@/app/server_components/Button'
import Header from '@/app/server_components/Header'
import DataCard from '@/components/DataCard'
import Input from '@/components/Input'
import InputVariable from '@/components/InputVariable'
import Select from '@/components/Select'
import ShareButton from '@/components/ShareButton'
import UnitHelper from '@/components/UnitHelper'
import calculateMeasurements, { convert } from '@/lib/calcs'
import { classifications, sexes, unitSystems } from '@/lib/constants'
import useLocalStorage from '@/lib/hooks/useLocalStorage'

// Component to handle search params with proper Suspense boundary
function SearchParamsHandler({
  setInsole,
  setInsoleUnit,
  setNominal,
  setClassification,
  setHeight,
  setHeightUnit,
  setSex,
}: {
  setInsole: (value: number) => void
  setInsoleUnit: (value: unit) => void
  setNominal: (value: number) => void
  setClassification: (value: Classification) => void
  setHeight: (value: number) => void
  setHeightUnit: (value: unit) => void
  setSex: (value: Sex) => void
}) {
  const params = useSearchParams()

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
  }, [params, setInsole, setInsoleUnit, setNominal, setClassification, setHeight, setHeightUnit, setSex])

  return null
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [measurements, setMeasurements] = useState<Results>({ shoe: {}, foot: {} } as Results)

  // Insole Data
  const [insole, setInsole] = useLocalStorage<number>('insole', 276)
  const [insoleUnit, setInsoleUnit] = useLocalStorage<unit>('insoleUnit', 'mm')
  // Shoe Size Data
  const [nominal, setNominal] = useLocalStorage<number>('nominal', 45)
  const [classification, setClassification] = useLocalStorage<Classification>('classification', classifications[0])
  // Height Data
  const [height, setHeight] = useLocalStorage<number>('height', 1828)
  const [heightUnit, setHeightUnit] = useLocalStorage<unit>('heightUnit', 'mm')
  const [sex, setSex] = useLocalStorage<Sex>('sex', sexes[0])
  // Known Track
  const [track, setTrack] = useLocalStorage<number>('track', 0)
  const [trackUnit, setTrackUnit] = useLocalStorage<unit>('trackUnit', 'mm')
  // Output Options
  const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>('unitSystem', unitSystems[0])

  const pathname = usePathname()

  useEffect(() => {
    const results = calculateMeasurements(
      convert(insole, insoleUnit, 'mm'),
      nominal,
      classification,
      convert(height, heightUnit, 'mm'),
      sex,
    )
    setMeasurements(results)
  }, [insole, nominal, classification, height, sex, insoleUnit, heightUnit])

  useEffect(() => {
    setMounted(true)
  }, [])

  function resetForm() {
    setInsole('')
    setNominal('')
    setHeight('')
    setTrack('')
    
    // setInsoleUnit('mm')
    // setHeightUnit('mm')
    // setTrackUnit('mm')
    
    // setClassification(classifications[0])
    // setSex(sexes[0])
  }

  return (
    <div>
      <Suspense fallback={null}>
        <SearchParamsHandler
          setInsole={setInsole}
          setInsoleUnit={setInsoleUnit}
          setNominal={setNominal}
          setClassification={setClassification}
          setHeight={setHeight}
          setHeightUnit={setHeightUnit}
          setSex={setSex}
        />
      </Suspense>
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
              insole: insole,
              insoleUnit,
              nominal: nominal,
              classification,
              height: height,
              heightUnit,
              sex,
            }}
          />
        </div>
        <Header as='h2' className='text-3xl text-center'>
          Subject Information
        </Header>
        <div>
          <InputVariable
            name='insole'
            inputValue={insole}
            onInputChange={setInsole}
            selectValue={insoleUnit}
            onSelectChange={setInsoleUnit}
            label={<div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>Insole Length</div>}
          />
        </div>
        <div className='grid items-end grid-cols-2 gap-6'>
          <Input
            type='number'
            name='nominal'
            value={nominal}
            onChange={setNominal}
            label={<div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>Nominal Shoe Size</div>}
          />
          <Select
            name='footwearClass'
            label='Shoe Size Category'
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
            label={<div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>Subject Height</div>}
          />
          <Select name='sex' label='Birth Sex' options={sexes} value={mounted ? sex : sexes[0]} onChange={setSex} />
        </div>
      </form>

      <Header as='h2' className='text-3xl text-center'>
        Output Options
      </Header>
      <form className='flex flex-col max-w-3xl gap-6 px-4 py-5 mx-auto sm:px-6'>
        <div className='grid items-end grid-cols-2 gap-6'>
          <InputVariable
            name='track'
            inputValue={track}
            onInputChange={setTrack}
            selectValue={trackUnit}
            onSelectChange={setTrackUnit}
            label={
              <div className='flex flex-col items-start gap-2 sm:items-center sm:flex-row'>Known Track Length</div>
            }
          />
          <Select
            name='units'
            label='Output Units'
            options={unitSystems}
            value={mounted ? unitSystem : unitSystems[0]}
            onChange={setUnitSystem}
            className='min-w-lg'
          />
        </div>
      </form>
      <div className='grid items-start max-w-3xl grid-cols-1 gap-5 mx-auto mt-5 sm:grid-cols-2'>
        <DataCard
          results={measurements.shoe}
          title='Shoeprint Length'
          icon='mingcute:shoe-line'
          unitSystem={unitSystem}
          track={convert(track, trackUnit, 'mm')}
        />
        <DataCard
          results={measurements.foot}
          title='Footprint Length'
          icon='icon-park-outline:foot'
          unitSystem={unitSystem}
          track={convert(track, trackUnit, 'mm')}
        />
      </div>

      <div className='flex flex-col max-w-2xl gap-6 px-4 py-5 mx-auto sm:px-6'>
        <Header as='h2' className='text-3xl text-center'>
          Measuring Track and Insole Lengths
        </Header>
        <p>
          Shoeprint, footprint, and sole measurements should be made at the point where the vertical aspect of the slope
          meets or exceeds the horizontal aspect.
        </p>
        <p>
          For shoeprints made with outsoles that have vertical walls, this will be the edge of the shoeprint. For
          footprints and shoeprints made with outsoles that have curved edges, this is where the slope is 45
          <sup>&deg;</sup>.
        </p>
        <div className='mx-auto'>
          <svg width='full' viewBox='0 0 200 175' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='white'>
            <path
              d='M120.549 119.851C120.241 119.851 119.933 119.851 119.625 119.851C101.547 119.758 95.5383 116.361 92.3028 114.547C91.5324 114.128 90.8648 113.756 90.5566 113.756C89.4781 113.849 87.3725 114.872 85.4209 115.85C82.8017 117.152 80.0284 118.502 77.6146 118.874C72.9925 119.619 46.5436 118.967 40.0726 117.385C32.8312 115.617 31.1364 111.057 31.0851 110.871C30.9824 110.638 30.9824 110.405 31.0337 110.173L34.0638 97.5165C34.1665 97.1442 34.4233 96.8185 34.8341 96.6324C35.245 96.4463 35.6559 96.4463 36.0667 96.5859C36.1694 96.6324 48.3411 101.472 57.1745 100.96C66.162 100.448 82.8017 95.4226 82.9558 95.3761C83.2639 95.283 83.5207 95.283 83.8289 95.3761C84.2397 95.4691 126.507 106.776 139.962 106.776C153.11 106.776 167.592 97.0046 167.695 96.9116C168.055 96.6789 168.517 96.5859 168.979 96.6789C169.441 96.772 169.749 97.0977 169.955 97.4699C170.058 97.7026 172.214 102.914 168.106 108.777C163.689 115.152 143.352 119.851 120.549 119.851ZM90.6594 111.15C91.7892 111.15 92.7136 111.662 93.8949 112.313C96.8736 113.988 102.472 117.106 119.676 117.199C143.763 117.339 162.303 112.22 165.692 107.427C167.746 104.543 167.901 101.89 167.695 100.215C163.227 102.961 151.415 109.428 140.014 109.428C126.763 109.428 88.2969 99.3312 83.5207 98.0283C80.7474 98.8659 66.0593 103.147 57.4313 103.612C49.8304 104.031 40.3294 101.006 36.5803 99.6569L34.0124 110.359C34.4747 111.196 36.1694 113.709 40.8429 114.872C47.3139 116.408 73.3007 116.873 77.1524 116.315C79.104 115.989 81.7746 114.733 84.0857 113.57C86.5508 112.36 88.6564 111.336 90.3512 111.15C90.4026 111.15 90.5567 111.15 90.6594 111.15Z'
              fill='black'
            />
            <path
              d='M167.438 98.7263C164.562 94.7247 151.62 91.8398 139.038 89.0479C132.926 87.6985 126.558 86.3026 120.909 84.674C102.215 79.323 95.2301 74.2512 92.2514 63.7353C90.0944 56.1508 86.6021 49.2177 85.0101 46.3328C82.699 48.0079 77.5119 51.5908 69.6543 56.43C59.9991 62.4324 50.4467 65.7361 47.8789 66.5736C46.9031 68.9932 43.154 78.0202 40.2266 82.5336C37.1452 87.2798 36.9398 97.7957 36.9398 97.8887L34.0124 97.8422C34.0124 97.3769 34.2692 86.4887 37.7102 81.1843C40.8943 76.252 45.311 65.1777 45.3624 65.0847C45.5164 64.7124 45.8246 64.3867 46.2868 64.2936C46.3895 64.2471 57.2772 60.9434 68.0109 54.2895C78.8472 47.5426 84.4965 43.3549 84.5478 43.3083C84.9073 43.0757 85.3182 42.9361 85.7804 43.0291C86.1913 43.1222 86.6022 43.3549 86.7562 43.7271C86.9617 44.0994 92.0974 52.9402 95.0247 63.1304C97.7466 72.6691 104.012 77.1361 121.782 82.2079C127.328 83.79 133.645 85.1859 139.705 86.5353C153.983 89.6994 166.308 92.4447 169.852 97.3304L167.438 98.7263Z'
              fill='black'
            />
            <path
              d='M85.9345 63.5026C85.4209 63.5026 84.9073 63.2235 84.6506 62.8047C84.2911 62.1533 84.5478 61.3622 85.2668 61.0365L93.6381 57.0814C94.3571 56.7557 95.2301 56.9884 95.5896 57.6398C95.9491 58.2912 95.6924 59.0822 94.9734 59.4079L86.6021 63.363C86.3967 63.4561 86.1913 63.5026 85.9345 63.5026Z'
              fill='black'
            />
            <path
              d='M90.1458 74.4373C89.6322 74.4373 89.1186 74.1582 88.8619 73.7394C88.5024 73.0879 88.7592 72.2969 89.4782 71.9712L97.8494 68.0161C98.5684 67.6904 99.4414 67.923 99.8009 68.5745C100.16 69.2259 99.9036 70.0169 99.1846 70.3426L90.8134 74.2977C90.608 74.3908 90.3512 74.4373 90.1458 74.4373Z'
              fill='black'
            />
            <path
              d='M99.4414 82.301C99.1846 82.301 98.9279 82.2545 98.6711 82.1149C98.0034 81.7426 97.798 80.9051 98.2089 80.3002L102.574 74.0651C102.985 73.4602 103.909 73.2741 104.577 73.6463C105.245 74.0185 105.45 74.8561 105.039 75.461L100.674 81.6961C100.417 82.0683 99.955 82.301 99.4414 82.301Z'
              fill='black'
            />
            <path
              d='M109.148 86.4887C108.891 86.4887 108.634 86.4422 108.378 86.3026C107.71 85.9304 107.504 85.0928 107.915 84.4879L112.281 78.2528C112.692 77.6479 113.616 77.4618 114.284 77.834C114.951 78.2063 115.157 79.0438 114.746 79.6487L110.381 85.8838C110.072 86.2561 109.61 86.4887 109.148 86.4887Z'
              fill='black'
            />
            <path
              d='M120.087 90.63C119.882 90.63 119.676 90.5834 119.522 90.5369C118.803 90.2577 118.444 89.4667 118.803 88.8153L121.833 82.5802C122.141 81.9287 123.014 81.603 123.733 81.9287C124.452 82.2079 124.812 82.9989 124.452 83.6504L121.422 89.8855C121.166 90.3508 120.652 90.63 120.087 90.63Z'
              fill='black'
            />
            <path
              d='M88.1942 52.2422C86.4994 51.172 81.5691 48.7524 78.7445 50.6136L77.0497 48.4732C82.1341 45.1695 89.5295 49.9157 89.889 50.1018L88.1942 52.2422Z'
              fill='black'
            />
            <path d='M83.8278 95.4172L37.489 84.9277L36.7794 87.5009L83.1182 97.9904L83.8278 95.4172Z' fill='black' />
            <path
              d='M32.568 116C32.568 115.448 32.1203 115 31.568 115L22.568 115C22.0158 115 21.568 115.448 21.568 116C21.568 116.552 22.0158 117 22.568 117L30.568 117L30.568 125C30.568 125.552 31.0158 126 31.568 126C32.1203 126 32.568 125.552 32.568 125L32.568 116ZM15 132.568L15.7071 133.275L32.2751 116.707L31.568 116L30.8609 115.293L14.2929 131.861L15 132.568Z'
              fill='black'
            />
            <path
              d='M169 109C168.448 109 168 109.448 168 110L168 119C168 119.552 168.448 120 169 120C169.552 120 170 119.552 170 119L170 111L178 111C178.552 111 179 110.552 179 110C179 109.448 178.552 109 178 109L169 109ZM185.568 126.568L186.275 125.861L169.707 109.293L169 110L168.293 110.707L184.861 127.275L185.568 126.568Z'
              fill='black'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
