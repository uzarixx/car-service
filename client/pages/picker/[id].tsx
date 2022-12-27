import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import userService from '../../service/userService';
import Layout from '../../components/ui/layout/Layout';
import PickerDetail from '../../components/picker/PickerDetail';
import { pickerProps } from '../../constants/type';

const Picker: FC<pickerProps> = ({ picker }) => {
  return (
    <Layout>
      <PickerDetail picker={picker}/>
    </Layout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { id } = params;
  const { data } = await userService.getPickerById(id, req.cookies.authToken);
  return {
    props: {
      picker: data,
    },
  };

};

export default Picker;


