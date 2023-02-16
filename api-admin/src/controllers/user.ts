import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
  verifyUser,
} from '../db/users';
import { generateJWt } from '../services/generateJwt';


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
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return res.status(400).json({ message: `Користувач з почтою ${email} не знайдено` });
    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) return res.status(400).json({ message: 'Пароль не вірний' });
    const token = generateJWt(existingUser.id, existingUser.userName, existingUser.role);
    res.json({ token });
  },
};

export default UserController;