import React, { FC, useState } from 'react';
import styles from './Authorization.module.scss';
import ButtonGreen from '../ui/buttons/buttonGreen';
import { useForm, FormProvider } from 'react-hook-form';
import { login, register } from '../../utils/authValidate';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { yupResolver } from '@hookform/resolvers/yup';
import authServices from '../../service/authService';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';


const AuthorizationForm: FC = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState(0);
  const [roleState, setRoleState] = useState('Client');
  const [errorHandler, setErrorHandler] = useState('');
  const methods = useForm({
    resolver: yupResolver(authType === 0 ? login : register),
  });
  const onSubmit = async (data: any) => {
    try {
      destroyCookie(null, 'authToken', { path: '/' });
      if (authType === 0) {
        const response = await authServices.loginData(data.email, data.password);
        setCookie(null, 'authToken', response.data.token, {
          maxAge: 30 * 24 * 60 * 60, path: '/',
        });
      } else {
        const response = await authServices.registerData(data.userName, data.email, data.password, roleState);
        setCookie(null, 'authToken', response.data.token, {
          maxAge: 30 * 24 * 60 * 60, path: '/',
        });
      }

      router.push('/account');
    } catch (e: any) {
      setErrorHandler(e.response.data.message);
      console.log(e);
    }
  };
  const onClickLogin = () => {
    setAuthType(0);
    methods.clearErrors();
    setErrorHandler('');
  };
  const onClickRegister = () => {
    setAuthType(1);
    methods.clearErrors();
    setErrorHandler('');
  };
  return (
    <main className={styles.main}>
      <div className={styles.authWindow}>
        <ul className={authType === 1 ? styles.active : ''}>
          <li onClick={onClickLogin}>Увійти</li>
          <li onClick={onClickRegister}>Реєстрація</li>
        </ul>
        <div className={styles.formWrapper}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {authType === 0 ?
                <LoginForm errors={methods.formState.errors} /> :
                <RegisterForm errors={methods.formState.errors}
                              setRoleState={setRoleState}
                              roleState={roleState} />}
              <ButtonGreen
                type={'submit'}>{`${authType === 0 ? 'Увійти' : 'Реєстарція'}`}</ButtonGreen>
              {errorHandler && <b>{errorHandler}</b>}
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default AuthorizationForm;