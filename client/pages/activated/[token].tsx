import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import ActivatedComponent from '../../components/activated';
const Activated: FC = () => {
  return (
    <Layout title={`Активація акаунту | AUTO-POSHUK`} description={'Активація акаунту, це нам допомогає підтвердити те що ваш акаунт дійсний'}>
      <ActivatedComponent />
    </Layout>
  );
};

export default Activated;