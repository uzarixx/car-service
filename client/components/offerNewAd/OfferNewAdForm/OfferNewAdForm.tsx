import React, { FC, useEffect, useState } from 'react';
import styles from './OfferNewAdForm.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import OfferNewAdTitle from '../OfferNewAdTitle/OfferNewAdTitle';
import OfferNewAdDescription
  from '../OfferNewAdDescription/OfferNewAdDescription';
import OfferNewAdDetails from '../OfferNewAdDetails/OfferNewAdDetails';
import { yupResolver } from '@hookform/resolvers/yup';
import { offerNewAdValidate } from '@/utils/validation/offerNewAdValidate';
import OfferNewAdBudget from '../OfferNewAdBudget/OfferNewAdBudget';
import PostNewAdUser from '../OfferNewAdUser/PostNewAdUser';
import ButtonGreen from '@/components//ui/buttons/buttonGreen';
import SpacingMiddle from '@/components/ui/spacings/SpacingMiddle';
import offerService from '@/service/offerService';
import { useRouter } from 'next/router';
import { userType } from '@/constants/type';
import { useStore } from 'effector-react';
import { $data } from '@/store/userData';
import Link from 'next/dist/client/link';

const OfferNewAdForm: FC = () => {
  const router = useRouter();
  const authUser: userType | any = useStore($data);
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandler, setErrorHandler] = useState('');
  const methods = useForm({
    resolver: yupResolver(offerNewAdValidate),
  });
  useEffect(() => {
    methods.setValue('city', authUser.city);
    methods.setValue('phoneNumber', authUser.phoneNumber);
  }, [authUser]);
  const onSubmit = async (data: any) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        const sliceDesc = data.description.slice(0, 45);
        await offerService.createOffer({ ...data, sliceDesc });
        await router.push('/account/offers');
      }
    } catch (e) {
      setErrorHandler('Ваш акаунт не веріфіковано, перейдіть в профіль за посиланням.');
      console.log(e);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <OfferNewAdTitle methods={methods} />
        <OfferNewAdDetails methods={methods} />
        <OfferNewAdDescription methods={methods} />
        <OfferNewAdBudget methods={methods} />
        <PostNewAdUser methods={methods} city={authUser?.city}
                       phoneNumber={authUser?.phoneNumber} />
        <SpacingMiddle />
        {errorHandler &&
          <div className={styles.errorHandler}><p>{errorHandler}</p> <Link
            href={'/account'}>Особистий кабінет</Link></div>}
        <ButtonGreen type={'submit'}>Створити оголошення</ButtonGreen>
        <SpacingMiddle />
      </form>
    </FormProvider>
  );
};

export default OfferNewAdForm;