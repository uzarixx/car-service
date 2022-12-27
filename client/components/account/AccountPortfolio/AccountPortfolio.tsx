import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './AccountPortfolio.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from '../../ui/textArea';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import { ExperienceArray } from '../../../constants/selectArrays';
import SelectDefault from '../../ui/select/selectDefault';
import { portfolioAccountValidate, } from '../../../utils/portfolioAccountValidate';
import ButtonGreen from '../../ui/buttons/buttonGreen';
import userService from '../../../service/userService';
import SuccessData from '../../ui/alerts/successData/SuccessData';
interface User {
  description: string;
  experience: string;
}
interface Props {
  authUser: User;
}
const AccountPortfolio: FC<Props> = ({ authUser }) => {
  const [successChange, setSuccessChange] = useState(false);
  const methods = useForm({
    resolver: yupResolver(portfolioAccountValidate),
    defaultValues: { description: authUser.description, experience: authUser.experience, },
  });
  const onSubmit = async (data: any) => {
    setSuccessChange(true);
    await userService.pickerChangePortfolio(data.description, data.experience);
    setTimeout(() => {setSuccessChange(false);}, 2000);
  };
  const errors: boolean | any = methods.formState.errors;
  return (
    <div className={styles.accountPortfolioWrapper}>
      <h2>Моє портфоліо</h2>
      {successChange && <SuccessData />}
      <SpacingMiddle />
      <div className={styles.portfolioWrapper}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.textAreaWrapper}>
              <SelectDefault error={errors} selectArray={ExperienceArray} />
              <SpacingMiddle />
              <TextArea title={'Опишіть свій досвід'} errors={errors.description} name={'description'} placeholder={'Опишіть який у вас досвід, які авто ви підбирали і т.д'} />
              {errors.description && <span>{errors.description.message}</span>}
            </div>
            <SpacingMiddle />
            <ButtonGreen type={'submit'}>Зберегти</ButtonGreen>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AccountPortfolio;