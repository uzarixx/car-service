import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import OfferNewAdTitle from '../OfferNewAdTitle/OfferNewAdTitle';
import OfferNewAdDescription from '../OfferNewAdDescription/OfferNewAdDescription';
import OfferNewAdDetails from '../OfferNewAdDetails/OfferNewAdDetails';
import { yupResolver } from '@hookform/resolvers/yup';
import { offerNewAdValidate } from '../../../utils/offerNewAdValidate';
import OfferNewAdBudget from '../OfferNewAdBudget/OfferNewAdBudget';
import PostNewAdUser from '../OfferNewAdUser/PostNewAdUser';
import authServices from '../../../service/authService';
import ButtonGreen from '../../ui/buttons/buttonGreen';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import offerService from '../../../service/offerService';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

const OfferNewAdForm: FC = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<{ city: string; phoneNumber: string } | null>(null);
  const methods = useForm({
    resolver: yupResolver(offerNewAdValidate),
  });
  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const { data } = await authServices.getUserData();
        setAuthUser(data);
        methods.setValue('city', data.city);
        methods.setValue('phoneNumber', data.phoneNumber);
      } catch (e) {
        destroyCookie(null, 'authToken', {path: '/'});
      }
    };
    getAuthUser();
  }, [methods]);
  const onSubmit = async (data: any) => {
    await offerService.createOffer(data);
    router.push('/account/offers');
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <OfferNewAdTitle methods={methods} />
        <OfferNewAdDetails methods={methods} />
        <OfferNewAdDescription methods={methods} />
        <OfferNewAdBudget methods={methods} />
        <PostNewAdUser methods={methods} city={authUser?.city} phoneNumber={authUser?.phoneNumber} />
        <SpacingMiddle />
        <ButtonGreen type={'submit'}>Створити оголошення</ButtonGreen>
        <SpacingMiddle />
      </form>
    </FormProvider>
  );
};

export default OfferNewAdForm;