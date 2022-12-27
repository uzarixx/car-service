import React, { FC } from 'react';
import styles from './DeleteOfferAlert.module.scss';
import offerService from '../../../../service/offerService';
import ButtonGreen from '../../buttons/buttonGreen';

interface props {
  active: boolean;
  fetchOffers: () => void;
  id: number;
  setActive: (arg: boolean) => void;
}

const DeleteOfferAlert: FC<props> = ({
  active,
  fetchOffers,
  id,
  setActive,
}) => {

  const onDeleteOffer = async () => {
    await offerService.deleteOffer(id);
    fetchOffers();
  };

  const onCloseAlert = () => {
    console.log('412');
    setActive(false);
  };

  return (
    <div
      className={`${styles.deleteOfferAlert} ${active ? styles.active : ''}`} onClick={onCloseAlert}>
      <div className={styles.alertBlock}>
        <p>Видалити оголошення?</p>
        <div className={styles.buttons}>
          <ButtonGreen onClick={onDeleteOffer}>Так</ButtonGreen>
          <ButtonGreen>Ні</ButtonGreen>
        </div>
      </div>
    </div>
  );
};

export default DeleteOfferAlert;