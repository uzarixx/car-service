import $api from '../http';
import axios from 'axios';


export default class userService {
  static async userInfoSettings(email: string, userName: string, userLastName: string, city: string, phoneNumber: string) {
    return $api.patch(`/user-info-settings`, {
      email,
      userName,
      userLastName,
      city,
      phoneNumber,
    });
  }

  static async pickerChangePortfolio(formData: any) {
    return $api.patch('/picker-change-portfolio',
      formData ,
      { headers: { 'content-type': 'multipart/form-data' } });
  }

  static async pickerPortfolioImages() {
    return $api.get('/picker-portfolio-images')
  }

  static async getAllPickers(token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}get-all-pickers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getPickerById(id: string, token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}get-picker-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async deleteImage(id: number) {
    return $api.delete('/delete-picker-portfolio-images', { data: { id } });
  }
}