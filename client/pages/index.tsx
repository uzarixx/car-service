import React, { FC } from 'react';
import Main from '../components/main';
import Layout from '../components/ui/layout/Layout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import authServices from '@/service/authService';
import {
  redirectToIndex,
  redirectToOffer,
  redirectToPicker,
} from '@/utils/protectRoute';
import { UserRole } from '@/constants/type';

const Home: FC = () => {

  return (
    <Layout title={'Головна | AUTO-POSHUK'}
            description={'AUTO-POSHUK - зручно, бистро, приємно'}>
      <Main />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  if (req.cookies.authToken) {
    const { data } = await authServices.getUserDataSSR(req.cookies.authToken);
    if (!data) {
      return redirectToIndex();
    } else if (data.role === UserRole.Picker) {
      return redirectToOffer();
    } else if (data.role === UserRole.Client) {
      return redirectToPicker();
    }
  }
  return {
    props: {},
  };

};
