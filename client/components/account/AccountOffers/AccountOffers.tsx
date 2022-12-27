import React, { FC, useEffect, useState } from 'react';
import styles from './AccountOffers.module.scss';
import offerService from '../../../service/offerService';
import date from '../../../utils/date';
import ButtonLinkGreen from '../../ui/buttons/buttonLinks/ButtonLinkGreen';
import PreloaderDots from '../../ui/preloaders/PreloaderDots';
import DeleteOfferAlert
  from '../../ui/alerts/deleteOfferAlert/DeleteOfferAlert';

interface offerType {
  title: string;
  id: number;
  description: string;
  createdAt: string;
}


const AccountOffers: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alertActive, setAlertActive] = useState(false)
  const [offerId, setOfferId] = useState(0)
  const [offers, setOffers] = useState([]);
  const fetchOffers = async () => {
    const { data } = await offerService.getOffers();
    setOffers(data);
    await setIsLoading(false);
  };
  useEffect(() => {
    fetchOffers();
  }, []);

  const onDeleteOffer = (id: number) => {
    setOfferId(id)
    setAlertActive(true)
  }

  return (
    <div className={styles.accountSettingsWrapper}>
      <h2>Мої оголошення</h2>
      {isLoading && <PreloaderDots />}
      {offers.length <= 0 && <h4>Поки що тут пусто</h4>}
      <div className={styles.offersWrapper}>
        {offers.map((el: offerType, i: number) =>
          <div key={i} className={styles.offerBlock}>
            <h3>{el.title}</h3>
            <DeleteOfferAlert active={alertActive} setActive={setAlertActive} fetchOffers={fetchOffers} id={offerId}/>
            <button className={styles.deleteButton} onClick={()=>onDeleteOffer(el.id)}>Видалити оголошення</button>
            <span>{el.description}</span>
            <div className={styles.offerFooter}>
              <p>{date(el.createdAt)}</p>
              <ButtonLinkGreen
                href={`/offer/${el.id}`}>Показати</ButtonLinkGreen>
            </div>
          </div>,
        )}
      </div>
    </div>
  );
};

export default AccountOffers;