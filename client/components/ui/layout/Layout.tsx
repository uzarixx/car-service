import React, { FC } from 'react';
import styles from './Layout.module.scss';
import Header from '../../semantics/header/Header';
import Head from 'next/head';

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}


const Layout: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title} | Find Card Picker</title>
        <meta key='viewport' name='viewport'
              content='width=device-width, initial-scale=1, maximum-scale=1' />
        <meta name='description' content={description} />
      </Head>
      <Header />
      <div className={styles.layoutContainer}>
        <div className={styles.layoutWrapper}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;