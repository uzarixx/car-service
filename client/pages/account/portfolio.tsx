import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import AccountComponent from '../../components/account';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import authServices from '../../service/authService';
import { redirectToHome } from '@/utils/protectRoute';
import { UserRole } from '@/constants/type';


const Portfolio: FC = () => {
  return (
    <Layout title={'Акаунт - Портфоліо | AUTO-POSHUK'} description={'Налаштування вашого особистого портфоліо, це дуже просто та зручно!'}>
      <AccountComponent />
    </Layout>
  );
};
export default Portfolio;

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const { data } = await authServices.getUserDataSSR(req.cookies.authToken);
  if (data.role !== UserRole.Picker || !data) {
    return redirectToHome();
  }
  return {
    props: {},
  };

};
