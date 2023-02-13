import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import AccountComponent from '../../components/account';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import authServices from '../../service/authService';
import { redirectToHome } from '@/utils/protectRoute';
import { UserRole } from '@/constants/type';


const Offers: FC = () => {
  return (
    <Layout title={`Акаунт - Оголошення | AUTO-POSHUK`} description={'Список ваших оголошень, ви можете дивитись та видаляти свої оголошеня.'}>
      <AccountComponent />
    </Layout>
  );
};

export default Offers;

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const { data } = await authServices.getUserDataSSR(req.cookies.authToken);
  if (data.role !== UserRole.Client || !data) {
    return redirectToHome();
  }
  return {
    props: {},
  };

};
