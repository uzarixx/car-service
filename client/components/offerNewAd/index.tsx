import React, { FC } from 'react';
import OfferNewAdForm from './OfferNewAdForm/OfferNewAdForm';
import SpacingMiddle from '../ui/spacings/SpacingMiddle';

const OfferNewAdComponent: FC = () => {
  return (
    <>
      <h2>Створити оголошення</h2>
      <SpacingMiddle />
      <OfferNewAdForm />
    </>
  );
};


export default OfferNewAdComponent;

