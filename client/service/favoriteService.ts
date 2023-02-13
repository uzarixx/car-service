import axios from 'axios';
import $api from '../http';


export default class favoriteService {
  static async createFavorite(offerId: number) {
    return $api.post('/create-favorite', { offerId });
  }

  static async deleteFavorite(offerId: number) {
    return $api.delete('/delete-favorite', { data: { offerId } });
  }

  static async getFavoriteId() {
    return $api.get('/get-favorites-id')
  }

  static async getFavoriteSSR(token: string | undefined) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}get-favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
  static async getFavorite() {
    return $api.get(`/get-favorites`)
  }
}