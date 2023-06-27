import { Dispatch } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: Dispatch<any>
}

const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <button
      type='button'
      className='p-2 text-white rounded-full shadow-sm bg-sole-green hover:bg-sole-tan hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sole-green'
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}

export default Button
