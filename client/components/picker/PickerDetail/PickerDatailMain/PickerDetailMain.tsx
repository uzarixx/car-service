import React, { FC, useState } from 'react';
import styles from './PickerDetailMain.module.scss';
import { pickerProps } from '@/constants/type';
import SpacingSmall from '@/components//ui/spacings/SpacingSmall';
import ButtonShowNumber
  from '@/components/ui/buttons/buttonShowNumber/ButtonShowNumber';
import SliderGallery from '@/components/ui/sliderGallery/SliderGallery';
import UserBigIcon from '@/components/ui/icons/UserBigIcon';
import CreateChat from '@/components/ui/createChat/CreateChat';


const PickerDetailMain: FC<pickerProps> = ({ picker, photos, photo }) => {
  const [phoneShower, setPhoneShower] = useState(false);
  const onClickNumber = () => {
    setPhoneShower(true);
  };
  return (
    <div className={styles.pickerMainContainer}>
      <div>
        <div className={styles.avatar}>
          {photo ? <img src={photo} alt='user-avatar' /> : <UserBigIcon />}
        </div>
        <h2>{picker.userName}, {picker.city}</h2>
        <SpacingSmall />
        <ButtonShowNumber
          phoneShower={phoneShower}
          onClick={onClickNumber}
          phoneNumber={picker.phoneNumber} />
        <SpacingSmall />
        <p>Опис:</p>
        <p className={styles.description}>{picker.description}</p>
        <SpacingSmall />
        <p>Досвід: {picker.experience}</p>
        <SpacingSmall />
        {photos.length >= 1 &&
          <>
            <p>Портфоліо</p>
            <SliderGallery photos={photos} />
            <SpacingSmall />
          </>}
        <CreateChat userId={picker.id} />
      </div>
    </div>
  );
};

export default PickerDetailMain;