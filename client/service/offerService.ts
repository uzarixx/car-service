import axios from 'axios';
import $api, { API_URL } from '../http';


export default class offerService {
  static async createOffer(data: any) {
    return $api.post(`/offer-new-create`, {
      ...data,
    });
  }

  static async getOffers(page: number) {
    return $api.get(`/offer-get-client?page=${page}`);
  }

  static async getOfferById(id: string, token: string|undefined) {
    return axios.get(`${API_URL}offer-get-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getAllOffers(token: string | undefined, carTransmission: string, carType: string, carDrive: string, carGas: string, city: string, page: string) {
    return axios.get(`${API_URL}offer-get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        carType: carType || '',
        carTransmission: carTransmission || '',
        carDrive: carDrive || '',
        carGas: carGas || '',
        city: city || '',
        page: page || '1',
      },
    });
  }

  static async deleteOffer(id: number) {
    return $api.delete('/offer-delete', { data: { id } });
  }
}