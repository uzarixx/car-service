import { Request, Response } from 'express';
import {

  deleteFromCloudinary,
  uploadToCloudinary,
} from '../service/cloudinary';
import {
  deleteAvatars,
  findAvatar,
  uploadAvatarPhoto,
} from '../db/avatarPhotos';


const UserAvatarController = {
  uploadAvatar: async (req: Request | any, res: Response) => {
    const { id } = req.user;
    const image = req.file;
    if (!image) return res.status(500).json('Фото немає');
    const uploader = await uploadToCloudinary(image, 'user');
    await uploadAvatarPhoto(id, uploader.secure_url, uploader.public_id);
    res.json(uploader.secure_url);
  },
  deleteAvatar: async (req: Request | any, res: Response) => {
    const { id } = req.user;
    const { secure_url } = req.body;
    const avatar = await findAvatar(id, secure_url);
    if (!avatar) return res.status(500).json('Фото немає');
    await deleteAvatars(id, secure_url)
    await deleteFromCloudinary(avatar.public_id)
    res.json('');
  },

};

export default UserAvatarController;