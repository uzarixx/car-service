import React, {FC} from 'react'
import styles from './Input.module.scss'

interface props {
  filterCity: (e: string) => void
}

const Input: FC<props> = ({filterCity}) => {
  return (
    <input className={styles.input} type='text' placeholder={'Місто'} onChange={(e) => filterCity(e.target.value)}/>
  )
}

export default Input;