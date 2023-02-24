import {FC, FormEvent, ReactNode} from 'react'
import './form.sass'

interface IProps {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const Form: FC<IProps> = ({children, onSubmit}) => (
  <form className='form' onSubmit={onSubmit}>
    {children}
  </form>
)

export default Form
