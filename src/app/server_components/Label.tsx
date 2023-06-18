import { twMerge } from "tailwind-merge"

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  name: string
  children: React.ReactNode
  className?: string
}

const Label: React.FC<LabelProps> = ({ name, children, className, ...props }) => {
  return (
    <label htmlFor={name} {...props} className={twMerge('block font-medium text-sole-tan', className)}>
      {children}
    </label>
  )
}

export default Label
