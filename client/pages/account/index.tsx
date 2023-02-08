import React, {FC} from 'react';
import AccountComponent from '../../components/account';
import Layout from "../../components/ui/layout/Layout";

const Account: FC = () => {
  return (
    <Layout title={`Акаунт - Головна`} description={'Налаштування вашого акаунту, пропонуємо вам заповниту анкету, і наша модерація допоможе вам з вашою веріфікацією'}>
      <AccountComponent/>
    </Layout>
  );
};

export default Account;