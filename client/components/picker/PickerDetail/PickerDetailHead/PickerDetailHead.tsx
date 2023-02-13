import Link from 'next/link';
import React, { FC } from 'react';
import styles from './PickerDetailHead.module.scss';
import Arrow from '@/components/ui/icons/Arrow';



const PickerDetailHead: FC = () => {
  return (
    <div className={styles.linksContainer}>
      <div>
        <Link href={'/picker'} className={styles.mainBackButton}>
          <Arrow />
          Назад
        </Link>
      </div>
    </div>
  );
};

export default PickerDetailHead;
