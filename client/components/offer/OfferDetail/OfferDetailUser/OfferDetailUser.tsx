import React, { FC, useState } from 'react';
import styles from './OfferDetailUser.module.scss';
import SpacingMiddle from '../../../ui/spacings/SpacingMiddle';
import SpacingSmall from '../../../ui/spacings/SpacingSmall';
import LocationIco from '../../../ui/icons/LocationIco';
import LocationImage from '../../../ui/locationImage/locationImage';
import ButtonShowNumber
  from '../../../ui/buttons/buttonShowNumber/ButtonShowNumber';

interface props {
  userName: string;
  city: string;
  phoneNumber: string;
}

const OfferDetailUser: FC<props> = ({ userName, city, phoneNumber }) => {
  const [phoneShower, setPhoneShower] = useState(false);
  const onClickNumber = () => {
    setPhoneShower(true);
  };
  return (
    <div className={styles.offerUserContainer}>
      <h3>Користувач</h3>
      <SpacingMiddle />
      <div className={styles.userInfo}>
        <p>{userName}</p>
        <SpacingSmall />
        <ButtonShowNumber onClick={onClickNumber} phoneShower={phoneShower}
                          phoneNumber={phoneNumber} />
      </div>
      <SpacingMiddle />
      <div className={styles.location}>
        <h3>
          Місцезнаходження
        </h3>
        <SpacingSmall />
        <div className={styles.locationWrapper}>
          <div className={styles.locationName}><LocationIco /> {city}</div>
          <SpacingSmall />
          <LocationImage city={city} />
        </div>
      </div>
    </div>
  );
};

export default OfferDetailUser;