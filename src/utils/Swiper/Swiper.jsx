import { StyledSwiper, SwiperPic, SwiperPicImg } from './Swiper.styled';
import { SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { tstmImgsIndex } from 'img/testimonials/testimonialsImgs';
const {
  tstm1Jpeg,
  tstm1Webp,
  tstm2Jpeg,
  tstm2Webp,
  tstm3Jpeg,
  tstm3Webp,
  tstm4Jpeg,
  tstm4Webp,
  tstm5Jpeg,
  tstm5Webp,
  tstm6Jpeg,
  tstm6Webp,
  tstm7Jpeg,
  tstm7Webp,
  tstm8Jpeg,
  tstm8Webp,
  tstm9Jpeg,
  tstm9Webp,
} = tstmImgsIndex;

export const Swiper = () => {
  return (
    <StyledSwiper
      modules={[Autoplay]}
      loop={true}
      spaceBetween={30}
      slidesPerView={4}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1600: {
          sidesPerView: 5,
          spaceBetween: 10,
        },
        1920: {
          sidesPerView: 6,
          spaceBetween: 10,
        },
      }}
      autoplay={{
        delay: 3000,
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
    >
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm1Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm1Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm2Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm2Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm3Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm3Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm4Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm4Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm5Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm5Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm6Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm6Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm7Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm7Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm8Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm8Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperPic>
          <source srcSet={`${tstm9Webp} 1x`} type="image/webp" />
          <SwiperPicImg src={`${tstm9Jpeg}`} alt="Swiper placeholder" />
        </SwiperPic>
      </SwiperSlide>
    </StyledSwiper>
  );
};
