import Link from 'next/link';
import React, { FC } from 'react';
import styles from './OfferDetailHead.module.scss';
import Arrow from '@/components/ui/icons/Arrow';


const OfferDetailHead: FC = () => {
  return (
    <div className={styles.linksContainer}>
      <div>
        <Link href={'/offer'} className={styles.mainBackButton}>
          <Arrow />
          Назад
        </Link>
      </div>
    </div>
  );
};

export default OfferDetailHead;