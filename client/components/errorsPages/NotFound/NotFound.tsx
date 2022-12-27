import React, { FC } from 'react';
import styles from '../Main.module.scss';
import Link from 'next/link';

const NotFound: FC = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h2>404</h2>
      <h3>Сторінка не знайдена</h3>
      <Link href={'/'}>Повернутись</Link>
    </div>
  );
};

export default NotFound;