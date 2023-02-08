import { Responses } from '../models/responses';
import { Op } from 'sequelize';

export const createResponse = async (senderId: number, receiverId: number, expires: number): Promise<any> => {
  return await Responses.create({ senderId, receiverId, expires });
};

export const getResponses = async (senderId: number, receiverId: number): Promise<any> => {
  return await Responses.findAll({
    where: {
      [Op.or]: [{
        senderId,
        receiverId,
      }],
    },
  });
};