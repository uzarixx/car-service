import { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  verifyUser,
} from '../db/users';


const UserController = {
  getAllUser: async (req: Request, res: Response) => {
    const {page} = req.query
    const users = await getAllUsers(Number(page));
    res.json(users);
  },
  getUserById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
  },
  updateUser: async (req: Request, res: Response) => {
    const { data } = req.body;
    const user = await getUserById(data.id);
    if (!user) return res.status(404).json('Користувач не знайден');
    await updateUserById(data);
    res.json('Зміненно');
  },
  verifyUser: async (req: Request, res: Response) => {
    const { id } = req.body;
    const user = await getUserById(id);
    if (!user) return res.status(404).json('Користувач не знайден');
    await verifyUser(id, user.verify)
    res.json('Зміненно');
  },
};

export default UserController;