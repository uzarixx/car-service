import React, { FC } from 'react';
import styles from './ImageOpen.module.scss';

interface props {
  imageLink: string;
  setLink: (e: string) => void;
}

const ImageOpen: FC<props> = ({ imageLink, setLink }) => {
  const onCloseImage = () => {
    setLink('');
  };
  return (
    <div
      className={`${styles.imageOpen} ${imageLink.length > 1 && styles.active}`}
      onClick={onCloseImage}
    >
      <img src={imageLink} alt={'image'} />
    </div>
  );
};

export default ImageOpen;
