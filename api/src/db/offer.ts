import { Offer } from '../models/offer';
import { offerDataType } from '../constants/type';
import { OfferParams } from '../models/offerParams';
import { Op } from 'sequelize';
import { makeFilter } from '../service/makeFilter';


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

export const createOfferParams = async ({ data, offerId }:
  { data: offerDataType, offerId: number }): Promise<any> => {
  const offerParams = await OfferParams.create({
    ...data,
    offerId,
  });
  return offerParams;
};

export const getOffers = async (id: number, page: string): Promise<any> => {
  return await Offer.findAndCountAll({
    where: { userId: id },
    limit: 10,
    offset: (Number(page) || 1) * 10 - 10,
  });
};

export const getFilteredAll = async (
  carTransmission: string | undefined,
  carDrive: string | undefined,
  carType: string | undefined,
  carGas: string | undefined,
  city: string | undefined,
  page: string): Promise<any> => {
  const filter = {
    carTransmission: carTransmission && carTransmission,
    carDrive: carDrive && carDrive,
    carType: carType && carType,
    carGas: carGas && carGas,
    city: city && { [Op.like]: `%${city}%` },
  };
  const offers: any = await OfferParams.findAll({
    where: makeFilter(filter),
  });
  const offersId = offers.map((el: { offerId: number }) => el.offerId);
  return await Offer.findAndCountAll({
    where: {
      ...(offers.length >= 1 && { [Op.or]: [{ id: offersId }] }),
      isVerify: true,
    },
    attributes: { exclude: ['description'] },
    limit: 10,
    offset: (Number(page) || 1) * 10 - 10,
  });
};

export const getOfferById = async (id: string): Promise<any> => {
  const offer = await Offer.findOne({ where: { id } });
  return offer;
};

export const getOfferParamsById = async (offerId: string): Promise<any> => {
  const offerParams = await OfferParams.findOne({
    where: { offerId },
    attributes: ['carType', 'carTransmission', 'carDrive', 'carGas', 'carBrand', 'carModel'],
  });
  return offerParams;
};

export const deleteOffer = async (id: number): Promise<any> => {
  const offer = await Offer.destroy({ where: { id } });
  return offer;
};