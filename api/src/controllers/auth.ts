import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { getUserByEmail, createUser } from '../db/user';
import { Request, Response } from 'express';
import { generateJWt } from '../service/generateJwt';
import { validationResult } from 'express-validator';
import { sendEmail } from '../service/email';
import { createAuthToken } from '../db/authToken';


const AuthController = {
  signUp: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: `Помилка валідації` });
    const { userName, email, password, city, role } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: `Користувач з почтою ${email} вже є` });
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await createUser({
      userName,
      email,
      password: hashPassword,
      city,
      role,
    });
    const token = generateJWt(user.id, user.userName, user.role);
    const activationLink = uuid.v4();
    await createAuthToken(user.id, activationLink, Date.now() + 1000 * 60 * 5);
    await sendEmail({
      to: email,
      link: `${process.env.API_URL}/activated/${activationLink}`,
      subject: 'Створення аккаунту на сайті "Car service"',
    });
    res.json({ token });
  },
  login: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: `Помилка валідації` });
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return res.status(400).json({ message: `Користувач з почтою ${email} не знайдено` });
    const comparePassword = await bcrypt.compare(password, existingUser.password);
    if (!comparePassword) return res.status(400).json({ message: 'Пароль не вірний' });
    const token = generateJWt(existingUser.id, existingUser.userName, existingUser.role);
    res.json({ token });
  },
  authUser: async (req: any, res: Response) => {
    res.json(req.user);
  },
};

export default AuthController;