import { Request, Response } from 'express';
import {
  createAuthToken,
  deleteToken, getTokenByUserData,
  getTokenByUserId,
} from '../db/authToken';
import * as uuid from 'uuid';
import { sendEmail } from '../service/email';
import { updateIsActive } from '../db/user';

const UserActivateController = {
  createActivateToken: async (req: Request | any, res: Response) => {
    const { id, email } = req.user;
    const token = await getTokenByUserId(id);
    if (token) await deleteToken(token.token);
    const activationLink = uuid.v4();
    await createAuthToken(id, activationLink);
    await sendEmail({
      to: email,
      link: `${process.env.FRONTEND_URL}/activated/${activationLink}`,
      subject: 'Створення аккаунту на сайті "Car service"'
    });
    res.json('На вашу пошту надіслано письмо активації');
  },
  userActivate: async (req: Request | any, res: Response) => {
    const { id, isActivated } = req.user;
    const { token } = req.params;
    const getToken = await getTokenByUserData(id, token);
    if (!getToken || getToken.expiresAt < Date.now() || isActivated) {
      await deleteToken(token);
      return res.status(400).json('Посилання активації не дійсне, зробіть новий запит та спробуйте знову');
    }
    await updateIsActive(id);
    await deleteToken(getToken.token);
    res.json('success');
  },
}

export default UserActivateController