import React, { FC } from 'react';
import styles from './PostNewAdUser.module.scss';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import PostNewAdInput from '@/components/ui/inputs/postNewAdInput';
import DropDown from '@/components/ui/dropDown';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import { useFetchCities } from '@/utils/fetchCity';

interface props {
  methods: any;
  city: string | null | undefined;
  phoneNumber: string | null | undefined;
}

const PostNewAdUser: FC<props> = ({ methods, city, phoneNumber }) => {
  const {dropDown, fetching, onClickTown} = useFetchCities(methods);
  const error = methods.formState.errors;

  return (
    <div className={styles.postNewAdLocation}>
      <div className={styles.inputWrapper}>
        <p>Місцезнаходження*</p>
        <SpacingSmall />
        <PostNewAdInput value={city} fetching={fetching} placeholder={'Ваше місцезнаходження'} name={'city'} error={error.city}/>
        {dropDown?.length >= 1 && <DropDown top={'75px'} dropDown={dropDown} onClickTown={onClickTown} />}
        {error.city && <span>{error.city.message}</span>}
      </div>
      <SpacingMiddle />
      <div className={styles.inputWrapper}>
        <p>Номер телефону*</p>
        <SpacingSmall />
        <PostNewAdInput value={phoneNumber} placeholder={'Ваш номер телефону'} name={'phoneNumber'} error={error.phoneNumber}/>
        {error.phoneNumber && <span>{error.phoneNumber.message}</span>}
      </div>
    </div>
  );
};

export default PostNewAdUser;