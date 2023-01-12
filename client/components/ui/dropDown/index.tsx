import React, {FC} from 'react'
import styles from './DropDown.module.scss';

interface props {
  dropDown: {description: string}[];
  onClickTown: (e: string) => void;
  top?: string;
}


const DropDown: FC<props> = ({dropDown, onClickTown, top}) => {
  console.log(onClickTown);
  return (
    <div className={styles.dropDown} style={{top: top}}>
      {dropDown?.map((el: { description: string }, i: number) => <p
        key={i}
        onClick={() => onClickTown(el.description)}>{el.description}</p>)}
    </div>
  )
}

export default DropDown;