import { Request, Response } from 'express';
import {
  createAuthToken,
  createUserBot, deleteUser,
  getBotUserByEmail,
  getToken,
  getUserByEmail,
  getUserById,
  notificationStatus,
  updateIsActive,
  updateUserName,
} from '../db/users';
import { sendEmail } from '../service/email';


const UserController = {
  getUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(String(id));
    if (!user) return res.status(403).json('Користувач не знайден');
    res.json(user);
  },
  createUser: async (req: Request, res: Response) => {
    const { userId, email, username } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(403).json('Користувач не знайдено, потрібно спочатку зареєструватись на сайти AUTO-POSHUK');
    const botUser = await getBotUserByEmail(email);
    if (botUser && botUser.isActivated) return res.json(botUser);
    if (!botUser) await createUserBot(email, String(userId), username);
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    await createAuthToken(String(userId), String(code), Date.now() + 1000 * 60 * 5);
    await sendEmail({
      to: email,
      code: String(code),
      subject: 'Активація бота',
    });
    res.json('success');
  },
  deleteUser: async (req: Request, res: Response) => {
    const {userId} = req.body
    const user = await getUserById(String(userId))
    if (!user) return res.status(400).json('Такого користувача немає')
    await deleteUser(String(userId))
    res.json('success')
  },
  activateUser: async (req: Request, res: Response) => {
    const { userId, token } = req.body;
    const tokenRes = await getToken(String(userId), token);
    if (!tokenRes || tokenRes.expiresAt < Date.now()) return res.status(403).json('Токен не дійсний');
    await updateIsActive(String(userId));
    res.json(tokenRes.token);
  },
  updateName: async (req: Request, res: Response) => {
    const {userId, username} = req.body;
    const user = await getUserById(String(userId));
    if (!user) return res.status(403).json('Користувач не знайден');
    await updateUserName(user.id, username)
    res.json('success')
  },
  notificationStatus: async (req: Request, res: Response) => {
    const { userId } = req.body;
    const user = await getUserById(String(userId));
    if (!user) return res.status(403).json('Користувач не знайден');
    await notificationStatus(String(userId), user.notifications);
    res.json('success');
  },
};

export default UserController;