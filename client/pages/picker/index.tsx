import React, { FC } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import userService from '../../service/userService';
import Layout from '../../components/ui/layout/Layout';
import { userProps } from '@/constants/type';
import PickerComponent from '../../components/picker';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';


const Picker: FC<userProps> = ({ users, count }) => {
  return (
    <Layout
      title={'Всі підбирачі авто | AUTO-POSHUK'}
      description={'Список підбирачів авто, це дуже зручно та просто'}>
      <SpacingSmall />
      <PickerComponent users={users} count={count} />
    </Layout>
  );
};

export default Picker;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext) => {
  const { page, city } = query as { page: string, city: string };
  const pickers = await userService.getAllPickers(req.cookies.authToken, page, city);
  const response = pickers.data;
  return {
    props: {
      users: response.rows,
      count: response.count,
    },
  };
};
