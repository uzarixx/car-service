import React, {FC} from 'react'
import styles from './SubmitButton.module.scss'
interface props {
  children: string;
}
const SubmitButton: FC<props> = ({children}) => {
  return (
    <button type={'submit'} className={styles.button}>{children}</button>
  )
}

export default SubmitButton;