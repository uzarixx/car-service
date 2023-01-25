import { Request, Response } from 'express';
import { getAllOffers, getOfferById } from '../db/offers';


const OffersController = {
  getAllOffers: async (req: Request, res: Response) => {
    const { page } = req.query;
    const users = await getAllOffers(Number(page));
    return res.json(users);
  },
  getOfferById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const offer = await getOfferById(id);
    return res.json(offer);
  },
};

export default OffersController;