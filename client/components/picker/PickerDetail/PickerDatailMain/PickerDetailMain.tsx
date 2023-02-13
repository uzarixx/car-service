import React, { FC, useState } from 'react';
import styles from './PickerDetailMain.module.scss';
import { pickerProps, UserRole } from '@/constants/type';
import SpacingSmall from '@/components//ui/spacings/SpacingSmall';
import ButtonShowNumber
  from '@/components/ui/buttons/buttonShowNumber/ButtonShowNumber';
import SliderGallery from '@/components/ui/sliderGallery/SliderGallery';
import UserBigIcon from '@/components/ui/icons/UserBigIcon';
import CreateChat from '@/components/ui/createChat/CreateChat';
import { useStore } from 'effector-react';
import { $data } from '@/store/userData';
import ButtonLinkGreen
  from '@/components/ui/buttons/buttonLinks/ButtonLinkGreen';


const PickerDetailMain: FC<pickerProps> = ({ picker, photos, photo }) => {
  const user: any = useStore($data);
  const userArray = Object.keys(user);
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
        {userArray.length >= 1 &&
          <ButtonShowNumber
            phoneShower={phoneShower}
            onClick={onClickNumber}
            phoneNumber={picker.phoneNumber} />
        }
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
        {userArray.length <= 1 ? <div className={styles.linkWrapper}><ButtonLinkGreen
          href={'/authorization'}>Реєстрація</ButtonLinkGreen>
        </div> : <> {picker.id !== user?.id &&
          <CreateChat userId={picker.id} />} </>}
      </div>
    </div>
  );
};

export default PickerDetailMain;