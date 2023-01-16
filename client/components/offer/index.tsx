import React, { FC } from 'react';
import { offersProps } from '../../constants/type';
import OffersMain from './OffersMain/OffersMain';
import OffersFiltered from './OffersFiltered';
import Pagination from '../ui/pagination/Pagination';

const OfferComponent: FC<offersProps> = ({ offers,pageCount }) => {
  return (
    <>
      <OffersFiltered/>
      <OffersMain offers={offers} />
      <Pagination pageCount={pageCount || 10} paginateRoute={'offer'}/>
    </>
  );
};

export default OfferComponent;