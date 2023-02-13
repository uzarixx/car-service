import React, { FC } from 'react';
import Layout from '../components/ui/layout/Layout';
import PostNewAdComponent from '../components/offerNewAd';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { redirectToHome, redirectToIndex } from '@/utils/protectRoute';
import authServices from '../service/authService';


const OfferNewAd: FC = () => {
  return (
    <Layout title={'Створення оголошення | AUTO-POSHUK'}
            description={'Свторюйте оголошення, швидко та зручно!'}>
      <PostNewAdComponent />
    </Layout>
  );
};

export default OfferNewAd;

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  if (req.cookies.authToken) {
    const { data } = await authServices.getUserDataSSR(req.cookies.authToken);
    if (data.role !== 'Client' || !data) {
      return redirectToHome();
    }
  } else {
    return redirectToIndex();
  }
  return {
    props: {},
  };

};
