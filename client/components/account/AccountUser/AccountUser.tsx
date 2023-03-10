import React, { FC, useState } from 'react';
import styles from './AccountUser.module.scss';
import { useRouter } from 'next/router';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import { UserRole } from '@/constants/type';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import userService from '@/service/userService';
import UserIcon from '@/components//ui/icons/UserIcon';
import { logoutUser } from '@/store/userData';

interface User {
  id: number;
  userName: string;
  phoneNumber: string;
  email: string;
  role: string;
  photo: string;
  city: string;
  status: boolean;
  verify: boolean;
}

interface Props {
  user: User;

}

const AccountUser: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [statusClick, setStatusClick] = useState(false);
  const pathname = router.pathname;
  const isSettings = pathname === '/account';
  const isOffer = pathname === '/account/offers';
  const isPortfolio = pathname === '/account/portfolio';
  const isStatistic = pathname === '/account/statistic';
  const onLogout = async () => {
    destroyCookie(null, 'authToken', { path: '/' });
    logoutUser();
    await router.push('/');
  };
  const onCreateLink = async () => {
    if (!user.status) {
      setStatusClick(true);
      await userService.createActivationLink();
    }
  };
  return (
    <nav className={styles.navBar}>
      {user.status && user.verify || <div
        className={styles.isNotActive}>{statusClick ? 'На вашу пошту надіслано листа' :
        <p onClick={onCreateLink}>
          {user.status || 'Користувач не активовано, якщо на пошту не надійшло повідомлення, то натисіть сюди'}
          {user.status ? !user.verify ? `Акаунт не веріфіковано ${user.role === UserRole.Picker ? ', щоб пришвидишити веріфакацію пропонуємо Вам заповнити дані в розділі "Моє портфоліо"' : ''}` : '' : ''}
        </p>}
      </div>}
      <div className={styles.userBlock}>
        <div className={styles.userName}>
          {user.photo ?
            <img src={user.photo} alt='user-avatar' width={30} height={30} /> :
            <UserIcon />}
          <h2>
            {user.userName}
          </h2>
        </div>
        <p>ID {user.id}</p>
        <p>{!user.phoneNumber ? 'Вкажіть номер телефону' : user.phoneNumber}</p>
        <p onClick={onLogout}>Вийти з акаунту</p>
      </div>
      <SpacingSmall />
      <div className={styles.router}>
        <Link href={'/account'} className={`${isSettings && styles.active}`}>Налаштування
          акаунту</Link>
        {user.role === UserRole.Client &&
          <Link href={'/account/offers?page=1'}
                className={`${isOffer && styles.active}`}>
            Мої оголошення
          </Link>}
        {user.role === UserRole.Picker &&
          <Link href={'/account/portfolio'}
                className={`${isPortfolio && styles.active}`}>
            Моє портфоліо
          </Link>}
        {user.role === UserRole.Picker &&
          <Link href={'/account/statistic'}
                className={`${isStatistic && styles.active}`}>
            Статистика відгуків
          </Link>}
      </div>
    </nav>
  );
};

export default AccountUser;