import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import offerService from '../../service/offerService';
import { offerProps } from '@/constants/type';
import OfferDetailComponent from '../../components/offer/OfferDetail';

const Offer: FC<offerProps> = ({ offer }) => {
  return (
    <Layout title={`Кліент ${offer.userName} | AUTO-POSHUK`} description={''}>
      <OfferDetailComponent offer={offer} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }: GetServerSidePropsContext) => {
  const { id } = params as { id: string };
  const { data } = await offerService.getOfferById(id, req.cookies.authToken);
  return {
    props: {
      offer: data,
    },
  };

};

export default Offer;