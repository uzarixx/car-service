import React, { FC, useState } from 'react';
import styles from './PickerDetailMain.module.scss';
import { pickerProps } from '../../../../constants/type';
import SpacingSmall from '../../../ui/spacings/SpacingSmall';
import LocationIco from '../../../ui/icons/LocationIco';
import LocationImage from '../../../ui/locationImage/locationImage';
import ButtonShowNumber from '../../../ui/buttons/buttonShowNumber/ButtonShowNumber';
import SliderGallery from '../../../ui/sliderGallery/SliderGallery';


const PickerDetailMain: FC<pickerProps> = ({ picker, photos }) => {
  const [phoneShower, setPhoneShower] = useState(false);
  const onClickNumber = () => {
    setPhoneShower(true);
  };
  return (
    <div className={styles.pickerMainContainer}>
      <div>
        <h2>{picker.userName}</h2>
        <SpacingSmall />
        <p>Опис:</p>
        <p className={styles.description}>{picker.description}</p>
        <SpacingSmall />
        <p>Досвід: {picker.experience}</p>
        <SpacingSmall />
        <p>Портфоліо</p>
        <SliderGallery photos={photos} />
        <SpacingSmall />
        <ButtonShowNumber
          phoneShower={phoneShower}
          onClick={onClickNumber}
          phoneNumber={picker.phoneNumber} />
      </div>
      <div>
        <div className={styles.location}>
          <h3>Місцезнаходження</h3>
          <SpacingSmall />
          <span
            className={styles.locationText}><LocationIco /> {picker.city}</span>
          <SpacingSmall />
          <LocationImage city={picker.city} />
        </div>
      </div>
    </div>
  );
};

export default PickerDetailMain;