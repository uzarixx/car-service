import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './AccountPortfolio.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from '../../ui/textArea';
import SpacingMiddle from '../../ui/spacings/SpacingMiddle';
import { ExperienceArray } from '../../../constants/selectArrays';
import SelectDefault from '../../ui/select/selectDefault';
import { portfolioAccountValidate } from '../../../utils/validation/portfolioAccountValidate';
import ButtonGreen from '../../ui/buttons/buttonGreen';
import userService from '../../../service/userService';
import SuccessData from '../../ui/alerts/successData/SuccessData';
import DragAndDrop from '../../ui/dragAndDrop/DragAndDrop';
import ImageGallery from '../../ui/imageGallery/ImageGallery';
import { FormDataHooks } from '../../../utils/formDataHooks';

interface User {
  description: string;
  experience: string;
}

interface Props {
  authUser: User;
}

const getPhotos = async () => {
  const { data } = await userService.pickerPortfolioImages();
  return data
};

const AccountPortfolio: FC<Props> = ({ authUser }) => {
  const [successChange, setSuccessChange] = useState(false);
  const [profileImages, setProfileImages] = useState([])
  const methods = useForm({
    resolver: yupResolver(portfolioAccountValidate),
    defaultValues: { description: authUser.description, experience: authUser.experience, images: []}
  });
  const getFunc = () => {
    const data = getPhotos();
    data.then((res) => {setProfileImages(res);});
  }
  useEffect(() => {
    getFunc()
  }, []);
  const onSubmit = async (data: any) => {
    setSuccessChange(true);
    const formData = FormDataHooks(data, methods)
    await userService.pickerChangePortfolio(formData);
    methods.setValue('images', [])
    getFunc()
    setTimeout(() => {
      setSuccessChange(false);
    }, 2000);
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
              <TextArea title={'Опишіть свій досвід'}
                        errors={errors.description} name={'description'}
                        placeholder={'Опишіть який у вас досвід, які авто ви підбирали і т.д'} />
              {errors.description && <span>{errors.description.message}</span>}
            </div>
            <SpacingMiddle />
            <p>Фото</p>
            <ImageGallery methods={methods} images={profileImages}/>
            <SpacingMiddle />
            <DragAndDrop  setImages={methods} />
            <SpacingMiddle />
            <ButtonGreen type={'submit'}>Зберегти</ButtonGreen>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AccountPortfolio;