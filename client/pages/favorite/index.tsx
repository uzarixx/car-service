import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import { redirectToHome } from '../../utils/protectRoute';
import favoriteService from '../../service/favoriteService';
import FavoriteComponent from '../../components/favorite';
import {offersPropsResponse } from '../../constants/type';

const Favorite: FC<offersPropsResponse> = ({ offers }) => {
  return (
    <Layout>
      <FavoriteComponent offers={offers?.rows} pageCount={offers?.count} />
    </Layout>
  );
};

export default Favorite;

export const getServerSideProps = async ({ req }: any) => {
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