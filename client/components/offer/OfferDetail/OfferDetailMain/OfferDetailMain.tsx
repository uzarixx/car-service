import React, { FC } from 'react';
import styles from './OfferDetailMain.module.scss';
import { offerProps } from '../../../../constants/type';
import SpacingSmall from '../../../ui/spacings/SpacingSmall';
import SpacingMiddle from '../../../ui/spacings/SpacingMiddle';

const OfferDetailMain: FC<offerProps> = ({ offer }) => {
  return (
    <div className={styles.offerMainContainer}>
      <h3>{offer.title}</h3>
      <SpacingSmall />
      <h2>{offer.budget} {offer.currency}</h2>
      <h4>Бюджет за послуги: {offer.budgetService} ₴</h4>
      <SpacingMiddle />
      <div className={styles.carParameters}>
        <span>Марка авто: {offer.carBrand}</span>
        <span>Модель авто: {offer.carModel}</span>
        <span>Тип палива: {offer.carGas}</span>
        {offer.carForces && <span>Потужність: {offer.carForces} л.с</span>}
        {offer.carLiters && <span>Об{'\''}єм двигуна: {offer.carLiters} л.</span>}
        <span>Тип приводу: {offer.carDrive}</span>
        <span>Тип трансмісії: {offer.carTransmission}</span>
        <span>Тип кузову: {offer.carType}</span>
        {offer.carYear && <span>Рік авто: {offer.carYear}</span>}
      </div>
      <SpacingMiddle />
      <div className={styles.description}>
        <h2>Опис</h2>
        <SpacingSmall />
        <p>{offer.description}</p>
      </div>
    </div>
  );
};

export default OfferDetailMain;