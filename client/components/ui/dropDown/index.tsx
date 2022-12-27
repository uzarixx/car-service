import React, {FC} from 'react'
import styles from './DropDown.module.scss';

interface props {
  dropDown: any;
  onClickTown: any;
  top?: string;
}


const DropDown: FC<props> = ({dropDown, onClickTown, top}) => {
  return (
    <div className={styles.dropDown} style={{top: top}}>
      {dropDown?.map((el: { description: string }, i: number) => <p
        key={i}
        onClick={() => onClickTown(el.description)}>{el.description}</p>)}
    </div>
  )
}

export default DropDown;