import React, { FC } from 'react';
import styles from './PostNewAdInput.module.scss';
import { useFormContext } from 'react-hook-form';

interface props {
  name?: string;
  placeholder: string;
  type?: 'email' | 'password' | 'text' | undefined | any;
  error?: { message: string } | undefined | any;
  value?: string | null | undefined | any;
  fetching?: (e: string) => void ;
}

const PostNewAdInput: FC<props> = ({
  name,
  placeholder,
  type,
  error,
  value,
  fetching,
}) => {
  const { register } = useFormContext();
  return (
    <input
      defaultValue={value}
      className={`${styles.input} ${error && styles.active}`}
      type={type}
      {...register(name as string, {
        required: true, onChange: (e) => {
          name === 'city' && fetching && fetching(e.target.value);
        }
      })}
      placeholder={placeholder} />
  );
};

export default PostNewAdInput;