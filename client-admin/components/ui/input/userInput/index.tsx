import React, { FC } from 'react';
import styles from './UserInput.module.scss';
import { useFormContext } from 'react-hook-form';

interface props {
  placeholder: string;
  name: string
}

const UserInput: FC<props> = ({ placeholder, name }) => {
  const { register } = useFormContext();
  return (
    <input
      type='text'
      className={styles.input}
      placeholder={placeholder}
      {...register(name)}
    />
  );
};

export default UserInput;