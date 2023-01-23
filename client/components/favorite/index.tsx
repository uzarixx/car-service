import React, { FC, useState } from 'react';
import styles from './Favorite.module.scss';
import { offersProps } from '@/constants/type';
import OffersMain from '../offer/OffersMain/OffersMain';
import favoriteService from '@/service/favoriteService';
import { useFavorite } from '@/utils/useFavorite';
import EmptyIcon from '../ui/icons/EmptyIcon';

const FavoriteComponent: FC<offersProps> = ({ offers }) => {
  const [isEmpty, setIsEmpty] = useState(offers.length);
  const { onDeleteFavorite, favorite } = useFavorite();
  const [offerFavorite, setOfferFavorite] = useState(offers || []);
  const onDelete = async (id: number) => {
    await onDeleteFavorite(id);
    const { data } = await favoriteService.getFavorite();
    setOfferFavorite(data.rows);
    setIsEmpty(data.rows.length);
  };

  if (isEmpty <= 0) {
    return (
      <div className={styles.empty}>
        <EmptyIcon />
        <h3>Немає обраних оголошень</h3>
        <p>Додати в обране можна зі сторінки оголошення або зі сторінки списку
          оголошень</p>
        <p>Тепер обрані оголошення завжди доступні на будь-якому комп{'\''}ютері,
          а також на мобільній версії сайту, після входу в Мої оголошення</p>
      </div>
    );
  }

  return (
    <>
      <OffersMain
        offers={offerFavorite}
        onDeleteFavorite={onDelete}
        favorite={favorite} />
    </>
  );
};

export default FavoriteComponent;