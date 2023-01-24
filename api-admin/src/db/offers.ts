import { Offer } from '../models/offer';


export const getAllOffers = async (page: number): Promise<any> => {
  return await Offer.findAndCountAll({ attributes: { exclude: ['description'] }, limit: 10, offset: (page || 1) * 10 - 10 });
};