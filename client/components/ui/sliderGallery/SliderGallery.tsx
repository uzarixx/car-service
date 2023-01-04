import React, { FC, useState } from 'react';
import styles from './SliderGallery.module.scss';
import "swiper/css";
import "swiper/css/navigation";
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from "swiper";
import ImageOpen from '../imageOpen/ImageOpen';
interface props {
  photos: { secure_url: string, public_id: string }[];
}
const SliderGallery: FC<props> = ({ photos }) => {
  const [imageLink, setImageLink] = useState('')
  const onClickImage = (url: string) => {
    setImageLink(url)
  }
  return (
    <div className={styles.sliderGallery}>
      <ImageOpen imageLink={imageLink} setLink={setImageLink}/>
      <Swiper navigation={true} slidesPerView={3} modules={[Navigation]} spaceBetween={10} className={styles.myWrapper}>
        {photos.map((el: { secure_url: string, public_id: string }, i: number) =>
          <SwiperSlide key={i} className={styles.swiperSlide} onClick={() => onClickImage(el.secure_url)}>
            <img src={el.secure_url} alt={el.public_id} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default SliderGallery;
