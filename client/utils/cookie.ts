import { setCookie } from 'nookies';

export const cookieSet = (token: string) => {
  setCookie(null, 'authToken', token, {
    maxAge: 30 * 24 * 60 * 60, path: '/',
  });
};