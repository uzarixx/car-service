import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { redirectToHome } from '../../utils/protectRoute';
import userService from '../../service/userService';
import Layout from '../../components/ui/layout/Layout';
import { userProps } from '../../constants/type';
import PickerComponent from '../../components/picker';


const Picker: FC<userProps> = ({ users }) => {
  return (
    <Layout>
      <PickerComponent users={users} />
    </Layout>
  );
};

export default Picker;

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  let pickers;
  try {
    pickers = await userService.getAllPickers(req.cookies.authToken);
  } catch (e) {
    console.log(e);
    return redirectToHome();
  }
  const response = pickers.data;
  return {
    props: {
      users: response,
    },
  };
};
