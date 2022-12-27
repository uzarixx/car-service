import React, { FC } from 'react';
import StandardInput from '../ui/inputs/standardInput';

interface props {
  errors: any;
}

const LoginForm: FC<props> = ({ errors }) => {
  return (
    <>
      <p>Email-адреса</p>
      <StandardInput error={errors.email} type={'text'} placeholder={'Email-адреса'} name={'email'} />
      {errors.email && <p style={{transform:'translateY(-15px)'}}>{errors.email.message}</p>}
      <p>Пароль</p>
      <StandardInput error={errors.password} type={'password'} placeholder={'Пароль'} name={'password'} />
      {errors.password && <p style={{transform:'translateY(-15px)'}}>{errors.password.message}</p>}
    </>
  );
};

export default LoginForm;