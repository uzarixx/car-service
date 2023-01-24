import { User } from '../models/user';

export const getAllUsers = async (page: number): Promise<any> => {
  return await User.findAndCountAll({ attributes: { exclude: ['description', 'password'] }, limit: 10, offset: (page || 1) * 10 - 10 });
};
export const getUserById = async (id: string): Promise<any> => {
  return await User.findOne({
    where: { id },
    attributes: { exclude: ['sliceDesc', 'password'] },
  });
};
export const updateUserById = async (data: { [key: string]: string }): Promise<any> => {
  const id = data.id;
  return await User.update({ ...data }, { where: { id } });
};

export const verifyUser = async (id: number, verify: boolean): Promise<any> => {
  return await User.update({ verify: !verify }, { where: { id } });
};