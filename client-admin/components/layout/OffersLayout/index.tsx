import React, { FC } from 'react';
import styles from './OffersLayout.module.scss';
import Navigation from '@components/navigation';
import OfferCard from '@components/offer/offerCard';

const OffersLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.offersWrapper}>
        <OfferCard />
      </div>
    </div>
  );
};

export default OffersLayout;