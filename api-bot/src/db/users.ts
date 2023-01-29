import { User } from '../models/user';
import { AuthBotTokens } from '../models/AuthBotTokens';
import { BotUser } from '../models/botUser';
import { Op } from 'sequelize';

export const getUserById = async (id: string): Promise<any> => {
  return await BotUser.findOne({ where: { userId: id } });
};
export const getUserByEmail = async (email: string): Promise<any> => {
  return await User.findOne({ where: { email } });
};

export const getBotUserByEmail = async (email: string): Promise<any> => {
  return await BotUser.findOne({ where: { email } });
};

export const createUserBot = async (email: string, userId: string): Promise<any> => {
  return await BotUser.create({ email, userId, isActivated: false });
};

export const createAuthToken = async (user: string, token: string, expiresAt: number): Promise<any> => {
  const getToken = await AuthBotTokens.findOne({ where: { user } });
  getToken && await AuthBotTokens.destroy({ where: { user } });
  return await AuthBotTokens.create({ user, token, expiresAt });
};

export const getToken = async (user: string, token: string): Promise<any> => {
  return await AuthBotTokens.findOne({ where: { [Op.or]: [{ user, token }] } });
};

export const updateIsActive = async (user: string): Promise<any> => {
  await AuthBotTokens.destroy({ where: { user } });
  return await BotUser.update({ isActivated: true }, { where: { userId: user } });
};

export const notificationStatus = async (userId: string, notifications: boolean): Promise<any> => {
  return await BotUser.update({ notifications: !notifications }, { where: { userId } });
};