import React, { FC } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import userService from '../../service/userService';
import Layout from '../../components/ui/layout/Layout';
import PickerDetail from '../../components/picker/PickerDetail';
import { pickerProps } from '@/constants/type';

const Picker: FC<pickerProps> = ({ picker, photos }) => {
  return (
    <Layout title={`Підбирач ${picker.userName} | AUTO-POSHUK`} description={''}>
      <PickerDetail picker={picker} photos={photos}/>
    </Layout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ params, req }: GetServerSidePropsContext) => {
  const { id } = params as { id: string };
  const { data } = await userService.getPickerById(id, req.cookies.authToken);
  return {
    props: {
      picker: data.picker,
      photos: data.photos
    },
  };
};

export default Picker;


