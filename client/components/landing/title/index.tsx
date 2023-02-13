import React, { FC, useState } from 'react';
import styles from './Title.module.scss';
import LoopIco from '@/components/ui/icons/LoopIco';
import { useRouter } from 'next/router';

const Title: FC = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [city, setCity] = useState('');

  return (
    <div className={styles.titleWrapper}>
      <h1><span>Український</span> сервіс для пошуку автоподбірщика</h1>
      <div className={styles.inputWrapper}>
        <div
          className={`${styles.inputTitle} ${isClient && styles.inputTitleActive}`}>
          <p onClick={() => setIsClient(false)}>Я купую авто</p>
          <p onClick={() => setIsClient(true)}>Я шукаю авто</p>
        </div>
        <input type='text' placeholder={'Введіть місто пошуку'} value={city}
               onChange={(e) => setCity(e.target.value)} />
        <button
          onClick={() => router.push(`${isClient ? 'picker' : 'offer'}?city=${city}`)}>
          <p>ПОШУК</p> <LoopIco /></button>
      </div>
    </div>
  );
};

export default Title;