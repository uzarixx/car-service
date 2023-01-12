import React, { FC, useState } from 'react';
import styles from './DragAndDrop.module.scss';

interface props {
  setImages?: any;
}

const DragAndDrop: FC<props> = ({ setImages }) => {
  const [drag, setDrag] = useState(false);
  const images = setImages.watch('images');
  const dragStartHandler = (e: any) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setDrag(false);
  };
  const onFileHandler = (e: any) => {
    e.preventDefault();
    const fileArray = [];
    const file = (e.target as HTMLInputElement).files;
    const fileDrop = e.dataTransfer?.files;
    if (file) fileArray.push(...file);
    else fileArray.push(...fileDrop);
    if (!file && !fileDrop) return;
    if (fileArray.map((e) => e.type.match(/image-*/)).includes(null)) {
      setDrag(false);
      return;
    }
    setImages.setValue('images', (setImages.watch('images').concat(...fileArray)));
    setDrag(false);
  };
  const closeImagePreview = (index: number) => {
    setImages.setValue('images', (images.filter((_: unknown, i: number) => i !== index)));
  };
  return (
    <>
      <div
        className={`${styles.dragAndDropWrapper} ${drag ? styles.active : ''}`}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={dragLeaveHandler}
        onDragOver={e => dragStartHandler(e)}
        onDrop={drag ? e => onFileHandler(e) : _ => {
          _;
        }}>
        <input
          type={'file'}
          id='post-image'
          accept='image/x-png,image/jpeg'
          onChange={e => onFileHandler(e)}
          multiple
        />
        <label htmlFor='post-image' className={styles.dragAndDrop}>
          {drag ? 'Відпустіть фото, щоб завантажити їх' : 'Перетягуйте фото щоб їх завантажити'}
        </label>
        <>
          {images.map((el: File | any, i: number) =>
            <div key={i} className={styles.dragAndDropImage}
                 onClick={() => closeImagePreview(i)}>
              <img src={el.secure_url  || URL.createObjectURL(el) } alt='image' />
            </div>,
          )}
        </>
      </div>
    </>
  );
};

export default DragAndDrop;