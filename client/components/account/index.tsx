import React, { FC } from 'react';
import styles from './Account.module.scss';
import AccountUser from './AccountUser/AccountUser';
import SpacingSmall from '../ui/spacings/SpacingSmall';
import AccountSettings from './AccountSettings/AccountSettings';
import NotAuthorize from '../errorsPages/NotAuthorize/NotAuthorize';
import PreloaderDots from '../ui/preloaders/PreloaderDots';
import { useRouter } from 'next/router';
import AccountOffers from './AccountOffers/AccountOffers';
import AccountPortfolio from './AccountPortfolio/AccountPortfolio';
import { useStore } from 'effector-react';
import { $data, $loadingData } from '@/store/userData';
import { userType } from '@/constants/type';
import AccountStatistic
  from '@/components/account/AccountStatistic/AccountStatistic';

const AccountComponent: FC = () => {
  const authUser: userType | any = useStore($data);
  const isLoading = useStore($loadingData);
  const router = useRouter();
  const pathname = router.pathname;
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
        {pathname === '/account' && <AccountSettings user={authUser} />}
        {pathname === '/account/offers' && <AccountOffers />}
        {pathname === '/account/portfolio' && <AccountPortfolio authUser={authUser} />}
        {pathname === '/account/statistic' && <AccountStatistic />}
      </div>
    </>
  );
};

export default AccountComponent;