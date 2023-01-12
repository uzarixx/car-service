import React, { FC, useState, useMemo } from 'react';
import styles from './AccountSettings.module.scss';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import SpacingSmall from '../../ui/spacings/SpacingSmall';
import { FormProvider, useForm } from 'react-hook-form';
import AccountSettingsInput from '../../ui/inputs/accountSettingsInput';
import ButtonGreen from '../../ui/buttons/buttonGreen';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  accountSettingsValidate,
} from '../../../utils/validation/accountSettingsValidate';
import userService from '../../../service/userService';
import DropDown from '../../ui/dropDown';
import { useFetchCities } from '../../../utils/fetchCity';
import SuccessData from '../../ui/alerts/successData/SuccessData';
import { changeUserData } from '../../../store/userData';
import AvatarUpload from '../../ui/avatarUpload/AvatarUpload';

interface User {
  id: number;
  userName: string;
  userLastName: string;
  email: string;
  role: string;
  photo: string;
  phoneNumber: string;
  city: string;
  status: boolean;
}

interface Props {
  user: User;
}

const AccountSettings: FC<Props> = ({ user }) => {
  const inputs = useMemo(() => [
    {
      text: 'Ім\'я',
      value: user.userName,
      placeholder: 'Введіть ім\'я',
      type: 'text',
      name: 'userName',
    },
    {
      text: 'Прізвище',
      value: user.userLastName,
      placeholder: 'Введіть прізвище',
      type: 'text',
      name: 'userLastName',
    },
    {
      text: 'Місто',
      value: user.city,
      placeholder: 'Введіть ваше місто',
      type: 'text',
      name: 'city',
    },
    {
      text: 'E-mail',
      value: user.email,
      placeholder: 'Введіть e-mail',
      type: 'text',
      name: 'email',
    },
    {
      text: 'Телефон',
      value: user.phoneNumber,
      placeholder: 'Номер телефону',
      type: 'text',
      name: 'phoneNumber',
    },
  ], [user]);
  const [successChange, setSuccessChange] = useState(false);
  const methods = useForm({
    resolver: yupResolver(accountSettingsValidate),
  });
  const { dropDown, fetching, onClickTown } = useFetchCities(methods);
  const onSubmit = async (data: any) => {
    try {
      setSuccessChange(true);
      const changeData = await userService.userInfoSettings(data.email, data.userName, data.userLastName, data.city, data.phoneNumber);
      changeUserData(changeData.data);
      setTimeout(() => {
        setSuccessChange(false);
      }, 2000);
    } catch (e) {
      console.log(e);
      setSuccessChange(false);
    }
  };

  return (
    <div className={styles.accountSettingsWrapper}>
      <h2>Моя анкета</h2>
      {successChange && <SuccessData />}
      <SpacingSmall />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AvatarUpload photo={user.photo}/>
          <SpacingSmall/>
          {inputs.map((el, i) =>
            <React.Fragment key={i}>
              <div className={styles.formInput}>
                <p>{el.text}</p>
                <div className={styles.inputWrapper}>
                  <AccountSettingsInput
                    placeholder={el.placeholder}
                    type={el.type}
                    name={el.name}
                    value={el.value}
                    fetching={fetching}
                    error={methods.formState.errors[el.name]}
                  />
                  {i === 3 && dropDown?.length >= 1 &&
                    <DropDown top={'-15px'} dropDown={dropDown}
                              onClickTown={onClickTown} />}
                  {methods.formState.errors[el.name] &&
                    <span>Помилка, будь ласка, перевірте поле</span>}
                </div>
              </div>
              <SpacingMiddle />
            </React.Fragment>,
          )}
          <div className={styles.buttonWrapper}>
            <ButtonGreen type={'submit'}>Зберегти зміни</ButtonGreen>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AccountSettings;