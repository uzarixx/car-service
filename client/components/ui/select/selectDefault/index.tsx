import React, { FC } from 'react';
import styles from './SelectDefault.module.scss';
import SpacingSmall from '../../spacings/SpacingSmall';
import { useFormContext } from 'react-hook-form';

interface props {
  selectArray: { title: string; name: string; options: { title: string }[] };
  error?: { message: string } | undefined | any;
}

const SelectDefault: FC<props> = ({ selectArray, error }) => {
  const { register } = useFormContext();
  return (
    <div className={styles.selectWrapper}>
      <p>{selectArray.title}</p>
      <SpacingSmall />
      <select
        defaultValue={''}
        className={error[selectArray.name] && styles.active} {...register(selectArray.name)}>
        {selectArray.options.map((el, i) =>
          <option key={i} disabled={i === 0} value={el.title === '' ? '' : el.title}>
            {el.title === '' ? selectArray.title : el.title}
          </option>
        )}
      </select>
      {error[selectArray.name] && <span>{error[selectArray.name].message}</span>}
    </div>
  );
};

export default SelectDefault;