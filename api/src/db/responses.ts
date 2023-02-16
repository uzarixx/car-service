import { Responses } from '../models/responses';


export const getResponses = async (receiverId: number): Promise<any> => {
  return await Responses.findAll({
    where: { receiverId }, attributes: ['createdAt']});
};
