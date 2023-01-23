import { Request, Response } from 'express';
import {
  createChat,
  createMessage, findCreatedChat,
  getChatById, getChatsByUser,
  getMessages,
} from '../db/chat';
import { getReceiversUsers } from '../db/user';
import { validationResult } from 'express-validator';

const ChatController = {
  createChat: async (req: Request | any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: `Помилка валідації` });
    const { lastId, message } = req.body;
    const { id } = req.user;
    const isCreated = await findCreatedChat(id, lastId);
    if (lastId === id) {
      return res.status(500).json({ message: 'Ви не можете створити чат з самим собою' });
    }
    if (isCreated) {
      await createMessage(isCreated.id, message, id);
      return res.json(isCreated.id);
    }
    const chat = await createChat(lastId, id);
    await createMessage(chat.id, message, id);
    res.json(chat.id);
  },
  getChats: async (req: Request | any, res: Response) => {
    const { id } = req.user;
    const chats = await getChatsByUser(id);
    const array: any = [];
    if (!chats) {
      return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    }
    chats.map((el: any) => array.push(el.secondId, el.lastId));
    const filteredArray = array.filter((el: number) => el !== id);
    const user = await getReceiversUsers(filteredArray);
    res.json({ chats, user });
  },
  getChat: async (req: Request | any, res: Response) => {
    const { id } = req.user;
    const { chatId } = req.params;
    const chat = await getChatById(chatId);
    if (!chat) return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    if (chat.secondId !== id && chat.lastId !== id) {
      return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    }
    const user = await getReceiversUsers([chat.secondId !== id ? chat.secondId : chat.lastId]);
    res.json(user);
  },
  createMessage: async (req: Request | any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: `Помилка валідації` });
    const { chatId, message } = req.body;
    const { id } = req.user;
    const chat = await getChatById(chatId);
    if (!chat) return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    if (chat.secondId !== id && chat.lastId !== id) {
      return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    }
    await createMessage(chatId, message, id);
    res.json('success');
  },
  getMessage: async (req: Request | any, res: Response) => {
    const { chatId } = req.params;
    const { id } = req.user;
    const chat = await getChatById(chatId);
    if (!chat) return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    if (chat.secondId !== id && chat.lastId !== id) {
      return res.status(500).json({ message: 'Ви не можете надсилати повідомлення в цьому чаті.' });
    }
    const messages = await getMessages(chatId);
    res.json(messages);
  },
};

export default ChatController;