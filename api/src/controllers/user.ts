import { Request, Response } from 'express';
import {
  changeAuthUser,
  changePortfolio, getPickerById,
  getPickers,
  getUserById, getUserFromTgBot, notificationsStatus,
} from '../db/user';
import { validationResult } from 'express-validator';
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from '../service/cloudinary';
import { createPhoto, deletePhoto, getPhoto, getPhotoById } from '../db/photo';

class T {
}

const UserController = {
  userInfoSettings: async (req: Request | any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: `Помилка валідації` });
    const { email, userName, userLastName, city, phoneNumber } = req.body;
    const user = req.user;
    await changeAuthUser(user.id, email, userName, userLastName, city, phoneNumber);
    const userData = await getUserById(user.id);
    res.json(userData);
  },
  pickerChangePortfolio: async (req: Request | any, res: Response) => {
    const user = req.user;
    const { description, experience } = req.body;
    let image: Array<T> = req.files as Array<T>;
    if (image) {
      const uploader = (await Promise.all(image.map((e) => uploadToCloudinary(e, 'portfolio')))).map(
        ({ secure_url, public_id }) => ({
          secure_url,
          public_id,
          userId: user.id,
        }));
      image = uploader;
    }
    await createPhoto(image);
    await changePortfolio(user.id, description, experience);
    res.json(changePortfolio);
  },

  pickerPortfolioImages: async (req: Request | any, res: Response) => {
    const user = req.user;
    const photos = await getPhoto(user.id);
    res.json(photos);
  },
  deletePickerPortfolioImages: async (req: Request | any, res: Response) => {
    const user = req.user;
    const { id } = req.body;
    const photo = await getPhotoById(id);
    if (!photo || photo.userId !== user.id) {
      return res.status(400).json({ message: 'Нічого не знайдено або ви не автор фото' });
    }
    deleteFromCloudinary(photo.public_id);
    await deletePhoto(id);
    res.json('Видалено.');
  },
  getAllPickers: async (req: Request | any, res: Response) => {
    const pickers = await getPickers();
    res.json(pickers);
  },
  getPickerById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const picker = await getPickerById(id);
    if (!picker) {
      return res.status(400).json({ message: 'Користувач не знайден' });
    }
    const photos = await getPhoto(Number(id));
    res.json({ picker, photos });
  },
  telegramActivate: async (req: Request | any, res: Response) => {
    const { email } = req.user;
    const user = await getUserFromTgBot(email);
    if (!user) return res.json({
      telegramActivate: false,
      notifications: false,
    });
    res.json({ telegramActivate: true, notifications: user.notifications });
  },
  telegramNotifications: async (req: Request | any, res: Response) => {
    const {email} = req.user;
    const user = await getUserFromTgBot(email);
    if (!user) return res.json('Ви не активували бота')
    await notificationsStatus(user.userId, user.notifications)
    res.json('success')
  }
};


export default UserController;