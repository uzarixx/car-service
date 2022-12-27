import React, { FC, useState } from 'react';
import styles from './Authorization.module.scss';
import StandardInput from '../ui/inputs/standardInput';
import VisibilityOffEye from '../ui/icons/VisibilityOffEye';
import VisibilityEye from '../ui/icons/VisibilityEye';

interface props {
  errors: any;
  setRoleState: (e: string) => void;
  roleState: string;
}

const role = [
  { title: 'Я кліент', value: 'Client' },
  { title: 'Я підбирач', value: 'Picker' },
];
const RegisterForm: FC<props> = ({ errors, roleState, setRoleState }) => {

  const [passwordShower, setPasswordShower] = useState(false);
  const [passwordRepeatShower, setPasswordRepeatShower] = useState(false);
  const onClickPassword = () => {
    setPasswordShower(!passwordShower);
  };
  const onClickPasswordRepeat = () => {
    setPasswordRepeatShower(!passwordRepeatShower);
  };
  const onClickRole = (el: string) => {
    setRoleState(el)
  }
  return (
    <>
      <div className={styles.roleWrapper}>
        {role.map((el, i: number) =>
          <div key={i} onClick={()=>onClickRole(el.value)} className={`${styles.role} ${roleState === el.value && styles.active}`}>{el.title}</div>
        )}
      </div>
      <p>Email-адреса</p>
      <StandardInput error={errors.email} type={'text'} placeholder={'Email-адреса'} name={'email'} />
      {errors.email && <p
        style={{ transform: 'translateY(-15px)' }}>{errors.email.message}</p>}
      <p>{'Ваше ім\'я'}</p>
      <StandardInput error={errors.userName} type={'text'} placeholder={'Ваше ім\'я'} name={'userName'} />
      {errors.userName && <p style={{ transform: 'translateY(-15px)' }}>{errors.userName.message}</p>}
      <p>Пароль</p>
      <div className={styles.inputShower}>
        <StandardInput error={errors.passwordRepeat} type={passwordRepeatShower ? 'text' : 'password'} placeholder={'Пароль'} name={'passwordRepeat'} />
        <span onClick={onClickPasswordRepeat}>{passwordRepeatShower ? <VisibilityOffEye /> : <VisibilityEye />}</span>
      </div>
      {errors.passwordRepeat && <p style={{ transform: 'translateY(-15px)' }}>{errors.passwordRepeat.message}</p>}
      <p>Повторіть пароль</p>
      <div className={styles.inputShower}>
        <StandardInput error={errors.password} type={passwordShower ? 'text' : 'password'} placeholder={'Повторіть пароль'} name={'password'} />
        <span onClick={onClickPassword}>{passwordShower ? <VisibilityOffEye /> : <VisibilityEye />}</span>
      </div>
      {errors.password && <p style={{ transform: 'translateY(-15px)' }}>{errors.password.message}</p>}
    </>
  );
};

export default RegisterForm;