import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import { redirectToHome } from '@/utils/protectRoute';
import favoriteService from '../../service/favoriteService';
import FavoriteComponent from '../../components/favorite';
import {offersPropsResponse } from '@/constants/type';
import { GetServerSidePropsContext } from 'next';

const Favorite: FC<offersPropsResponse> = ({ offers }) => {
  return (
    <Layout title={'Збережені оголошення | AUTO-POSHUK'} description={'Збережені оглошення, все дуже зручно, та просто, за один клік додавайте в список збережених оголошення які вам сободобались'}>
      <FavoriteComponent offers={offers?.rows} pageCount={offers?.count} />
    </Layout>
  );
};

export default Favorite;

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  let offers;
  try {
    offers = await favoriteService.getFavoriteSSR(req.cookies.authToken);
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