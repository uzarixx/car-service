import React, { FC } from 'react';
import { offersProps } from '@/constants/type';
import OffersMain from './OffersMain/OffersMain';
import OffersFiltered from './OffersFiltered';
import Pagination from '../ui/pagination/Pagination';
import { useFavorite } from '@/utils/useFavorite';


const OfferComponent: FC<offersProps> = ({ offers, pageCount }) => {
  const { onAddFavorite, onDeleteFavorite, favorite, } = useFavorite()
  return (
    <>
      <OffersFiltered />
      <OffersMain offers={offers} onAddFavorite={onAddFavorite}
                  onDeleteFavorite={onDeleteFavorite} favorite={favorite} />
      <Pagination pageCount={pageCount || 10} paginateRoute={'offer'} />
    </>
  );
};

export default OfferComponent;