import { User } from '../models/user';
import { Op } from 'sequelize';
import { BotUser } from '../models/botUser';
import { makeFilter } from '../service/makeFilter';

const attributesArray = ['id', 'role', 'photo', 'userName', 'city', 'email', 'userLastName', 'phoneNumber', 'experience', 'description', 'status', 'verify'];

export const getUserByEmail = async (email: string): Promise<any> => {
  return await User.findOne({ where: { email } });
};
export const createUser = async ({
  userName,
  email,
  password,
  city,
  role,
}: { email: string, userName: string, city: string, password: string, role: string }): Promise<any> => {
  return await User.create({ email, userName, city, password, role });
};

export const getUserById = async (id: string): Promise<any> => {
  return await User.findOne({
    where: { id },
    attributes: attributesArray,
  });
};

export const getPasswordById = async (id: string): Promise<any> => {
  return await User.findOne({ where: { id }, attributes: ['password'] });
};

export const getReceiversUsers = async (array: any): Promise<any> => {
  return await User.findAll({
    where: { id: { [Op.in]: array } },
    attributes: ['id', 'userName', 'photo'],
  });
};

export const getPickers = async (page: string, city: string): Promise<any> => {
  const filter = {
    city: city && { [Op.like]: `%${city}%` },
    verify: true,
    role: 'Picker'
  };
  return await User.findAndCountAll({
    where: makeFilter(filter),
    attributes: ['id', 'photo', 'userName', 'city', 'experience', 'sliceDesc', 'createdAt'],
    limit: 10,
    offset: (Number(page) || 1) * 10 - 10
  });
};

export const getPickerById = async (id: string): Promise<any> => {
  return await User.findOne({
    where: {
      id,
      verify: true,
      role: 'Picker',
    },
    attributes: attributesArray,
  });
};

export const changeAuthUser = async (id: string, email: string, userName: string, userLastName: string, city: string, phoneNumber: string): Promise<any> => {
  return await User.update({
    email,
    userName,
    userLastName,
    city,
    phoneNumber,
    verify: false,
  }, { where: { id } });
};

export const updateIsActive = async (id: number): Promise<any> => {
  return await User.update({ status: true }, { where: { id } });
};

export const changePortfolio = async (id: string, description: string, experience: string): Promise<any> => {
  return await User.update({
    description,
    experience,
    sliceDesc: description.slice(0, 45),
  }, { where: { id } });
};

export const updateUserPassword = async (password: string, id: number): Promise<any> => {
  return await User.update({ password: password }, { where: { id } });
};

export const getUserFromTgBot = async (email: string): Promise<any> => {
  return await BotUser.findOne({ where: { email } });
};

export const notificationsStatus = async (userId: string, notifications: boolean): Promise<any> => {
  return await BotUser.update({ notifications: !notifications }, { where: { userId } });
};