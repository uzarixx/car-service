import React, { FC } from 'react';
import styles from './Select.module.scss';
import SpacingSmall from '../../spacings/SpacingSmall';
import { useFormContext } from 'react-hook-form';

interface props {
  selectArray: { title: string; name: string; options: { title: string }[] };
}

const Select: FC<props> = ({ selectArray }) => {
  const { register } = useFormContext();
  return (
    <div className={styles.selectWrapper}>
      <p>{selectArray.title}</p>
      <SpacingSmall />
      <select {...register(selectArray.name)}>
        {selectArray.options.map((el, i) =>
          <option key={i}>
            {el.title === '' ? selectArray.title : el.title}
          </option>,
        )}
      </select>
    </div>
  );
};

export default Select;