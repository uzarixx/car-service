import { User } from '../models/user';

export const getAllUsers = async (): Promise<any> => {
  return  await User.findAll();
};
