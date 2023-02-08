import React, { FC } from 'react';
import Main from '../components/main';
import Layout from '../components/ui/layout/Layout';

const Home: FC = () => {

  return (
    <Layout title={'Головна'}>
      <Main />
    </Layout>
  );
};

export default Home;

