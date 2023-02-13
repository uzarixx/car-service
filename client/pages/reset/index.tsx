import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
import ResetComponent from '../../components/reset/index';

const Reset: FC = () => {
  return (
    <Layout title={'Відновлення паролю | AUTO-POSHUK'} description={''}>
      <ResetComponent />
    </Layout>
  );
};

export default Reset;