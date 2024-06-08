import Marquee from 'react-fast-marquee';
import styled from 'styled-components';
import { ReactComponent as VolumeMute } from '../../../img/svg/volume.svg';

export const StyledMarquee = styled(Marquee)`
  margin: 0 auto;
  max-width: 100vw;
`;

export const MarqueeChild = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 16px;
  transition: transform var(--animation-global);
  width: 210px;
  height: 210px;

  @media screen and (min-width: 768px) {
    width: 360px;
    height: 360px;
    margin-right: 40px;
  }

  &:hover > *,
  &:focus > * {
    background-color: transparent;
  }

  &:hover span,
  &:focus span {
    background-color: #00000080;
    transform: scale(1.5) translate(-33%, -33%);
  }

  &:hover svg,
  &:focus svg {
    opacity: 1;
  }
`;

export const MarqueeOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  border-radius: 20px;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  background-color: #00000060;
  transition: background-color var(--animation-global);
`;

export const MarqueeVideo = styled.video`
  object-fit: cover;
  width: 210px;
  height: 210px;

  @media screen and (min-width: 768px) {
    width: 360px;
    height: 360px;
  }
`;

export const MarqueeSoundBtn = styled(VolumeMute)`
  width: 24px;
  height: 24px;
  z-index: 5;

  position: absolute;
  top: 10px;
  right: 10px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));

  transition: opacity var(--animation-global);
`;
