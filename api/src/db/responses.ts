import { Responses } from '../models/responses';
import { Op } from 'sequelize';

export const getResponses = async (receiverId: number): Promise<any> => {
  return await Responses.findAll({
    where: { receiverId }, attributes: {exclude: ['expires']}});
};