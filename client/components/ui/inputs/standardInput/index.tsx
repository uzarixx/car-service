import React, { FC } from 'react';
import styles from './StandardInput.module.scss';
import { useFormContext } from 'react-hook-form';

interface props {
  name?: string;
  placeholder: string;
  type?: 'email' | 'password' | 'text' | undefined;
  error?: { message: string };
}


const StandardInput: FC<props> = ({ name, placeholder, type, error }) => {
  const { register } = useFormContext();
  return (
    <input className={`${styles.input} ${error && styles.active}`} type={type}
           placeholder={placeholder} {...register(name as string, { required: true })}/>
  );
};

export default StandardInput;