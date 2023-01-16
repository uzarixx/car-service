import React, { FC } from 'react';
import styles from './PickerMain.module.scss';
import Date from '../../../utils/date';
import { userProps } from '../../../constants/type';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import ButtonGreen from '../../ui/buttons/buttonGreen';
import { useRouter } from 'next/router';
import UserIcon from '../../ui/icons/UserIcon';

const PickerMain: FC<userProps> = ({ users }) => {
  const router = useRouter();
  const onClickPicker = (id: number) => {
    router.push(`/picker/${id}`);
  };
  return (
    <div className={styles.pickersWrapper}>
      {users.map((el, i) =>
        <div key={i} className={styles.pickerBlock}
             onClick={() => onClickPicker(el.id)}>
          {el.photo ? <img src={el.photo} alt='avatar' /> : <UserIcon />}
          <p> {'Ім\'я: '}{el.userName}</p>
          <span
            className={styles.Date}>Зареєстрован: {Date(el.createdAt)}</span>
          <SpacingSmall />
          <p>Досвід: {el.experience}</p>
          <SpacingSmall />
          <p>Детальніша інформація: </p>
          <p className={styles.description}>{el.description.slice(0, 45)}...</p>
          <SpacingSmall />
          <p>Місто: {el.city}</p>
          <SpacingSmall />
          <ButtonGreen>Відкрити</ButtonGreen>
        </div>,
      )}
    </div>
  );
};

export default PickerMain;