import React, { FC, useState } from 'react';
import UserBigIcon from '../icons/UserBigIcon';
import styles from './AvatarUpload.module.scss';
import userService from '../../../service/userService';
import DeleteIcon from '../icons/DeleteIcon';
import { getAuthUser } from '../../../store/userData';

interface props {
  photo: string;
}

const AvatarUpload: FC<props> = ({ photo }) => {
  const [image, setImage] = useState('');
  const fileHandler = async (e: any) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files as FileList;
    const formData = new FormData();
    formData.append('image', file[0]);
    const { data } = await userService.userUploadAvatar(formData);
    setImage(data);
    await getAuthUser();
  };
  const deletePhoto = async () => {
    const { data } = await userService.deleteAvatar(photo || image);
    setImage(data);
  };
  return (
    <div className={styles.uploadAvatar}>
      <input type='file' id='user-image' accept='image/x-png,image/jpeg'
             onChange={fileHandler} />
      <label htmlFor='user-image'>
        {image || photo ? <><img
            src={image || photo} alt='avatarImg' />
            <button onClick={deletePhoto}><DeleteIcon /></button>
          </> :
          <UserBigIcon />}
      </label>
    </div>
  );
};

export default AvatarUpload;