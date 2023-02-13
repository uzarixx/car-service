import React, { FC, useEffect, useState } from 'react';
import styles from './UserDetail.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import UserIcon from '@components/icons/UserIcon';
import UserInput from '@components/ui/input/userInput';
import TextArea from '@components/ui/input/textArea';
import SubmitButton from '@components/ui/button/submitButton';
import { useRouter } from 'next/router';
import usersService from '@/service/usersService';
import { useSetUserValue } from '@/utils/useSetValue';


const fetchUser = async (id: number) => {
  const { data } = await usersService.getUserById(id);
  return (
    await data
  );
};

const UserDetail: FC = () => {
  const [user, setUser] = useState<{ [key: string]: string }>({});
  const [updateData, setUpdateData] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.query.id && fetchUser(Number(router.query.id)).then((res) => setUser(res)).catch((e) => console.error(e));
  }, [router]);
  const methods = useForm();
  useSetUserValue({ methods, user });
  const updateDataTimer = () => {
    setUpdateData(true);
    setTimeout(() => {
      setUpdateData(false);
    }, 3000);
  };
  const onSubmit = async (data: any) => {
    await usersService.updateUser({ ...data, id: user.id });
    updateDataTimer();
  };
  const onVerifyUser = async () => {
    await usersService.verifyUser(Number(user.id));
    const data = await fetchUser(Number(user.id));
    setUser(data);
    updateDataTimer();
  };
  return (
    <FormProvider {...methods}>
      <form className={styles.container}
            onSubmit={methods.handleSubmit(onSubmit)}>
        <span
          className={`${styles.updateData} ${updateData && styles.updateDataActive}`}>Дані збережені</span>
        <div className={styles.form}>
          <div className={styles.mainAvatar}>
            <UserIcon />
            <p>{user.role === 'Picker' ? 'Підбирач' : 'Кліент'}</p>
          </div>
          <UserInput placeholder={'Ім\'я'} name={'userName'} />
          <UserInput placeholder={'Призвище'} name={'userLastName'} />
          <UserInput placeholder={'Місто'} name={'city'} />
          {user.role === 'Picker' &&
            <UserInput placeholder={'Досвід'} name={'experience'} />}
          {user.role === 'Picker' &&
            <TextArea placeholder={'Опис'} name={'description'} />}
          <UserInput placeholder={'Телефон'} name={'phoneNumber'} />
          <UserInput placeholder={'email'} name={'email'} />
          <SubmitButton type={'submit'}>Зберегти</SubmitButton>
        </div>
       <div className={styles.verifyBlock}>
          <div className={styles.status}>
            <span
              className={`${styles.verifyDot} ${user.verify && styles.active}`}></span>
            <p>{user.verify ? 'Верефіковано' : 'Не веріфіковано'}</p>
          </div>
          <SubmitButton type={'button'} onClick={onVerifyUser}>
            {user.verify ? 'Деверефікувати' : 'Верефікувати'}
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserDetail;