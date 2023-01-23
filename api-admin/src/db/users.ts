import { User } from '../models/user';

export const getAllUsers = async (): Promise<any> => {
  return await User.findAll({ attributes: { exclude: ['description', 'password'] } });
};
export const getUserById = async (id: string): Promise<any> => {
  return await User.findOne({
    where: { id },
    attributes: { exclude: ['sliceDesc', 'password'] },
  });
};