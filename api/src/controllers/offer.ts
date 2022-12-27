import { Request, Response } from 'express';
import {
  createOffer,
  deleteOffer,
  getOfferById,
  getOffers,
  getOffersAll,
} from '../db/offer';
import { validationResult } from 'express-validator';


const OfferController = {
  createOffer: async (req: Request | any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: `Помилка валідації` });
    }
    const data = req.body;
    const user = req.user;
    const offer = await createOffer({
      data,
      userId: user.id,
      userName: user.userName,
    });
    res.json(offer);

  },
  getOffers: async (req: Request | any, res: Response) => {
    const { id } = req.user;
    const offers = await getOffers(id);
    res.json(offers);
  },
  getOfferById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const offer = await getOfferById(id);
    if (!offer) {
      return res.status(404).json({ message: 'Нічого не знайдено' });
    }
    res.json(offer);
  },
  getAllOffers: async (req: Request, res: Response) => {
    const offers = await getOffersAll();
    res.json(offers);
  },
  offerDelete: async (req: Request | any, res: Response) => {
    const { id } = req.body;
    const user = req.user;
    const offer = await getOfferById(id);
    if (!offer || user.id !== offer.userId) {
      return res.status(404).json({ message: 'Нічого не знайдено' });
    }
    await deleteOffer(id);
    res.json('Видалено');
  },
};


export default OfferController;