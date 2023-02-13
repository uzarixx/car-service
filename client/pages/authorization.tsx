import React, { FC } from 'react';
import AuthorizationForm from '../components/authorization';
import Layout from "../components/ui/layout/Layout";


const Authorization: FC = () => {
  return (
    <Layout title={'Рєестрація | AUTO-POSHUK'} description={'Швидка та зручна реєстрація'}>
      <AuthorizationForm />
    </Layout>
  );
};

export default Authorization;