import React, { FC, Fragment } from 'react';
import styles from './OfferNewAdDetails.module.scss';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import PostNewAdInput from '../../ui/inputs/postNewAdInput';
import ButtonCarBrands from '../../ui/buttons/buttonCarBrands';
import SelectDefault from '../../ui/select/selectDefault';
import { PostNewAdCarType } from '../../../constants/selectArrays';

interface props {
  methods: any;
}

const paramsArray = [
  {
    title: 'Модель*',
    placeholder: 'Модель авто',
    name: 'carModel',
    type: 'text',
  },
  {
    title: 'Потужність',
    placeholder: 'К.с.',
    name: 'carForces',
    type: 'text',
  },
  {
    title: 'Об\'єм двигуна',
    placeholder: 'Л.',
    name: 'carLiters',
    type: 'text',
  },
  {
    title: 'Рік випуску',
    placeholder: 'Наприклад, 2006',
    name: 'carYear',
    type: 'text',
  },
];

const OfferNewAdDetails: FC<props> = ({ methods }) => {
  const error = methods.formState.errors;
  return (
    <div className={styles.postNewAdDetails}>
      <h3>Додаткова інформація</h3>
      <SpacingMiddle />
      <p>Оберіть марку*</p>
      <SpacingSmall />
      <ButtonCarBrands error={error} methods={methods} />
      <SpacingSmall />
      <div className={styles.inputsWrapper}>
        {paramsArray.map((el, i) =>
          <Fragment key={i}>
            <SpacingMiddle />
            <p>{el.title}</p>
            <SpacingSmall />
            <div className={styles.inputWrapper}>
              <PostNewAdInput
                placeholder={el.placeholder}
                error={error[el.name]} name={el.name}
                type={el.type} />
              {error[el.name] && <span>{error[el.name].message}</span>}
            </div>
          </Fragment>
        )}
        {PostNewAdCarType.map((el, i) =>
          <Fragment key={i}>
            <SpacingMiddle />
            <SelectDefault error={error} selectArray={el} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default OfferNewAdDetails;