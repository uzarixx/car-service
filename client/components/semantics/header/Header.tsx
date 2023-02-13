import React, { FC, useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import ButtonLinkGreen from '@/components/ui/buttons/buttonLinks/ButtonLinkGreen';
import nookies from 'nookies';
import { useStore } from 'effector-react';
import { $data } from '@/store/userData';
import { UserRole, userType } from '@/constants/type';
import FavoriteIco from '@/components/ui/icons/FavoriteIco';
import BurgerIco from '@/components/ui/icons/BurgerIco';

const Header: FC = () => {
  const [isAuth, seIsAuth] = useState('');
  const [active, setActive] = useState(false);
  const authUser: userType | any = useStore($data);
  useEffect(() => {
    const authToken: any = 'authToken';
    seIsAuth(nookies.get(authToken).authToken);
  }, [isAuth]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href={isAuth ? authUser.role === UserRole.Client ? '/picker' : '/offer' :'/'} className={styles.headerLeft}>
          <img src={'https://res.cloudinary.com/djfgenv7u/image/upload/v1676213842/logo_lo7qc7.png'} alt={'logo'} height={45}/>
        </Link>
        <div className={`${styles.headerRight} ${active && styles.active}`} onClick={() => setActive(false)}>
          <span>Закрити</span>
          {authUser?.role === 'Client' &&
            <button className={styles.userButton}>
              <Link href={'/picker'}>Підбирачі авто</Link>
            </button>}
          <button className={styles.userButton}>
            <Link href={isAuth ? '/account' : '/authorization'}>
              Ваш профіль
            </Link>
          </button>
          {authUser?.role === 'Picker' &&
            <button className={styles.userButton}><Link
              href={'/favorite'}><FavoriteIco /></Link></button>}
          <ButtonLinkGreen
            href={isAuth ? (authUser.role === 'Client' ? '/offer-new-ad' : '/offer?page=1') : '/authorization'}>
            {isAuth ? authUser.role === 'Client' ? 'Додати оголошення' : 'Всі оголошення' : 'Додати оголошення'}
          </ButtonLinkGreen>
        </div>
        <div className={styles.burger} onClick={() => setActive(true)}>
          <BurgerIco/>
        </div>
      </div>
    </header>
  );
};

export default Header;