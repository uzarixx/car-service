import React, { FC } from 'react';
import { pickerProps } from '../../../constants/type';
import PickerDetailHead from './PickerDetailHead/PickerDetailHead';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import PickerDetailMain from './PickerDatailMain/PickerDetailMain';
import CreateChat from '../../ui/createChat/CreateChat';


const PickerDetail: FC<pickerProps> = ({ picker, photos }) => {
  return (
    <>
      <PickerDetailHead id={picker.id} title={picker.userName} />
      <SpacingMiddle />
      <PickerDetailMain picker={picker} photos={photos}/>
      <CreateChat userId={picker.id}/>
    </>
  );
};

export default PickerDetail;