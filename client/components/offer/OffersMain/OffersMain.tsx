import React, { FC} from 'react';
import styles from './OffersMain.module.scss';
import { offersProps } from '@/constants/type';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import { useRouter } from 'next/router';
import date from '@/utils/date';
import CarIco from '@/components/ui/icons/CarIco';
import LocationIco from '@/components/ui/icons/LocationIco';
import UserGarantIco from '@/components/ui/icons/UserGarantIco';
import PaymentIco from '@/components/ui/icons/PaymentIco';
import FavoriteBorderIco from '@/components/ui/icons/FavoriteBorderIco';
import FavoriteIco from '@/components/ui/icons/FavoriteIco';


const OffersMain: FC<offersProps> = ({ offers, onAddFavorite, onDeleteFavorite, favorite }) => {
  const router = useRouter();
  const onClickOffer = async (id: number) => {
   await router.push(`/offer/${id}`);
  };
  return (
    <div className={styles.offersWrapper}>
      {offers.map((el, i) =>
        <div key={i} className={styles.offerBlock}
             onClick={() => onClickOffer(el.id)}>
          <h4>{el.title}</h4>
          <div onClick={(e) => e.stopPropagation()} className={styles.favorite}>
            {favorite?.includes(el.id) ?
              <div onClick={() => onDeleteFavorite && onDeleteFavorite(el.id)}>
                <FavoriteIco />
              </div> :
              <div onClick={() => onAddFavorite && onAddFavorite(el.id)}>
                <FavoriteBorderIco />
              </div>}
          </div>
          <span
            className={styles.date}>Дата створення: {date(el.createdAt)}</span>
          <SpacingSmall />
          <div className={styles.paramsOffer}>
            <p><CarIco /> {el.carBrand} {el.carModel}</p>
            <span></span>
            <p><LocationIco /> {el.city}</p>
            <span></span>
            <p><UserGarantIco /> Бюджет за послуги: {el.budgetService} грн.</p>
            <span></span>
            <p><PaymentIco />Бюджет на авто: {el.budget} {el.currency}</p>
          </div>
          <SpacingSmall />
          <p>Опис:</p>
          <p className={styles.description}>{el.sliceDesc}...</p>
        </div>,
      )}
    </div>
  );
};

export default OffersMain;