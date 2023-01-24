import React, { FC } from 'react';
import styles from './TextArea.module.scss';
import { useFormContext } from 'react-hook-form';

interface props {
  placeholder: string;
  name: string;
}

const TextArea: FC<props> = ({ placeholder, name }) => {
  const { register } = useFormContext();
  return (
    <textarea
      className={styles.textArea}
      placeholder={placeholder}
      aria-invalid={'true'}
      autoComplete={'off'}
      rows={7}
      {...register(name)}
    />
  );
};

export default TextArea;