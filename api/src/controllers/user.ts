import { Request, Response } from 'express';
import {
  changeAuthUser,
  changePortfolio, getPickerById,
  getPickers,
  getUserById,
} from '../db/user';
import { validationResult } from 'express-validator';


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
    const { description, experience } = req.body;
    const user = req.user;
    await changePortfolio(user.id, description, experience);
    res.json(changePortfolio);
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
    res.json(picker);
  },
};


export default UserController;