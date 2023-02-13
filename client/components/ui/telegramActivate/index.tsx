import React, { FC } from 'react';
import styles from './TelegramActivate.module.scss';
import Link from 'next/link';
import { userType } from '@/constants/type';
import { useStore } from 'effector-react';
import { $data, getAuthUser } from '@/store/userData';
import authServices from '@/service/authService';


const TelegramActivate: FC = () => {
  const user: userType | any = useStore($data);
  const onClickNotifications = async () => {
    await authServices.telegramNotifications();
    return await getAuthUser();
  };
  return (
    <>

      {user.telegramActivate ? <div className={styles.telegramWrapper}>
          <span
            className={styles.telegramMsg}>{`Повідомлення: ${user.notifications ? 'включені' : 'виключені'}`}</span>
          <button className={styles.telegramButton} onClick={onClickNotifications}
                  type={'submit'}>
            {user.notifications ? 'Вимкнути' : 'Вмикнути'}
          </button>
        </div> :
        <div className={styles.telegramWrapper}>
          <span className={styles.telegramMsg}>Telegram-повідомлення</span>
          <Link
            className={styles.telegramButton}
            href={'https://t.me/findCarPickerBot'}
            target={'_blank'}>Авторізуватись </Link>
        </div>
      }
    </>
  );
};

export default TelegramActivate;