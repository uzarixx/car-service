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

const inputs = [
  { placeholder: 'Користувач', name: 'userName' },
  { placeholder: 'Назва', name: 'title' },
  { placeholder: 'Бюджет', name: 'budget' },
  { placeholder: 'Бюджет за сервіс', name: 'budgetService' },
  { placeholder: 'Бренд авто', name: 'carBrand' },
  { placeholder: 'Модель авто', name: 'carModel' },
  { placeholder: 'Мотор л.', name: 'carLiters' },
  { placeholder: 'Мотор кс.', name: 'carForces' },
  { placeholder: 'Тип мотору', name: 'carGas' },
  { placeholder: 'Тип приводу', name: 'carDrive' },
  { placeholder: 'Трансміссія', name: 'carTransmission' },
  { placeholder: 'Тип кузову', name: 'carType' },
  { placeholder: 'Рік авто', name: 'carYear' },
  { placeholder: 'Місто', name: 'city' },
  { placeholder: 'Номер телефону', name: 'phoneNumber' },
];

const OfferDetail: FC = () => {
  const router = useRouter();
  const [offer, setOffer] = useState<{ [key: string]: string }>({});
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    router.query.id && fetchOffer(Number(router.query.id)).then((res) => setOffer(res)).catch((e) => console.error(e));
  }, [router]);
  const methods = useForm();
  const onSubmit = async (data: any) => {
    try {
      await offersService.updateOfferById({ ...data, offerId: offer.offerId });
      const response = await fetchOffer(Number(router.query.id));
      await setOffer(response);
      setIsUpdate(true);
      closeUpdate();
    } catch (e) {
      console.log(e);
    }
  };
  const onRemoveVerification = async () => {
    try {
      await offersService.removeVerification(offer.offerId);
      const data = await fetchOffer(Number(router.query.id));
      await setOffer(data);
      setIsUpdate(true);
      closeUpdate();
    } catch (e) {
      console.log(e);
    }
  };
  const onDeleteOffer = async () => {
    try {
      await offersService.onDeleteOffer(offer.offerId);
      await router.push('/offers?page=1');
    } catch (e) {
      console.log(e);
    }
  };
  const closeUpdate = () => {
    setTimeout(() => {
      setIsUpdate(false);
    }, 4000);
  };
  useSetOfferValue({ methods, offer });
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}
              className={styles.container}>
          <div className={styles.form}>
         <span
           className={`${styles.updateData} ${isUpdate && styles.updateDataActive}`}>Дані збережені</span>
            {inputs.map((el, i) =>
                <UserInput placeholder={el.placeholder} name={el.name} key={i}/>
            )}
            <TextArea placeholder={'Опис'} name={'description'} />
            <SubmitButton type={'submit'}>Зберегти та
              веріфікувати</SubmitButton>
            <div
              className={`${styles.statusDot} ${offer?.isVerify && styles.statusDotActive}`}></div>
            <SubmitButton onClick={onRemoveVerification} type={'button'}>Деверіфікувати
              оголошення</SubmitButton>
            <SubmitButton onClick={onDeleteOffer} type={'button'}>Видалити
              оголошення</SubmitButton>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default OfferDetail;