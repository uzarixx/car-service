import { Request, Response } from 'express';
import { getAllOffers, getOfferById, updateOfferById } from '../db/offers';
import { Telegraf } from 'telegraf';

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
  botController: async (req: Request, res: Response) => {
    const bot = new Telegraf('5826422816:AAFO5_qy-Ofp8zaXIDkJJJ0LfC6S7cttcSc');
    await bot.telegram.sendMessage(872585345, 'test');
    res.json('success')
  },
};

export default OffersController;