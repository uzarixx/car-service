import { Request, Response } from 'express';
import {
  createAuthToken,
  createUserBot,
  getBotUserByEmail,
  getToken,
  getUserByEmail, updateIsActive,
} from '../db/users';


const UserController = {
  createUser: async (req: Request, res: Response) => {
    const { userId, email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(403).json('Користувач не знайдено, потрібно спочатку зареєструватись на сайти Find Car Picker');
    const botUser = await getBotUserByEmail(email);
    if (botUser && botUser.isActivated) return res.status(500).json('Ви вже зареєстровані');
    if (!botUser) await createUserBot(email, String(userId));
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    await createAuthToken(String(userId), String(code), Date.now() + 1000 * 60 * 5);
    res.json('Success');
  },
  activateUser: async (req: Request, res: Response) => {
    const { userId, token } = req.body;
    const tokenRes = await getToken(String(userId), token);
    if (!tokenRes || tokenRes.expiresAt < Date.now()) return res.status(403).json('Токен не дійсний');
    await updateIsActive(String(userId))
    res.json(tokenRes.token);
  },
};

export default UserController;