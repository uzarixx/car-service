import React, { FC } from 'react';
import styles from '../Main.module.scss';
import Link from 'next/link';

const NotAuthorize: FC = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h2>401</h2>
      <h3>Ви ще не авторізовані</h3>
      <Link href={'/authorization'}>Авторизуватися</Link>
    </div>
  );
};

export default NotAuthorize;
