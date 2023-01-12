import React, { FC } from 'react';
import styles from './OfferDetail.module.scss';
import { offerProps } from '../../../constants/type';
import OfferDetailHead from './OfferDetailHead/OfferDetailHead';
import OfferDetailMain from './OfferDetailMain/OfferDetailMain';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import OfferDetailUser from './OfferDetailUser/OfferDetailUser';
import CreateChat from '../../ui/createChat/CreateChat';
import { useStore } from 'effector-react';
import { $data } from '../../../store/userData';

const OfferDetailComponent: FC<offerProps> = ({ offer }) => {
  const user: any = useStore($data)
  return (
    <>
      <OfferDetailHead id={offer.id} title={offer.title} />
      <SpacingMiddle />
      <div className={styles.offerContainer}>
        <div className={styles.leftOfferBlock}>
        <OfferDetailMain offer={offer} />
          {user.id !== offer.userId && <CreateChat userId={offer.userId} />}
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