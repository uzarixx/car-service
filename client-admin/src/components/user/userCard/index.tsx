import React, { FC } from 'react';
import styles from './UserCard.module.scss';
import { useRouter } from 'next/router';

const UserCard: FC = () => {
  const router = useRouter()
  const onClickUser = () => {
    return router.push('/user/1')
  }
  return (
    <div className={styles.userCardWrapper} onClick={onClickUser}>
      <span
        className={`${styles.statusDot} ${true || styles.statusDotActive}`}></span>
      <div className={styles.userParams}>
        <div className={styles.avatar}></div>
        <p>Підбирач</p>
        <p>Андрій</p>
        <p>Дніпро</p>
        <p>1-9 років</p>
        <p>Я займаюсь підбіром авто вже декілька р...</p>
      </div>
    </div>
  );
};

export default UserCard;
