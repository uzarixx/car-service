import $api from '@/http';

export default class offersService {
  static async getOffers(page: number) {
    return $api.get(`/get-all-offers?page=${page}`)
  }
  static async getOfferById(id: number) {
    return $api.get(`/get-offer/${id}`)
  }
}