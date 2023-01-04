import React, { FC, useState } from 'react';
import styles from './ImageGallery.module.scss';
import ImageOpen from '../imageOpen/ImageOpen';
import VisibilityEye from '../icons/VisibilityEye';
import DeleteIcon from '../icons/DeleteIcon';
import userService from '../../../service/userService';
import DeletePortfolioImage
  from '../alerts/deleteAlert/DeleteAlert';

interface propsType {
  secure_url: string;
  userId: string;
  id: number;
  public_id: string;
}

interface props {
  images: propsType[];
  methods: any;
}


const ImageGallery: FC<props> = ({ images }) => {
  const [imageLink, setImageLink] = useState('');
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [imageId, setImageId] = useState(0);
  const onClickImage = (url: string) => {
    setImageLink(url);
  };
  const onClickDelete = async (id: number) => {
    setImageId(id);
    setIsOpenDeleteAlert(true);
  };
  return (
    <div className={styles.galleryMain}>
      <ImageOpen imageLink={imageLink} setLink={setImageLink} />
      <div className={styles.galleryWrapper}>
        <DeletePortfolioImage
          title={'Видалити це фото?'}
          active={isOpenDeleteAlert}
          id={imageId}
          service={userService.deleteImage}
          setActive={setIsOpenDeleteAlert} />
        {images.map((el, i) =>
          <div className={styles.imageBlock} key={i}>
            <div className={styles.delete} onClick={() => onClickDelete(el.id)}>
              <DeleteIcon /></div>
            <img src={el.secure_url} alt={el.public_id} />
            <div className={styles.open}
                 onClick={() => onClickImage(el.secure_url)}><VisibilityEye
              color={'#ffff'} /></div>
          </div>,
        )}
      </div>
    </div>
  );
};

export default ImageGallery;