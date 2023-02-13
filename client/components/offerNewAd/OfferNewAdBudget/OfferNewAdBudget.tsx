import React, { FC, Fragment } from 'react';
import styles from './OfferNewAdBudget.module.scss';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import PostNewAdInput from '@/components/ui/inputs/postNewAdInput';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import Select from '@/components/ui/select/select';
import { CourseArray } from '@/constants/selectArrays';

interface props {
  methods: any;
}

const inputs = [
  {title: 'Бюджет на авто*', placeholder: 'Введіть ваш бюджет на авто', name: 'budget'},
  {title: 'Бюджет за підбор (грн.)*', placeholder: 'Введіть ваш бюджет за підбор', name: 'budgetService'}
]

const OfferNewAdBudget: FC<props> = ({ methods }) => {
  const error = methods.formState.errors;
  return (
    <div className={styles.postNewAdBudget}>
      <h3>Ваш бюджет</h3>
      {inputs.map((el, i) =>
      <Fragment key={i}>
        <SpacingMiddle />
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <p>{el.title}</p>
            <SpacingSmall />
            <PostNewAdInput placeholder={el.placeholder} name={el.name} error={error[el.name]} type={'text'} />
            {error[el.name] && <span>{error[el.name].message}</span>}
          </div>
          {i === 0 && <Select selectArray={CourseArray} />}
        </div>
      </Fragment>)}
    </div>
  );
};

export default OfferNewAdBudget;