import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './AllCarsPanel.module.scss';
import { carsArray } from './carsArray';

interface props {
  setClose: Dispatch<SetStateAction<boolean>>;
  setCar: Dispatch<SetStateAction<string>>;
}

const AllCarsPanel: FC<props> = ({ setClose, setCar }) => {
  const [value, setValue] = useState('')
  const onClose = () => {
    setClose(false)
  }
  const onSelectCart = (name: string) => {
    setClose(false)
    setCar(name)
  }
  return (
    <div className={styles.allCarsWrapper} onClick={onClose}>
      <div className={styles.allCarsBlock} onClick={(e) => e.stopPropagation()}>
        <span onClick={onClose}>Закрити</span>
        <input type='text' placeholder={'Введіть марку авто'} value={value} onChange={(e) => setValue(e.target.value)}/>
        {carsArray.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())).map((el, i) =>
          <div key={i} className={styles.brandWrapper} onClick={() => onSelectCart(el.name)}>
            <img src={el.image} alt={el.name} />
            <p>{el.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCarsPanel;