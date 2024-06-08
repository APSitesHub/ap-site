import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { ReactComponent as MarqueeTextArrow } from '../../../img/svg/heroMarqueeTextArrow.svg';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

export const StyledMarquee = styled(Marquee)`
  margin: 0 auto;
  max-width: 100vw;
`;

export const MarqueeChild = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 30px;
  transition: transform var(--animation-global);
  width: 180px;
  height: 320px;

  @media screen and (min-width: 768px) {
    width: 270px;
    height: 480px;
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
`;

export const MarqueeChildNew = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 16px;
  transition: transform var(--animation-global);
  width: 210px;
  height: 320px;

  @media screen and (min-width: 768px) {
    margin-right: 40px;
    width: 360px;
    height: 400px;
  }

  &:hover > *,
  &:focus > * {
    background-color: transparent;
  }

  &:hover span,
  &:focus span {
    background-color: #00000080;
  }
`;

export const MarqueeOverlay = styled.div`
  position: absolute;
  user-select: none;
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
  width: 180px;
  height: 320px;

  @media screen and (min-width: 768px) {
    width: 270px;
    height: 480px;
  }
`;

export const MarqueeVideoNew = styled.video`
  object-fit: cover;
  width: 210px;
  height: 320px;

  @media screen and (min-width: 768px) {
    width: 360px;
    height: 400px;
  }
`;

export const MarqueeText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 8px;
  border-radius: 20px;

  font-size: 28px;
  text-align: center;
  color: var(--secondary-color);
  background-color: #00000090;

  transition: background-color var(--animation-global),
    transform var(--animation-global);
`;

export const MarqueeTextNew = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  height: 68px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-family: var(--new-font-family);
  font-size: 12px;
  font-weight: 500;
  color: var(--secondary-color);
  background-color: #00000090;

  transition: background-color var(--animation-global),
    transform var(--animation-global);

    @media screen and (min-width: 768px) {
      font-size: 16px;
  }
`;

export const HeroMarqueeTextIcon = styled(MarqueeTextArrow)`
  width: 24px;
  height: 24px;
`;

export const HeroMarqueeSoundBtn = styled(MarqueeSoundBtn)`
  top: 10px;
  left: auto;
  right: 10px;
  transform: none;

  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
`;

export const BackBtn = styled.button``;
export const ForwardBtn = styled.button``;
