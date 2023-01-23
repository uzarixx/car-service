import React, { FC } from 'react';
import styles from './TextArea.module.scss';

interface props {
  placeholder: string;
}

const TextArea: FC<props> = ({placeholder}) => {
  return (
    <textarea
      defaultValue={'421412746512645216'}
      className={styles.textArea}
      placeholder={placeholder}
      aria-invalid={'true'}
      autoComplete={'off'}
      rows={7} />
  );
};

export default TextArea;