import React, { FC } from 'react';
import styles from './CreateChat.module.scss';
import TextArea from '../textArea';
import { FormProvider, useForm } from 'react-hook-form';
import ButtonGreen from '../buttons/buttonGreen';
import chatService from '../../../service/chatService';
import nookies from 'nookies';
import { yupResolver } from '@hookform/resolvers/yup';
import { createChatValidation } from '@/utils/validation/createChatValidation';

interface props {
  userId: number;
}

const CreateChat: FC<props> = ({ userId }) => {
  const methods = useForm({
    resolver: yupResolver(createChatValidation),
  });
  const onSubmit = async (data: any) => {
    try {
      const token = nookies.get('authToken' as any).authToken;
      await chatService.createNotifications(userId, data.message, token);
      methods.reset()
    } catch (e: any) {
      methods.setError('message', { type: 'custom', message: e.response.data });
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.createChat}>
          <TextArea
            name={'message'}
            rows={2}
            placeholder={'Наприклад: Я хотів би з вами по співпрацювати, ось мій телеграм: @tom_ford'}
            errors={methods.formState.errors.message as any} />
          {methods.formState.errors.message &&
            <span>{methods.formState.errors.message.message as string}</span>}
          <ButtonGreen type={'submit'}>Надіслати повідомлення</ButtonGreen>
        </div>
      </form>
    </FormProvider>
  );
};
export default CreateChat;