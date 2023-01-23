import React, { FC } from 'react';
import styles from './UserDetail.module.scss';
import UserIcon from '@components/icons/UserIcon';
import UserInput from '@components/ui/input/userInput';
import TextArea from '@components/ui/input/textArea';
import SubmitButton from '@components/ui/button/submitButton';

const UserDetail: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainAvatar}>
        <UserIcon />
        <p>Підбирач</p>
      </div>
      <UserInput value={'Андрій'} placeholder={'Ім\'я'} />
      <UserInput value={'Дніпро'} placeholder={'Місто'} />
      <UserInput value={'+38(067)931-45-49'} placeholder={'Телефон'} />
      <UserInput value={'1-9 років'} placeholder={'Досвід'} />
      <TextArea placeholder={'Опис'} />
      <SubmitButton>Зберегти</SubmitButton>
    </div>
  );
};

export default UserDetail;