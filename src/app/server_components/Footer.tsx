import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-4 p-8 mt-12'>
      <Image src='/sole-searcher-logo.webp' alt='Sole Searcher Logo' width={250} height={250} priority />
      <p className='text-zinc-300'>
        Produced for{' '}
        <span className='text-sole-tan'>
          Search And Research
        </span>
      </p>
    </div>
  )
}

export default Footer
