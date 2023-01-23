import React, { FC } from 'react';
import styles from './OfferNewAdDescription.module.scss';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import TextArea from '@/components/ui/textArea';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';

interface props {
  methods: any;
}

const OfferNewAdDescription: FC<props> = ({ methods }) => {
  const area = methods.watch('description');
  const count = area?.length || 0;
  const errors = methods.formState.errors.description
  return (
    <div className={styles.postNewAdDescription}>
      <p>Опис*</p>
      <SpacingSmall />
      <div className={styles.textAreaWrapper}>
        <TextArea errors={errors} name={'description'} placeholder={'Опишіть яким авто ви зацікавлені, які деталі треба враховувати і т.д'} />
        {errors && <span>{errors.message}</span>}
      </div>
      <SpacingMiddle />
      <div className={styles.counter}>
        <p>{count < 80 && `Напишіть ще ${80 - count} символів`}</p>
        <p>{count}/9000</p>
      </div>
    </div>
  );
};

export default OfferNewAdDescription;