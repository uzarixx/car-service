import React, { FC } from 'react';
import styles from './UserInput.module.scss';

interface props {
  value: string;
  placeholder: string;
}

const UserInput: FC<props> = ({ value,placeholder }) => {
  return (
    <input type='text' className={styles.input} defaultValue={value} placeholder={placeholder}/>
  );
};

export default UserInput;