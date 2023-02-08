import { Request, Response } from 'express';
import { bot } from '../service/bot';
import { getFromBot } from '../db/users';
import { createResponse, getResponses } from '../db/responses';

const NotificationsController = {
  createNotification: async (req: Request | any, res: Response) => {
    const { receiverId, message } = req.body;
    const { id } = req.user;
    const receiver = await getFromBot(receiverId);
    if (!receiver) return res.status(403).json('Користувач ще не приєднав телеграм бота к сайту');
    if (!receiver.notifications) return res.status(500).json('Користувач не хоче получати повідомлень');
    const responses = await getResponses(id, receiverId);
    if (responses.filter((el) => el.expires > Date.now()).length >= 1) return res.status(500).json('Ви вже надсилали повідомлення цій людині');
    await createResponse(id, receiverId, Date.now() + 1000 * 60 * 5);
    await bot.telegram.sendMessage(receiver.userId, message);
    res.json('success');
  },
};

export default NotificationsController;