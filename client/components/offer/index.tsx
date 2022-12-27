import React, { FC } from 'react';
import { offersProps } from '../../constants/type';
import OffersMain from './OffersMain/OffersMain';

const OfferComponent: FC<offersProps> = ({ offers }) => {
  return (
    <>
      <OffersMain offers={offers} />
    </>
  );
};

export default OfferComponent;