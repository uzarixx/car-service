import { Offer } from '../models/offer';
import { OfferParams } from '../models/offerParams';


export const getAllOffers = async (page: number): Promise<any> => {
  return await Offer.findAndCountAll({
    attributes: { exclude: ['description'] },
    limit: 5,
    offset: (page || 1) * 5 - 5,
    order: [['isVerify', 'ASC']],
  });
};

export const getOfferById = async (id: string): Promise<any> => {
  const offer = await Offer.findOne({ where: { id } });
  const offerParams = await OfferParams.findOne({ where: { offerId: id } });
  return ({ ...offer.dataValues, ...offerParams.dataValues });
};

export const updateOfferById = async ({ data }: any): Promise<any> => {
  await Offer.update({...data}, {where: { ...data.offerId }})
  return await OfferParams.update({...data}, {where: {offerId: data.offerId}})
}