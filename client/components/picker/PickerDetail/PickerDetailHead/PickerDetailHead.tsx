import Link from 'next/link';
import React, { FC } from 'react';
import styles from './PickerDetailHead.module.scss';
import Arrow from '../../../ui/icons/Arrow';

interface props {
  id: number;
  title: string;
}


const PickerDetailHead: FC<props> = ({ id, title }) => {
  return (
    <div className={styles.linksContainer}>
      <div>
        <Link href={'/picker'} className={styles.mainBackButton}>
          <Arrow />
          Назад
        </Link>
      </div>
      <div className={styles.linksWrapper}>
        <Link href={'/'}>
          Головна
        </Link>
        /
        <Link href={`/picker/${id}`}>
          {title}
        </Link>
      </div>
    </div>
  );
};

export default PickerDetailHead;
