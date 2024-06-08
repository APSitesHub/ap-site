import { MarqueeCloseBtn } from 'components/Reviews/ReviewsMarquee/ReviewModal/ReviewModal.styled';
import styled from 'styled-components';
import { VideoLimiter } from '../AboutUs.styled';

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
  width: calc(100vw - 40px);
  max-width: 640px;

  @media screen and (min-width: 768px) {
    padding-bottom: 30px;
    width: calc(100vw - 60px);
    max-width: 1280px;
  }

  @media screen and (min-width: 1280px) {
    padding-bottom: 40px;
    width: calc(100vw - 80px);
    max-width: 1440px;
  }
`;

export const ModalVideoLimiter = styled(VideoLimiter)`
  overflow: auto;
  position: relative;
  max-height: 90vh;

  @media screen and (min-width: 768px) {
    max-width: 1280px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1920px;
  }
`;

export const VideoCloseBtn = styled(MarqueeCloseBtn)`
  top: -2.5em;
  right: 0;
`;
