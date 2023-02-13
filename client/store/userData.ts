import { createStore, createEvent } from 'effector';
import { userType } from '@/constants/type';
import authServices from '../service/authService';


export const changeUserData = createEvent<userType | object>('change user data');
export const loadingUserData = createEvent<boolean>('loading user data');
export const $data = createStore([]).on(changeUserData, (_, newData: any) => newData);
export const $loadingData = createStore(true).on(loadingUserData, (_, loading: boolean) => loading);


export const getAuthUser = async () => {
  try {
    loadingUserData(true);
    const { data } = await authServices.getUserData();
    const response = await authServices.getTelegramActivate();
    changeUserData({ ...data, ...response.data });
    loadingUserData(false);
  } catch (e) {
    console.log(e);
  }
};


export const logoutUser = () => {
  changeUserData({});
};