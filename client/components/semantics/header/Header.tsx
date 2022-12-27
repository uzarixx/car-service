import React, { FC, useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import ButtonLinkGreen from '../../ui/buttons/buttonLinks/ButtonLinkGreen';
import nookies from 'nookies';
import authServices from '../../../service/authService';


const Header: FC = () => {
  const [isAuth, seIsAuth] = useState('');
  const [authUser, setAuthUser] = useState<{ role?: string }>({});
  const getRole = async () => {
    const { data } = await authServices.getUserData();
    setAuthUser(data);
  };
  useEffect(() => {
    const authToken: any = 'authToken';
    seIsAuth(nookies.get(authToken).authToken);
    isAuth && getRole();
  }, [isAuth]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href={'/'} className={styles.headerLeft}>
          LOGO
        </Link>
        <div className={styles.headerRight}>
          {authUser.role === 'Client' &&
            <button className={styles.userButton}>
              <Link href={'/picker'}>Підбирачі авто</Link>
            </button>}
          <button className={styles.userButton}>
            <Link href={isAuth ? '/account' : '/authorization'}>
              Ваш профіль
            </Link>
          </button>
          <ButtonLinkGreen
            href={isAuth ? (authUser.role === 'Client' ? '/offer-new-ad' : '/offer') : '/authorization'}>
            {isAuth ? authUser.role === 'Client' ? 'Додати оголошення' : 'Всі оголошення' : 'Додати оголошення'}
          </ButtonLinkGreen>
        </div>
      </div>
    </header>
  );
};

export default Header;