import React, { FC } from 'react';
import { pickerProps } from '@/constants/type';
import PickerDetailHead from './PickerDetailHead/PickerDetailHead';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import PickerDetailMain from './PickerDatailMain/PickerDetailMain';


const PickerDetail: FC<pickerProps> = ({ picker, photos }) => {
  return (
    <>
      <PickerDetailHead id={picker.id} title={picker.userName} />
      <SpacingMiddle />
      <PickerDetailMain picker={picker} photos={photos} photo={picker.photo}/>

    </>
  );
};

export default PickerDetail;