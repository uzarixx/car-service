import axios from 'axios';

export default class forgotService {
  static async createForgotToken(email: string) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}create-forgot-token`, { email });
  }
  static async validForgotToken(token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}verify-forgot-token/${token}`)
  }

  static async changePassword(token: string, password: string) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}update-user-password/${token}`, {password})
  }
}
