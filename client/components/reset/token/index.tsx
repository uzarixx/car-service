import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import forgotService from '@/service/forgotService';
import PreloaderDots from '@/components/ui/preloaders/PreloaderDots';
import ButtonLinkGreen from '@/components/ui/buttons/buttonLinks/ButtonLinkGreen';
import styles from './ForgotToken.module.scss';
import StandardInput from '@/components/ui/inputs/standardInput';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordsValidate } from '@/utils/validation/resetPassword';
import ButtonGreen from '@/components/ui/buttons/buttonGreen';
import { cookieSet } from '@/utils/cookie';
import { destroyCookie } from 'nookies';

const ForgotToken: FC = () => {
  const router = useRouter();
  const token: any = router.query.token;
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const methods = useForm({
    resolver: yupResolver(passwordsValidate),
  });
  useEffect(() => {
    const isValidToken = async () => {
      setLoading(true);
      try {
        if (token) {
          const { data } = await forgotService.validForgotToken(token);
          data && setIsValid(true);
        }
      } catch (e) {
        setIsValid(false);
      }
      await setLoading(false);
    };
    isValidToken();
  }, [token]);

  const onSubmit = async (data: any) => {
    destroyCookie(null, 'authToken', { path: '/' });
    try {
      const response = await forgotService.changePassword(token, data.password);
      cookieSet(response.data.jwt);
      router.push('/account');
    } catch (e) {
      console.log(e);
      setIsValid(false);
    }
  };

  const errorPass = methods.formState.errors.password as { message: string };
  const errorPasswordRepeat = methods.formState.errors.passwordRepeat as { message: string };
  return (
    <>
      {
        loading && !isValid
          ? <PreloaderDots />
          : <>
            {isValid ?
              <div className={styles.changePass}>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <h3>?????????????? ?????????? ????????????</h3>
                    <StandardInput
                      placeholder={'????????????'}
                      type={'password'}
                      name={'password'}
                      error={errorPass} />
                    {errorPass && <p>{errorPass.message}</p>}
                    <StandardInput
                      placeholder={'?????????????????? ????????????'}
                      type={'password'}
                      name={'passwordRepeat'}
                      error={errorPasswordRepeat} />
                    {errorPasswordRepeat && <p>{errorPasswordRepeat.message}</p>}
                    <ButtonGreen type={'submit'}>?????????????? ????????????</ButtonGreen>
                  </form>
                </FormProvider>
              </div> : <div className={styles.returnedToMain}>
                ?????????????????? ?????????????????????? ???????????????? ???? ????????????, ?????????????? ?????????? ?????????? ????
                ??????????????????
                ??????????
                <ButtonLinkGreen href={'/'}>???? ??????????????</ButtonLinkGreen>
              </div>}
          </>
      }
    </>
  );
};

export default ForgotToken;