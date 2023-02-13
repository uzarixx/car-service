import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import offerService from '../../service/offerService';
import OfferComponent from '../../components/offer';
import { offersPropsResponse } from '@/constants/type';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Offer: FC<offersPropsResponse> = ({ offers }) => {
  return (
    <Layout title={`Всі оголошення | AUTO-POSHUK`}
            description={'Список оголошень, це дуже зручно та просто'}>
      <OfferComponent offers={offers?.rows} pageCount={offers?.count} />
    </Layout>
  );
};
export default Offer;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext) => {
  const {
    carTransmission,
    carType,
    carDrive,
    carGas,
    city,
    page,
  } = query as any;
  const offers = await offerService.getAllOffers(req.cookies.authToken, carTransmission, carType, carDrive, carGas, city, page);
  const response = offers.data;
  return {
    props: {
      offers: response,
    },
  };
};

