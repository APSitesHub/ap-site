import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { FormCloseBtn } from 'components/LeadForm/LeadForm.styled';
import styled from 'styled-components';
import {
  MarqueeBackBtn,
  MarqueeForwardBtn,
} from 'components/Hero/HeroSwiper/HeroSwiperModal/HeroSwiperModal.styled';

export const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  border-radius: 20px;
  text-align: center;

  padding-bottom: 20px;
  width: calc(100vw - 5em);
  max-width: 320px;

  @media screen and (min-width: 768px) {
    padding-bottom: 30px;
  }

  @media screen and (min-width: 1280px) {
    padding-bottom: 40px;
  }

  /* @media screen and (max-width: 1280px) and (orientation: landscape) {
    transform: rotate(-90deg) translate(-50%, -50%);
    https://stackoverflow.com/questions/38359782/how-to-lock-viewport-to-portrait-orientation-in-html5-css3
  } */
`;

export const ReviewVideoLimiter = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  border-radius: 20px;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
`;

export const ReviewVideoBox = styled.div`
  position: relative;
  padding-bottom: 177%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);

  & video {
    object-fit: fill;
  }
`;

export const MarqueeBackdrop = styled(Backdrop)`
  background-color: #000000ab;
`;

export const MarqueeCloseBtn = styled(FormCloseBtn)`
  position: absolute;
  z-index: 5;
  width: 30px;
  height: 30px;
`;

export const ReviewPrevBtn = styled(MarqueeBackBtn)`
  z-index: 5;

  top: 50%;
  bottom: auto;
  left: -2.5em;

  @media screen and (min-width: 768px) {
    left: -4em;
  }
`;

export const ReviewNextBtn = styled(MarqueeForwardBtn)`
  z-index: 5;

  top: 50%;
  bottom: auto;
  right: -2.5em;

  @media screen and (min-width: 768px) {
    right: -4em;
  }
`;
