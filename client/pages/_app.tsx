import '../styles/globals.scss';
import '../styles/_root.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { getAuthUser } from '../store/userData';
import nookies from 'nookies';



export default function App({ Component, pageProps }: AppProps) {
  const authToken: any = 'authToken';
  const token = nookies.get(authToken).authToken;
  useEffect(() => {
    token && getAuthUser();
  }, [token]);


  return (
    <Component {...pageProps} />
  );
}
