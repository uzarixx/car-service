import React, { FC } from 'react';
import styles from './TextArea.module.scss';
import { useFormContext } from 'react-hook-form';
import SpacingSmall from '../spacings/SpacingSmall';

interface props {
  name: string;
  placeholder: string;
  errors: boolean;
  title?: string;
  rows?: number
}

const TextArea: FC<props> = ({ name, placeholder, errors, title, rows }) => {
  const { register } = useFormContext();
  return (
    <>
      <p>{title}</p>
      <SpacingSmall />
      <textarea className={`${styles.textArea} ${errors && styles.active}`}
                aria-invalid={'true'}
                autoComplete={'off'}
                rows={rows || 11} {...register(name, { required: true })}
                placeholder={placeholder}>
    </textarea>
    </>
  );
};

export default TextArea;