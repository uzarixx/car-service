import $api from '../http';
import axios from 'axios';

export default class authServices {
  static async registerData(userName: string, email: string, password: string, role: string) {
    return $api.post(`/signup`, {
      userName,
      email,
      password,
      city: '',
      role,
    });
  }

  static async loginData(email: string, password: string) {
    return $api.post(`/login`, { email, password });
  }

  static async getUserData() {
    return $api.get(`/auth-user`);
  }

  static async getUserDataSSR(token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getTelegramActivate() {
    return $api.get('/telegram-activate')
  }

  static async telegramNotifications() {
    return $api.get('/telegram-notifications')
  }
}
