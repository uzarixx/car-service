import React, { FC } from 'react';
import Layout from '../components/ui/layout/Layout';
import PostNewAdComponent from '../components/offerNewAd';
import { GetServerSideProps } from 'next';
import { redirectToHome } from '../utils/protectRoute';
import authServices from '../service/authService';


const OfferNewAd: FC = () => {
  return (
    <Layout>
      <PostNewAdComponent />
    </Layout>
  );
};

export default OfferNewAd;

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  const { data } = await authServices.getUserDataSSR(req.cookies.authToken);
  if (data.role !== 'Client' || !data) {
    return redirectToHome();
  }
  return {
    props: {},
  };

};
