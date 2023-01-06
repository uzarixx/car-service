import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import offerService from '../../service/offerService';
import OfferComponent from '../../components/offer';
import { offersProps } from '../../constants/type';
import { redirectToHome } from '../../utils/protectRoute';

const Offer: FC<offersProps> = ({ offers }) => {
  return (
    <Layout>
      <OfferComponent offers={offers} />
    </Layout>
  );
};
export default Offer;

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  let offers;
  try {
    offers = await offerService.getAllOffers(req.cookies.authToken);
  } catch (e) {
    return redirectToHome();
  }
  const response = offers.data;
  return {
    props: {
      offers: response,
    },
  };
};
