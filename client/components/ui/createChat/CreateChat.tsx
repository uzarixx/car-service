import React, { FC } from 'react';
import styles from './CreateChat.module.scss';
import TextArea from '../textArea';
import { FormProvider, useForm } from 'react-hook-form';
import ButtonGreen from '../buttons/buttonGreen';
import chatService from '../../../service/chatService';
import { useRouter } from 'next/router';
import { getChats } from '../../../store/chatData';

interface props {
  userId: number;
}

const CreateChat: FC<props> = ({ userId }) => {
  const methods = useForm();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const response = await chatService.createChat(userId, data.message);
   await getChats();
    router.push(`/messages/${response.data}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.createChat}>
          <TextArea
            name={'message'}
            rows={2}
            placeholder={'Введіть повідомлення...'}
            errors={methods.formState.errors.message as any} />
          <ButtonGreen type={'submit'}>Надіслати повідомлення</ButtonGreen>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateChat;