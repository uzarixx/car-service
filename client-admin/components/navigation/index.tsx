import React, { FC } from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import UserIcon from '@/components/icons/UserIcon';
import OfferIco from '@/components/icons/OfferIco';

const Navigation: FC = () => {
  return (
    <nav className={styles.nav}>
      <Link href={'/?page=1'}><UserIcon /></Link>
      <Link href={'/offers'}><OfferIco /></Link>
    </nav>
  );
};

export default Navigation;