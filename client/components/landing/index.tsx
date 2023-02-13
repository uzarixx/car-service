import React, { FC } from 'react';
import styles from './Landing.module.scss';
import Title from '@/components/landing/title';
import About from '@/components/landing/about';

const Landing: FC = () => {
  return (
    <div className={styles.landingWrapper}>
      <Title />
      <About />
    </div>
  );
};

export default Landing;