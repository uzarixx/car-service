import { Op } from 'sequelize';
import { Chat } from '../models/chat';
import { Messages } from '../models/messages';

export const createChat = async (lastId: number, secondId: number): Promise<any> => {
  const chat = await Chat.create({ lastId, secondId });
  return chat;
};

export const findCreatedChat = async (secondId: number, lastId: number): Promise<any> => {
  const chat = await Chat.findOne({where: { [Op.or]: [{ secondId: secondId, lastId: lastId }, { secondId: lastId, lastId: secondId }] } })
  return chat
};

export const getChatsByUser = async (id: number): Promise<any> => {
  const chats = await Chat.findAll({ where: { [Op.or]: [{ secondId: id }, { lastId: id }] } });
  return chats;
};

export const createMessage = async (chatId: number, message: string, senderId: number): Promise<any> => {
  const newMessage = await Messages.create({ chatId, message, senderId });
  return newMessage;
};

export const getChatById = async (chatId: number): Promise<any> => {
  const chat = await Chat.findOne({ where: { id: chatId } });
  return chat;
};

export const getMessages = async (chatId: number): Promise<any> => {
  const messages = await Messages.findAll({ where: { chatId } });
  return messages;
};