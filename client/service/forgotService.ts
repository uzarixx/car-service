import axios from 'axios';
import $api, { API_URL } from '@/http';

export default class forgotService {
  static async createForgotToken(email: string) {
    return axios.post(`${API_URL}create-forgot-token`, { email });
  }
  static async validForgotToken(token: string) {
    return axios.get(`${API_URL}verify-forgot-token/${token}`)
  }

  static async changePassword(token: string, password: string) {
    return axios.post(`${API_URL}update-user-password/${token}`, {password})
  }

  static async updatePassword(oldPassword: string, password: string) {
    return $api.post('/update-password', {oldPassword, password})
  }
}
