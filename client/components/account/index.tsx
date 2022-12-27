import React, { FC, useEffect, useState } from 'react';
import authServices from '../../service/authService';
import styles from './Account.module.scss';
import AccountUser from './AccountUser/AccountUser';
import SpacingSmall from '../ui/spacings/SpacingSmall';
import AccountSettings from './AccountSettings/AccountSettings';
import NotAuthorize from '../errorsPages/NotAuthorize/NotAuthorize';
import PreloaderDots from '../ui/preloaders/PreloaderDots';
import { useRouter } from 'next/router';
import AccountOffers from './AccountOffers/AccountOffers';
import { destroyCookie } from 'nookies';
import AccountPortfolio from './AccountPortfolio/AccountPortfolio';

const AccountComponent: FC = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const pathname = router.pathname
  useEffect(() => {
    const getAuthUser = async () => {
      try {
        await setIsLoading(true);
        const { data } = await authServices.getUserData();
        setAuthUser(data);
        await setIsLoading(false);
      } catch (e) {
        destroyCookie(null, 'authToken', { path: '/' });
        setIsLoading(false);
      }
    };
    getAuthUser()
  }, []);
  if (isLoading) {
    return (
      <PreloaderDots />
    );
  }
  if (!authUser) {
    return (
      <NotAuthorize />
    );
  }
  return (
    <>
      <h2>Особистий кабінет</h2>
      <SpacingSmall />
      <div className={styles.accountMenuWrapper}>
        <AccountUser user={authUser} />
        {pathname === '/account' && <AccountSettings user={authUser} authUser={setAuthUser} />}
        {pathname === '/account/offers' && <AccountOffers/>}
        {pathname === '/account/portfolio' && <AccountPortfolio authUser={authUser}/>}
      </div>
    </>
  );
};

export default AccountComponent;