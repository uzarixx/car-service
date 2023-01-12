import axios from 'axios';
import $api from '../http';


export default class offerService {
  static async createOffer(data: any) {
    return $api.post(`/offer-new-create`, {
      ...data,
    });
  }

  static async getOffers() {
    return $api.get('/offer-get-client');
  }

  static async getOfferById(id: string, token: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}offer-get-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getAllOffers(token: string, carTransmission: string, carType: string, carDrive: string, carGas: string, city: string, page: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}offer-get-all`, {
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