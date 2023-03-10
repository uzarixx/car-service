import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { sendEmail } from '../service/email';
import {
  getPasswordById,
  getUserByEmail,
  getUserById,
  updateUserPassword,
} from '../db/user';
import {
  createForgotToken, deleteToken,
  findToken,
  deleteTokenByUser,
} from '../db/forgotToken';
import bcrypt from 'bcrypt';
import { generateJWt } from '../service/generateJwt';


const UserForgotController = {
  createForgotToken: async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json('Користувача з такою поштою не існує');
    }
    await deleteTokenByUser(user.id);
    const token = uuid.v4();
    const createToken = await createForgotToken(token, user.id, Date.now() + 1000 * 60 * 5);
    await sendEmail({
      to: email,
      link: `${process.env.API_FRONTEND_URL}reset/${token}`,
      subject: 'Відновлення паролю, якщо ви не робили цього то ігноруйте це повідомлення',
    });
    res.json(createToken);
  },
  verifyForgotToken: async (req: Request, res: Response) => {
    const { token } = req.params;
    const response = await findToken(token);
    if (!response || response?.expiresAt < Date.now()) {
      await deleteToken(token);
      return res.status(404).json('Токен не активен, або не знайден');
    }
    res.json('Токен дійсний');
  },
  resetPassword: async (req: Request, res: Response) => {
    const { password } = req.body;
    const { token } = req.params;
    const response = await findToken(token);
    if (!response || response.expiresAt < Date.now()) {
      await deleteToken(token);
      return res.status(404).json('Токен не активен, або не знайден');
    }
    const hashPassword = await bcrypt.hash(password, 7);
    await updateUserPassword(hashPassword, response.userId);
    const user = await getUserById(response.userId);
    const jwt = generateJWt(user.id, user.userName, user.role);
    await deleteToken(token);
    res.json({ jwt });
  },
  updatePassword: async (req: Request | any, res: Response) => {
    const { oldPassword, password } = req.body;
    const { id } = req.user;
    const existingUser = await getPasswordById(id);
    if (!existingUser) return res.status(400).json({ message: `Користувач не знайден` });
    const comparePassword = await bcrypt.compare(oldPassword, existingUser.password);
    if (!comparePassword) return res.status(400).json({ message: 'Пароль не вірний' });
    const hashPassword = await bcrypt.hash(password, 7);
    await updateUserPassword(hashPassword, id);
    res.json('Пароль змінен')
  },
};


export default UserForgotController;