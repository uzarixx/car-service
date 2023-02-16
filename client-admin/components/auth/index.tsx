import React, { FC, useState } from 'react';
import usersService from '@/service/usersService';
import { cookieSet } from '@/utils/cookieSet';


const Auth: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await usersService.login(email, password);
    console.log(data);
    await cookieSet(data.token);
  };


  return (<form onSubmit={onSubmit}>
    <input value={email} onChange={(e) => setEmail((e.target.value))} />
    <input value={password} onChange={(e) => setPassword((e.target.value))} />
    <button type={'submit'}>Login</button>
  </form>);
};

export default Auth;