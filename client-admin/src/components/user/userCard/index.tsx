import React, { FC } from 'react';
import styles from './UserCard.module.scss';

const UserCard: FC = () => {
  return (
    <div className={styles.userCardWrapper}>
      <span className={`${styles.statusDot} ${1 == 1 && styles.statusDotActive}`}></span>
      <div className={styles.userParams}>
        <div className={styles.avatar}></div>
        <p>Підбиральщик</p>
        <p>Андрій</p>
        <p>Дніпро</p>
        <p>1-9 років</p>
        <p>Я займаюсь підбіром авто вже декілька р...</p>
      </div>
    </div>
  );
};

export default UserCard;
