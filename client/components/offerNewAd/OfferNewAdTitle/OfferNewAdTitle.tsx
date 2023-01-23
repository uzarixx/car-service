import React, { FC } from 'react';
import styles from './OfferNewAdTitle.module.scss';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import PostNewAdInput from '@/components/ui/inputs/postNewAdInput';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';

interface props {
  methods: any
}

const OfferNewAdTitle: FC<props> = ({methods}) => {
  const error = methods.formState.errors.title
  return (
    <div className={styles.postNewAdTitle}>
      <h3>Опишіть у подробицях</h3>
      <SpacingMiddle />
      <div className={styles.inputsWrapper}>
        <p>Вкажіть назву*</p>
        <SpacingSmall />
        <PostNewAdInput
          placeholder={'Наприклад, потрібно знайти BMW 6 Series 2016 у Чернівцях'}
          name={'title'} error={error} type={'text'} />
        {error && <span>{error.message}</span>}
        <SpacingSmall />
      </div>
    </div>
  );
};

export default OfferNewAdTitle;