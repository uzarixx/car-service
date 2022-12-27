import { Offer } from '../models/offer';
import { offerDataType } from '../constants/type';


export const createOffer = async ({
  data,
  userId,
  userName,
}: { data: offerDataType, userId: string, userName: string }): Promise<any> => {
  const offer = await Offer.create({
    ...data,
    userId,
    userName,
  });
  return offer;
};

export const getOffers = async (id: number): Promise<any> => {
  const offers = await Offer.findAll({
    where: { userId: id },
    attributes: ['id', 'title', 'description', 'city', 'createdAt'],
  });
  return offers;
};

export const getOffersAll = async (): Promise<any> => {
  const offers = await Offer.findAll({
    attributes: ['id', 'title', 'description', 'city', 'carBrand', 'carModel', 'budget', 'currency', 'budgetService', 'createdAt'],
  });
  return offers;
};

export const getOfferById = async (id: string): Promise<any> => {
  const offer = await Offer.findOne({ where: { id } });
  return offer;
};

export const deleteOffer = async (id: number): Promise<any> => {
  const offer = await Offer.destroy({ where: { id } });
  return offer;
};