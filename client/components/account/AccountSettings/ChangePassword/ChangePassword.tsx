import React, { FC, useState } from 'react';
import styles from './ChangePassword.module.scss';
import AccountSettingsInput from '@/components/ui/inputs/accountSettingsInput';
import { FormProvider, useForm } from 'react-hook-form';
import ButtonGreen from '@/components/ui/buttons/buttonGreen';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import forgotService from '@/service/forgotService';

const inputs = [
  { title: 'Старий пароль', placeholder: 'Старий пароль', name: 'oldPassword' },
  { title: 'Новий пароль', placeholder: 'Новий пароль', name: 'newPassword' },
  {
    title: 'Повторіть новий пароль',
    placeholder: 'Поторіть новий пароль',
    name: 'password',
  },
];

const ChangePassword: FC = () => {
  const [errorHandler, setErrorHandler] = useState('');
  const methods = useForm();
  const closeErrorHandler = () => {
    setTimeout(() => {
      setErrorHandler('');
    }, 5000);
  };
  const onSubmit = async (data: any) => {
    try {
      const response = await forgotService.updatePassword(data.oldPassword, data.password);
      setErrorHandler(response.data);
      closeErrorHandler();
    } catch (e: any) {
      console.log(e);
      e.response.data.message && setErrorHandler(e.response.data.message);
      closeErrorHandler();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {inputs.map((el, i) =>
          <React.Fragment key={i}>
            <div className={styles.formInput}>
              <p>{el.title}</p>
              <div className={styles.inputWrapper}>
                <AccountSettingsInput
                  placeholder={el.placeholder}
                  type={'password'}
                  name={el.name}
                  value={''}
                  error={methods.formState.errors[el.name]}
                />
                {methods.formState.errors[el.name] &&
                  <span>Помилка, будь ласка, перевірте поле</span>}
              </div>
            </div>
            <SpacingMiddle />
          </React.Fragment>,
        )}
        <div className={styles.buttonWrapper}>
          {errorHandler && <span>{errorHandler}</span>}
          <ButtonGreen type={'submit'}>Змінити пароль</ButtonGreen>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangePassword;