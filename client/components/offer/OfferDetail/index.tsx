import React, { FC } from 'react';
import styles from './OfferDetail.module.scss';
import { offerProps } from '@/constants/type';
import OfferDetailHead from './OfferDetailHead/OfferDetailHead';
import OfferDetailMain from './OfferDetailMain/OfferDetailMain';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import OfferDetailUser from './OfferDetailUser/OfferDetailUser';

const OfferDetailComponent: FC<offerProps> = ({ offer }) => {
  return (
    <>
      <OfferDetailHead id={offer.id} title={offer.title} />
      <SpacingMiddle />
      <div className={styles.offerContainer}>
        <div className={styles.leftOfferBlock}>
        <OfferDetailMain offer={offer} />
        </div>
        <OfferDetailUser
          userName={offer.userName}
          city={offer.city}
          phoneNumber={offer.phoneNumber} />
      </div>
    </>
  );
};

export default OfferDetailComponent;