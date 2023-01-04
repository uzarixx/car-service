import { Photo } from '../models/photo';

export const createPhoto = async (array: any): Promise<any> => {
  const photos = await Photo.bulkCreate(array);
  return photos;
};

export const getPhoto = async (userId: number): Promise<any> => {
  const photos = await Photo.findAll({
    where: { userId },
    order: [['id', 'DESC']],
  });
  return photos;
};


export const getPhotoById = async (id: number): Promise<any> => {
  const photo = await Photo.findOne({ where: { id } });
  return photo;
};

export const deletePhoto = async (id: number): Promise<any> => {
  const photo = await Photo.destroy({ where: { id } });
  return photo;
};