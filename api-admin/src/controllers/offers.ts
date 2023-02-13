import { Request, Response } from 'express';
import {
  deleteOffer,
  getAllOffers,
  getOfferById,
  removeVerification,
  updateOfferById,
} from '../db/offers';

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
  updateOfferById: async (req: Request, res: Response) => {
    const data = req.body;
    await updateOfferById(data);
    return res.json('success');
  },
  removeVerification: async (req: Request, res: Response) => {
    const { offerId } = req.body;
    await removeVerification(offerId);
    return res.json('success');
  },
  deleteOffer: async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteOffer(Number(id));
    return res.json('success')
  },
};

export default OffersController;