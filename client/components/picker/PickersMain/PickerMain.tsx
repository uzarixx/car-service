import React, { FC } from 'react';
import styles from './PickerMain.module.scss';
import Date from '@/utils/date';
import { userProps } from '@/constants/type';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import { useRouter } from 'next/router';
import UserIcon from '@/components/ui/icons/UserIcon';
import LocationIco from '@/components/ui/icons/LocationIco';

const PickerMain: FC<userProps> = ({ users }) => {
  const router = useRouter();
  const onClickPicker = async(id: number) => {
    await router.push(`/picker/${id}`);
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
          <p className={styles.description}>{el.sliceDesc}</p>
          <SpacingSmall />
          <p><LocationIco/> {el.city}</p>
          <SpacingSmall />
        </div>,
      )}
    </div>
  );
};

export default PickerMain;