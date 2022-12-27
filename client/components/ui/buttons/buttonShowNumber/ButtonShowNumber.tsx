import React, { FC } from 'react';
import styles from './ButtonShowNumber.module.scss';
import Link from 'next/link';

interface props {
  onClick: () => void;
  phoneShower: boolean;
  phoneNumber: string;
}

const ButtonShowNumber: FC<props> = ({ onClick, phoneShower, phoneNumber }) => {
  return (
    <span onClick={onClick} className={styles.phoneNumber}>
      {phoneShower ? <Link
        href={`tel:${phoneNumber}`}>{phoneNumber}</Link> : 'Показати телефон'}
    </span>
  );
};

export default ButtonShowNumber;