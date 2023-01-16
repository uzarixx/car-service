import React, { FC } from 'react';
import { userProps } from '../../constants/type';
import PickerMain from './PickersMain/PickerMain';
import Pagination from '../ui/pagination/Pagination';

const PickerComponent: FC<userProps> = ({ users }) => {
  return (
    <>
      <PickerMain users={users} />
      <Pagination pageCount={2} paginateRoute={'picker'}/>
    </>
  );
};

export default PickerComponent;