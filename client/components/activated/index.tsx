import React, { FC, useEffect, useState } from 'react';
import PreloaderDots from '../ui/preloaders/PreloaderDots';
import ButtonLinkGreen from '../ui/buttons/buttonLinks/ButtonLinkGreen';
import { useRouter } from 'next/router';
import userService from '@/service/userService';
import { getAuthUser } from '@/store/userData';
import { useTimer } from '@/utils/useTimer';
import styles from './Activated.module.scss'

const ActivatedComponent: FC = () => {
  const router = useRouter();
  const token: any = router.query.token;
  const [loading, setLoading] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
  const {seconds} = useTimer(isActivated, '/account')
  useEffect(() => {
    const activateUser = async () => {
      setLoading(true);
      try {
        if (token) {
          const { data } = await userService.activateAccount(token);
          data && setIsActivated(true);
          await getAuthUser();
        }
      } catch (e) {
        setIsActivated(false);
      }
      await setLoading(false);
    };
    activateUser();
  }, [token]);

  return (
    <> {loading && !isActivated ? <PreloaderDots /> :
      <> {isActivated ?
        <div className={styles.returnedToAccount}>
          Активація успішна зараз вас відправить на сторінку вашого акаунту
          <p>{seconds}</p>
        </div> :
        <div className={styles.returnedToMain}>
          Посилання активації не дійсне, зробіть новий запит та спробуйте
          знову
          <ButtonLinkGreen href={'/'}>На головну</ButtonLinkGreen>
        </div>
      }</>}</>
  )
}

export default ActivatedComponent;