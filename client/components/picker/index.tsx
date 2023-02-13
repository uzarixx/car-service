import React, { FC } from 'react';
import { userProps } from '@/constants/type';
import PickerMain from './PickersMain/PickerMain';
import Pagination from '../ui/pagination/Pagination';

const PickerComponent: FC<userProps> = ({ users, count }) => {

  return (
    <>
      <PickerMain users={users} />
      <Pagination pageCount={Number(count)} paginateRoute={'picker'}/>
    </>
  );
};

export default PickerComponent;