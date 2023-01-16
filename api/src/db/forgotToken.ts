import { ForgotTokens } from '../models/forgotTokens';


export const createForgotToken = async (token: string, userId: number): Promise<any> => {
  return await ForgotTokens.create({ userId, token });
};

export const deleteTokenByUser = async (userId: number): Promise<any> => {
  return await ForgotTokens.destroy({where: {userId}})
}

export const findToken = async (token: string): Promise<any> => {
  return await ForgotTokens.findOne({where: {token}})
}

export const deleteToken = async (token: string): Promise<any> => {
  return await ForgotTokens.destroy({where: {token}})
}
