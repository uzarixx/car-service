import axios from 'axios';
import nookies from 'nookies';

export const API_URL = 'http://localhost:4000/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: any) => {
  const authToken: any = 'authToken';
  config.headers.Authorization = `Bearer ${nookies.get(authToken).authToken}`;
  return config;
});

export default $api;