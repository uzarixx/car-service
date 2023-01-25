import React, { FC, useEffect, useState } from 'react';
import styles from './OfferDetail.module.scss';
import offersService from '@/service/offersService';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import UserInput from '@components/ui/input/userInput';
import TextArea from '@components/ui/input/textArea';
import { useSetOfferValue } from '@/utils/useSetValue';
import SubmitButton from '@components/ui/button/submitButton';

const fetchOffer = async (id: number) => {
  const { data } = await offersService.getOfferById(id);
  return (
    await data
  );
};

const OfferDetail: FC = () => {
  const router = useRouter();
  const [offer, setOffer] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    router.query.id && fetchOffer(Number(router.query.id)).then((res) => setOffer(res)).catch((e) => console.error(e));
  }, [router]);
  const methods = useForm()
  const onSubmit = (data: any) => {
    console.log(data);
  }
  useSetOfferValue({ methods, offer })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.form}>
          <UserInput placeholder={'Користувч'} name={'userName'} />
          <UserInput placeholder={'Назва'} name={'title'} />
          <UserInput placeholder={'Бюджет'} name={'budget'} />
          <UserInput placeholder={'Бюджет за сервіс'} name={'budgetService'} />
          <UserInput placeholder={'Бренд авто'} name={'carBrand'} />
          <UserInput placeholder={'Модель авто'} name={'carModel'} />
          <UserInput placeholder={'Мотор л.'} name={'carLiters'} />
          <UserInput placeholder={'Мотор кс.'} name={'carForces'} />
          <UserInput placeholder={'Тип мотору'} name={'carGas'} />
          <UserInput placeholder={'Тип приводу'} name={'carDrive'} />
          <UserInput placeholder={'Трансміссія'} name={'carTransmission'} />
          <UserInput placeholder={'Тип кузову'} name={'carType'} />
          <UserInput placeholder={'Рік авто'} name={'carYear'} />
          <UserInput placeholder={'Місто'} name={'city'} />
          <UserInput placeholder={'Номер телефону'} name={'phoneNumber'} />
          <TextArea placeholder={'Опис'} name={'description'}/>
          <SubmitButton type={'submit'}>Зберегти</SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default OfferDetail;