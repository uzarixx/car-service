import { User } from '../models/user';

export const getUserByEmail = async (email: string): Promise<any> => {
  const user = await User.findOne({ where: { email } });
  return user;
};
export const createUser = async ({
  userName,
  email,
  password,
  city,
  role,
}: { email: string, userName: string, city: string, password: string, role: string }): Promise<any> => {
  const user = await User.create({ email, userName, city, password, role });
  return user;
};

export const getUserById = async (id: string): Promise<any> => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'role', 'photo', 'userName', 'city', 'email', 'userLastName', 'phoneNumber', 'experience', 'description'],
  });
  return user;
};

export const getPickers = async (): Promise<any> => {
  const pickers = await User.findAll({
    where: { role: 'Picker', status: true },
    attributes: ['id', 'photo', 'userName', 'city', 'experience', 'description', 'createdAt'],
  });
  return pickers;
};

export const getPickerById = async (id: string): Promise<any> => {
  const picker = await User.findOne({
    where: {
      id,
      status: true,
      role: 'Picker',
    },
    attributes: ['id', 'role', 'photo', 'userName', 'city', 'email', 'userLastName', 'phoneNumber', 'experience', 'description'],
  });
  return picker;
};

export const changeAuthUser = async (id: string, email: string, userName: string, userLastName: string, city: string, phoneNumber: string): Promise<any> => {
  const user = await User.update({
    email,
    userName,
    userLastName,
    city,
    phoneNumber,
  }, { where: { id } });
  return user;
};

export const changePortfolio = async (id: string, description: string, experience: string): Promise<any> => {
  const user = await User.update({
    description,
    experience,
  }, { where: { id } });
  return user;
};