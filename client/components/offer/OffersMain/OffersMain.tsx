import React, { FC } from 'react';
import styles from './OffersMain.module.scss';
import { offersProps } from '../../../constants/type';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import { useRouter } from 'next/router';
import date from '../../../utils/date';
import ButtonGreen from '../../ui/buttons/buttonGreen';

const OffersMain: FC<offersProps> = ({ offers }) => {
  const router = useRouter()
  const onClickOffer = (id: number) => {
  router.push(`/offer/${id}`)
  }
  return (
    <div className={styles.offersWrapper}>
      {offers.map((el, i) =>
        <div key={i} className={styles.offerBlock} onClick={() => onClickOffer(el.id)}>
          <h4>{el.title}</h4>
          <span className={styles.date}>Дата створення: {date(el.createdAt)}</span>
          <SpacingSmall />
          <p>Авто: {el.carBrand} {el.carModel}</p>
          <SpacingSmall />
          <p>Опис:</p>
          <p className={styles.description}>{el.description.slice(0, 45)}...</p>
          <SpacingSmall />
          <p>Бюджет за послуги: {el.budgetService} грн.</p>
          <SpacingSmall />
          <p>Бюджет на авто: {el.budget} {el.currency}</p>
          <SpacingSmall />
          <p>Місто: {el.city}</p>
          <SpacingSmall />
          <ButtonGreen>Відкрити</ButtonGreen>
        </div>
      )}
    </div>
  );
};

export default OffersMain;