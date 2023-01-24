import { Request, Response } from 'express';
import { getAllOffers } from '../db/offers';


const OffersController = {
  getAllOffers: async (req: Request, res: Response) => {
    const {page} = req.query
    const users = await getAllOffers(Number(page));
    res.json(users);
  },
}

export default OffersController;