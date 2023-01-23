import { Request, Response } from 'express';
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  getFavoritesId,
} from '../db/favorite';


const FavoriteController = {
  createFavorite: async (req: Request | any, res: Response) => {
    const { offerId } = req.body;
    const { id } = req.user;
    await createFavorite(offerId, id);
    res.json('success');
  },
  deleteFavorite: async (req: Request | any, res: Response) => {
    const { offerId } = req.body;
    const { id } = req.user;
    await deleteFavorite(offerId, id);
    res.json('success');
  },
  getFavoritesId: async (req: Request | any, res: Response) => {
    const {id} = req.user
    const favorites = await getFavoritesId(id)
    const response = favorites.map((el: {offerId: number}) => el.offerId)
    res.json(response)
  },
  getAllFavorites: async (req: Request | any, res: Response) => {
    const {id} = req.user
    const favorites = await getFavorites(id)
    res.json(favorites)
  }
};


export default FavoriteController;