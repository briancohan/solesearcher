interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  name: string
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({ name, children, ...props }) => {
  return (
    <label htmlFor={name} {...props} className='block font-medium text-sole-tan'>
      {children}
    </label>
  )
}

export default Label
