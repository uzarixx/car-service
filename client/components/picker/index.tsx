import React, { FC } from 'react';
import { userProps } from '../../constants/type';
import PickerMain from './PickersMain/PickerMain';

const PickerComponent: FC<userProps> = ({ users }) => {
  return (
    <>
      <PickerMain users={users} />
    </>
  );
};

export default PickerComponent;