import { Favorite } from '../models/favorite';
import { Op } from 'sequelize';
import { Offer } from '../models/offer';

export const createFavorite = async (offerId: number, userId: number): Promise<any> => {
  return await Favorite.create({ offerId, userId });
};

export const deleteFavorite = async (offerId: number, userId: number): Promise<any> => {
  return await Favorite.destroy({ where: { [Op.or]: [{ offerId, userId }] } });
};

export const getFavoritesId = async (userId: number): Promise<any> => {
  return await Favorite.findAll({ where: { userId }, attributes: ['offerId'] });
};

export const getFavorites = async (userId: number): Promise<any> => {
  const favoritesId = await Favorite.findAll(({
    where: { userId },
    attributes: ['offerId'],
  }));
  const id = favoritesId.map((el: any) => el.offerId);
  return await Offer.findAndCountAll({
    where: { id },
    attributes: { exclude: ['description'] },
  });
};