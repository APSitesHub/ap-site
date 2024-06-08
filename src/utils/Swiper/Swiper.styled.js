import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  margin: 0 auto;
  margin-bottom: 40px;
`;

export const SwiperPic = styled.picture`
  object-fit: fill;
  display: flex;
  width: 300px;
  height: 300px;
`;

export const SwiperPicImg = styled.img`
  object-fit: fill;
  width: 300px;
  height: 300px;
`;