import React, { FC, useEffect, useState } from 'react';
import styles from './UserDetail.module.scss';
import UserIcon from '@components/icons/UserIcon';
import UserInput from '@components/ui/input/userInput';
import TextArea from '@components/ui/input/textArea';
import SubmitButton from '@components/ui/button/submitButton';
import { useRouter } from 'next/router';
import usersService from '@/service/usersService';


const fetchUser = async (id: number) => {
  const { data } = await usersService.getUserById(id);
  return (
    await data
  );
};

const UserDetail: FC = () => {
  const [user, setUser] = useState<{[key: string]: any}>({});
  const router = useRouter();
  useEffect(() => {
    router.query.id && fetchUser(Number(router.query.id)).then((res) => setUser(res)).catch((e) => console.error(e));
  }, [router]);

  console.log(user);

  return (
    <div className={styles.container}>
      <div className={styles.mainAvatar}>
        <UserIcon />
        <p>{user.role === 'Picker' ? 'Підбирач' : 'Кліент'}</p>
      </div>
      <UserInput value={user.userName} placeholder={'Ім\'я'} />
      <UserInput value={user.userLastName} placeholder={'Призвище'} />
      <UserInput value={user.city} placeholder={'Місто'} />
      {user.role === 'Picker' && <UserInput value={user.experience} placeholder={'Досвід'} />}
      {user.role === 'Picker' && <TextArea placeholder={'Опис'} />}
      <UserInput value={user.phoneNumber} placeholder={'Телефон'} />
      <UserInput value={user.email} placeholder={'email'} />
      <SubmitButton>Зберегти</SubmitButton>
    </div>
  );
};

export default UserDetail;