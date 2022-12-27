import Link from 'next/link';
import React, { FC } from 'react';
import styles from './OfferDetailHead.module.scss';
import Arrow from '../../../ui/icons/Arrow';

interface props {
  id: number;
  title: string;
}


const OfferDetailHead: FC<props> = ({ id, title }) => {
  return (
    <div className={styles.linksContainer}>
      <div>
        <Link href={'/offer'} className={styles.mainBackButton}>
          <Arrow />
          Назад
        </Link>
      </div>
      <div className={styles.linksWrapper}>
        <Link href={'/'}>
          Головна
        </Link>
        /
        <Link href={`/offer/${id}`}>
          {`${title.slice(0, 20)}...`}
        </Link>
      </div>
    </div>
  );
};

export default OfferDetailHead;