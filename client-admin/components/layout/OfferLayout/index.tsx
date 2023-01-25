import React, { FC } from 'react';
import styles from './OfferLayout.module.scss';
import Navigation from '@components/navigation';
import OfferDetail from '@components/offer/offerDetail';

const OfferLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <OfferDetail />
    </div>
  );
};

export default OfferLayout;