import React, {FC} from 'react'
import styles from './Input.module.scss'

interface props {
  filterCity: (e: string) => void
  value?: string;
}

const Input: FC<props> = ({filterCity, value}) => {
  return (
    <input className={styles.input} type='text' placeholder={'Місто'} onChange={(e) => filterCity(e.target.value)} value={value}/>
  )
}

export default Input;