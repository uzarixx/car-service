import React, { FC } from 'react';
import styles from './AccountUser.module.scss';
import { useRouter } from 'next/router';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import { UserRole } from '../../../constants/type';
import Link from 'next/link';
import { destroyCookie } from 'nookies';

interface User {
  id: number;
  userName: string;
  phoneNumber: string;
  email: string;
  role: string;
  photo: string;
  city: string;
}

interface Props {
  user: User;

}

const AccountUser: FC<Props> = ({ user }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const isSettings = pathname === '/account';
  const isOffer = pathname === '/account/offers';
  const isPortfolio = pathname === '/account/portfolio';
  const onLogout = () => {
    destroyCookie(null, 'authToken', { path: '/' });
    router.push('/');
  };
  return (
    <nav className={styles.navBar}>
      <div className={styles.userBlock}>
        <h2>{user.userName}</h2>
        <p>ID {user.id}</p>
        <p>{!user.phoneNumber ? 'Вкажіть номер телефону' : user.phoneNumber}</p>
        <p onClick={onLogout}>Вийти з акаунту</p>
      </div>
      <SpacingSmall />
      <div className={styles.router}>
        <Link href={'/account'} className={`${isSettings && styles.active}`}>Налаштування акаунту</Link>
        {user.role === UserRole.Client && <Link href={'/account/offers'} className={`${isOffer && styles.active}`}>Мої оголошення</Link>}
        {user.role === UserRole.Picker && <Link href={'/account/portfolio'} className={`${isPortfolio && styles.active}`}>Моє портфоліо</Link>}
      </div>
    </nav>
  );
};

export default AccountUser;