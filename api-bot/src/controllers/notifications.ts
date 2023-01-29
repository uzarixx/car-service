import { Request, Response } from 'express';
import { bot } from '../service/bot';

const NotificationsController = {
  createNotification: async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    await bot.telegram.sendMessage(userId, message)
    res.json('success')
  },
};

export default NotificationsController;