import React, {FC} from 'react';
import AccountComponent from '../../components/account';
import Layout from "../../components/ui/layout/Layout";

const Account: FC = () => {
  return (
    <Layout>
      <AccountComponent/>
    </Layout>
  );
};

export default Account;