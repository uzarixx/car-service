import React, {FC} from 'react'
import styles from './SubmitButton.module.scss'
interface props {
  children: string;
  type: 'submit' | 'button';
  onClick?: () => void;
}
const SubmitButton: FC<props> = ({children, type, onClick}) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>{children}</button>
  )
}

export default SubmitButton;