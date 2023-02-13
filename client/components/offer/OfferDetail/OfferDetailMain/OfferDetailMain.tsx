import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './OfferDetailMain.module.scss';
import { offerProps } from '@/constants/type';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import CreateChat from '@/components/ui/createChat/CreateChat';
import { useStore } from 'effector-react';
import { $data } from '@/store/userData';
import ButtonGreen from '@/components/ui/buttons/buttonGreen';
import ButtonLinkGreen
  from '@/components/ui/buttons/buttonLinks/ButtonLinkGreen';

const OfferDetailMain: FC<offerProps> = ({ offer }) => {
  const user: any = useStore($data);
  const userArray = Object.keys(user);
  const [openDesc, setOpenDesc] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const ref = useRef<any>(null);
  useEffect(() => {
    setDescHeight(ref.current.clientHeight);
  }, []);
  const onOpenDesc = () => {
    setOpenDesc(true);
  };

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
        {offer.carLiters &&
          <span>Об{'\''}єм двигуна: {offer.carLiters} л.</span>}
        <span>Тип приводу: {offer.carDrive}</span>
        <span>Тип трансмісії: {offer.carTransmission}</span>
        <span>Тип кузову: {offer.carType}</span>
        {offer.carYear && <span>Рік авто: {offer.carYear}</span>}
      </div>
      <SpacingMiddle />
      <div className={`${styles.description} ${openDesc && styles.active}`}
           ref={ref}>
        <h2>Опис</h2>
        <SpacingSmall />
        <p>{offer.description}</p>
        {
          descHeight >= 250 &&
          !openDesc &&
          <ButtonGreen onClick={onOpenDesc}>
            Детальніше
          </ButtonGreen>
        }
      </div>
      <SpacingMiddle />
      {user.id !== offer.userId && userArray.length >= 1 ?
        <CreateChat userId={offer.userId} /> :
        <> {
          user.id === offer.userId ||
          <div className={styles.linkWrapper}><ButtonLinkGreen
            href={'/authorization'}>Реєстрація</ButtonLinkGreen></div>
        }</>
      }
    </div>

  );
};

export default OfferDetailMain;