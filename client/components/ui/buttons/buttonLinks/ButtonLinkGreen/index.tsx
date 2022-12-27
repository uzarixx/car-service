import React, { FC } from 'react';
import styles from './ButtonLinkGreen.module.scss';
import Link from 'next/link';

interface props {
  href: string;
  children: string;
}

const ButtonLinkGreen: FC<props> = ({ href, children }) => {
  return (
    <Link href={href}>
    <button className={styles.buttonPrimary}>
        {children}
    </button>
    </Link>
  );
};

export default ButtonLinkGreen;