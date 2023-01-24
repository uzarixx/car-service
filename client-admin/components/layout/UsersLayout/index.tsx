import React, { FC } from 'react';
import styles from './UsersLayout.module.scss';
import Navigation from '@/components/navigation';
import UserCard from '@/components/user/userCard';

const UsersLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.cardsWrapper}>
        <UserCard />
      </div>
    </div>
  );
};

export default UsersLayout;