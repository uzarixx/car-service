import { Op, QueryTypes } from 'sequelize';
import { Chat } from '../models/chat';
import { Messages } from '../models/messages';
import sequelize from '../db/connect';

export const createChat = async (lastId: number, secondId: number): Promise<any> => {
  const chat = await Chat.create({ lastId, secondId });
  return chat;
};

export const findCreatedChat = async (secondId: number, lastId: number): Promise<any> => {
  const chat = await Chat.findOne({
    where: {
      [Op.or]: [{
        secondId: secondId,
        lastId: lastId,
      }, { secondId: lastId, lastId: secondId }],
    },
  });
  return chat;
};

export const getChatsByUser = async (id: number): Promise<any> => {
  const chats = await Chat.findAll({
    where: { [Op.or]: [{ secondId: id }, { lastId: id }] },
    order: [['updatedAt', 'DESC']]
  });
  return chats;
};

export const createMessage = async (chatId: number, message: string, senderId: number): Promise<any> => {
  const newMessage: any = await Messages.create({ chatId, message, senderId });
  await sequelize.query('UPDATE chats SET "updatedAt" = NOW() WHERE chats.id = :id', {
    replacements: { id: chatId },
    type: QueryTypes.UPDATE,
  });
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