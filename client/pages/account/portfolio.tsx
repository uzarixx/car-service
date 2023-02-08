import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import AccountComponent from '../../components/account';
import { GetServerSideProps } from 'next';
import authServices from '../../service/authService';
import { redirectToHome } from '../../utils/protectRoute';
import { UserRole } from '../../constants/type';


const Portfolio: FC = () => {
  return (
    <Layout title={'Акаунт - Портфоліо'} description={'Налаштування вашого особистого портфоліо, це дуже просто та зручно!'}>
      <AccountComponent />
    </Layout>
  );
};
export default Portfolio;

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  const { data } = await authServices.getUserDataSSR(req.cookies.authToken);
  if (data.role !== UserRole.Picker || !data) {
    return redirectToHome();
  }
  return {
    props: {},
  };

};
