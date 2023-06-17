import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ as, className, children, ...props }) => {
  const Tag = as as keyof JSX.IntrinsicElements
  return (
    <Tag className={twMerge('font-semibold leading-6 text-sole-tan mt-4', className)} {...props}>
      {children}
    </Tag>
  )
}

export default Header
