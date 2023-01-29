import React, { FC } from 'react';
import styles from './TelegramActivate.module.scss';
import Link from 'next/link';
import { userType } from '@/constants/type';
import { useStore } from 'effector-react';
import { $data } from '@/store/userData';
import authServices from '@/service/authService';


const TelegramActivate: FC = () => {
  const user: userType | any = useStore($data);
  const onClickNotifications = async () => {
    return await authServices.telegramNotifications();
  };
  return (
    <>
      {user.telegramActivate ? <>
          <span
            className={styles.telegramMsg}
          >{
            user.notifications
              ?
              'Якщо ви не хочете получати повідомлення, то натисніть на цю кнопку, або зайдіть в налаштування TG-бота'
              :
              'Щоб знов отримувати повідомлення натисніть на кнопку, або зайдіть в налаштування TG-бота'}</span>
          <button className={styles.telegramButton}
                  onClick={onClickNotifications}>
            {user.notifications ? 'Вимкнути' : 'Вмикнути'}
          </button>
        </> :
        <>
          <span className={styles.telegramMsg}>Щоб отримувати повідомлення у Telegram натисніть на посилання</span>
          <Link
            className={styles.telegramButton}
            href={'https://t.me/findCarPickerBot'}
            target={'_blank'}>Авторізуватись </Link>
        </>
      }
    </>
  );
};

export default TelegramActivate;