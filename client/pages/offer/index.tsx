import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import offerService from '../../service/offerService';
import OfferComponent from '../../components/offer';
import { offersPropsResponse } from '../../constants/type';
import { redirectToHome } from '../../utils/protectRoute';

const Offer: FC<offersPropsResponse> = ({ offers }) => {
  return (
    <Layout>
      <OfferComponent offers={offers?.rows} pageCount={offers?.count} />
    </Layout>
  );
};
export default Offer;

export const getServerSideProps = async ({ req, query }: any) => {
  const { carTransmission, carType, carDrive, carGas, city, page } = query;
  let offers;
  try {
    offers = await offerService.getAllOffers(req.cookies.authToken, carTransmission, carType, carDrive, carGas, city, page);
  } catch (e) {
    console.log(e);
    return redirectToHome();
  }
  const response = offers.data;
  return {
    props: {
      offers: response,
    },
  };
};
