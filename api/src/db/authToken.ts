import { AuthTokens } from '../models/authTokens';
import { Op } from 'sequelize';

export const createAuthToken = async (userId: number, authToken: string): Promise<any> => {
  const token = await AuthTokens.create({ userId, token: authToken });
  return token;
};

export const getTokenByUserData = async (id: number, authToken: string): Promise<any> => {
  const token = await AuthTokens.findOne({ where: { [Op.or]: [{ userId: id , token: authToken}] } });
  return token;
};

export const getTokenByUserId = async (id: number): Promise<any> => {
  const token = await AuthTokens.findOne({where: {userId: id}})
  return token;
}


export const deleteToken = async (authToken: string): Promise<any> => {
  const token = await AuthTokens.destroy({ where: { token: authToken } });
  return token;
};