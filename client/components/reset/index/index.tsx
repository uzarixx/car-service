import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './ResetComponent.module.scss';
import StandardInput from '@/components/ui/inputs/standardInput';
import SpacingMiddle from '@/components//ui/spacings/SpacingMiddle';
import ButtonGreen from '@/components/ui/buttons/buttonGreen';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordValidate } from '@/utils/validation/resetPassword';
import forgotService from '@/service/forgotService';
import Link from 'next/link';

const ResetComponent: FC = () => {
  const [message, setMessage] = useState('');
  const methods = useForm({
    resolver: yupResolver(resetPasswordValidate),
  });
  const onSubmit = async (data: any) => {
    try {
      await forgotService.createForgotToken(data.email);
      setMessage('На вашу пошту надіслано повідомлення');
      methods.clearErrors();
    } catch (e: any) {
      const error = e?.response.data;
      setMessage('');
      methods.setError('email', { type: 'custom', message: error });
    }
  };
  const error = methods.formState.errors.email as { message: string };
  return (
    <div className={styles.resetWrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h3>Введіть пошту акаунту котрий ви хочете відновити.</h3>
          <SpacingMiddle />
          <StandardInput
            placeholder={'email'}
            type={'text'}
            name={'email'}
            error={error}
          />
          {error && <p>{error.message}</p>}
          {message && <p>{message}</p>}
          {message ? <></> :
            <ButtonGreen type={'submit'}>Надіслати повідомлення</ButtonGreen>}

        </form>
      </FormProvider>
      <Link href={'/authorization'}>Повернутись</Link>
    </div>
  );
};

export default ResetComponent;