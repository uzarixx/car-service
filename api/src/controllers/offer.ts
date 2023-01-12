import { Request, Response } from 'express';
import {
  createOffer,
  createOfferParams,
  deleteOffer, getFilteredAll,
  getOfferById, getOfferParamsById,
  getOffers,
} from '../db/offer';
import { validationResult } from 'express-validator';


interface Query {
  carTransmission: string;
  carDrive: string;
  carType: string;
  carGas: string;
  city: string;
  page: string;
}


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
    await createOfferParams({ data, offerId: offer.id });
    res.json(data);
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
    const offerParams = await getOfferParamsById(offer.id);
    res.json({ ...offer.dataValues, ...offerParams.dataValues });
  },
  getAllOffers: async (req: Request, res: Response) => {
    const {
      carTransmission,
      carDrive,
      carType,
      carGas,
      city,
      page,
    } = req.query as unknown as Query;
    console.log(city);
    const offers = await getFilteredAll(
      carTransmission || undefined,
      carDrive || undefined,
      carType || undefined,
      carGas || undefined,
      city || undefined,
      page || '1',
    );
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