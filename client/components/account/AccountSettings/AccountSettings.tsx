import React, { FC, useState } from 'react';
import styles from './AccountSettings.module.scss';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import SpacingSmall from '@/components/ui/spacings/SpacingSmall';
import { FormProvider, useForm } from 'react-hook-form';
import AccountSettingsInput from '@/components/ui/inputs/accountSettingsInput';
import ButtonGreen from '@/components/ui/buttons/buttonGreen';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  accountSettingsValidate,
} from '@/utils/validation/accountSettingsValidate';
import userService from '@/service/userService';
import DropDown from '@/components/ui/dropDown';
import { useFetchCities } from '@/utils/fetchCity';
import SuccessData from '@/components//ui/alerts/successData/SuccessData';
import { changeUserData } from '@/store/userData';
import AvatarUpload from '@/components/ui/avatarUpload/AvatarUpload';
import { userInputs } from '@/constants/userInputArray';
import TelegramActivate from '@/components/ui/telegramActivate';
import authServices from '@/service/authService';
import ChangePassword
  from '@/components/account/AccountSettings/ChangePassword/ChangePassword';

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
  telegramActivate: boolean;
}

interface Props {
  user: User;
}

const AccountSettings: FC<Props> = ({ user }) => {
  const [successChange, setSuccessChange] = useState(false);
  const methods = useForm<any>({
    resolver: yupResolver(accountSettingsValidate),
    defaultValues: {
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      city: user.city || '',
      userLastName: user.userLastName || '',
      userName: user.userName || '',
    },
  });
  const { dropDown, fetching, onClickTown } = useFetchCities(methods);
  const onSubmit = async (data: any) => {
    try {
      setSuccessChange(true);
      const changeData = await userService.userInfoSettings(data.email, data.userName, data.userLastName, data.city, data.phoneNumber);
      const response = await authServices.getTelegramActivate();
      changeUserData({ ...changeData.data, ...response.data });
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
      <h2>?????? ????????????</h2>
      {successChange && <SuccessData />}
      <SpacingSmall />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AvatarUpload photo={user.photo} />
          <SpacingSmall />
          {userInputs.map((el: any, i) =>
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
                    <span>??????????????, ???????? ??????????, ?????????????????? ????????</span>}
                </div>
              </div>
              <SpacingMiddle />
            </React.Fragment>,
          )}
          <div className={styles.buttonWrapper}>
            <ButtonGreen type={'submit'}>???????????????? ??????????</ButtonGreen>
          </div>
        </form>
        <SpacingMiddle />
        <p>?????????? ????????????</p>
        <SpacingSmall />
        <ChangePassword />
        <SpacingMiddle />
        <p>Telegram-????????????????????????</p>
        <SpacingSmall />
        <TelegramActivate />
      </FormProvider>
    </div>
  );
};

export default AccountSettings;