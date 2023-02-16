import $api, { API_URL } from '../http';
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

  static async pickerChangePortfolio(formData: FormData | any) {
    console.log(formData);
    return $api.patch('/picker-change-portfolio',
      formData ,
      { headers: { 'content-type': 'multipart/form-data' } });
  }

  static async userUploadAvatar(formData: FormData) {
    return $api.post('/user-upload-avatar', formData, {
      headers: {'content-type': 'multipart/form-data'}
    })
  }

  static async pickerPortfolioImages() {
    return $api.get('/picker-portfolio-images')
  }

  static async getAllPickers(token: string | undefined, page: string, city: string) {
    return axios.get(`${API_URL}get-all-pickers?page=${page || 1}&city=${city || ''}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async createActivationLink() {
    return $api.get('/create-activate-token')
  }

  static async activateAccount (token: string) {
    return $api.get(`/user-activated/${token}`)
  }

  static async getPickerById(id: string, token: string | undefined) {
    return axios.get(`${API_URL}get-picker-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async deleteImage(id: number) {
    return $api.delete('/delete-picker-portfolio-images', { data: { id } });
  }
  static async deleteAvatar(secure_url: string) {
    return $api.delete('/user-delete-avatar', {data: {secure_url}})
  }

  static async getAllCarParams () {
    return $api.get('/get-all-car-params')
  }
}