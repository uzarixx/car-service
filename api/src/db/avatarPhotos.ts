import {AvatarsPhoto} from '../models/avatarsPhoto';
import { Op } from 'sequelize';
import { User } from '../models/user';


export const uploadAvatarPhoto = async (id: number, photoLink: string, public_id: string): Promise<any> => {
  const user = await User.update({photo: photoLink}, {where: {id}})
  const avatar = await AvatarsPhoto.create({ userId: id, secure_url: photoLink, public_id });
  return {avatar, user};
}



export const findAvatar = async (userId: number, secure_url: string): Promise<any> => {
  const avatar = await AvatarsPhoto.findOne({ where: { [Op.or]: [{ userId , secure_url}]}})
  return avatar;
}

export const deleteAvatars = async (userId: number, secure_url: string): Promise<any> => {
  await AvatarsPhoto.destroy({ where: { secure_url } })
  await User.update({ photo: ''}, {where: {id: userId}})
}