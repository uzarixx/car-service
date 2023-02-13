import $api from '@/http';

export default class offersService {
  static async getOffers(page: number) {
    return $api.get(`/get-all-offers?page=${page}`)
  }
  static async getOfferById(id: number) {
    return $api.get(`/get-offer/${id}`)
  }
  static async updateOfferById(data: any) {
    return $api.post('/update-offer-by-id', {data})
  }
  static async removeVerification(id: string) {
    return $api.post('/remove-verification', {offerId: id})
  }
  static async onDeleteOffer(id: string) {
    return $api.delete(`/delete-offer/${id}`)
  }
}