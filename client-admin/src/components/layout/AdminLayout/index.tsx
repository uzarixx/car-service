import React, { FC } from 'react';
import styles from './AdminLayout.module.scss';
import Navigation from '@/components/navigation';
import UserCard from '@/components/user/userCard';
import { useRouter } from 'next/router';

const AdminLayout: FC = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.cardsWrapper}>
        {router.query.path === 'offers' ? <></> : <UserCard />}
      </div>
    </div>
  );
};

export default AdminLayout;