import styled from 'styled-components';

import { BackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { arrowAnimation } from 'components/HowItWorks/HowItWorks.styled';
import { ReactComponent as Arrow } from '../../img/svg/menu-arrow.svg';
import {
  MoreBtnBox,
  arrowAnimationTriggeredOnce,
} from 'components/EdCenter/EdCenter.styled';
import { LeadBtn, wobblyOutline } from 'components/Menu/Menu.styled';

import sketchOutlineSmall from 'img/svg/sketchOutlineSmall.svg';

export const TranslationsBackground = styled(BackgroundWrapper)`
  background-position: right -70px top 70px;

  @media screen and (min-width: 768px) {
    background-position: top center;
  }

  @media screen and (min-width: 1280px) {
    background-position: left -75px center;
  }
`;

export const TranslationsSection = styled.section`
  position: relative;
  padding: 30px;

  @media screen and (min-width: 768px) {
    padding: 42px;
    padding-bottom: 84px;
  }

  @media screen and (min-width: 1280px) {
    padding: 55px;
  }
`;

export const TranslationsWrapper = styled.div`
  margin-bottom: 20px;
  max-width: 1280px;

  @media screen and (min-width: 768px) {
    width: 684px;
    display: grid;
    grid-template-columns: auto 448px;
    gap: 30px;
    align-items: center;

    margin: 0 auto;
  }

  @media screen and (min-width: 1280px) {
    width: 1155px;
    grid-template-columns: auto 800px;
    gap: 40px;
  }

  @media screen and (min-width: 1390px) {
    width: 1280px;
  }
`;

export const TranslationsTitle = styled.h2`
  color: var(--main-color);
  font-family: var(--title-font-family);
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 2px;
  -webkit-text-stroke: 1px var(--main-color);
  margin-bottom: 18px;
  

  @media screen and (min-width: 360px) {
    width: 300px;
    font-size: 40px;
  }

  @media screen and (min-width: 768px) {
    text-align: center;
    margin: 0 auto;
    letter-spacing: 3.5px;
    margin-bottom: 52px;
    width: 415px;
    font-size: 55px;
    -webkit-text-stroke: 2px var(--main-color);
  }

  @media screen and (min-width: 1280px) {
    width: 630px;
    font-size: 70px;
    margin-bottom: 80px;
  }
`;

export const TranslationsSubTitle = styled.span`
  font-family: var(--secondary-font-family);
  font-size: 42px;
  -webkit-text-stroke: 0;
  letter-spacing: 2px;

  color: var(--accent-color);

  @media screen and (min-width: 768px) {
    font-size: 70px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 100px;
  }
`;

export const TranslationsNavigation = styled.ul`
  color: var(--main-color);
  font-size: 26px;
  font-weight: 600;
  max-width: 350px;
  letter-spacing: 1.8px;
  display: flex;
  flex-direction: column;
  gap: 9px;

  @media screen and (min-width: 768px) {
    font-size: 32px;
    gap: 10px;
    margin: 0;
  }

  @media screen and (min-width: 1280px) {
    font-size: 36px;
  }
`;

export const NavigationItem = styled.li`
  position: relative;
  z-index: 1;
`;

export const TranslationsToggler = styled.a`
  color: var(--main-color);
  z-index: 1;
  position: relative;
  transition: color var(--animation-global);

  @media screen and (min-width: 1280px) {
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    user-select: none;
  }

  &.selected,
  &:hover,
  &:focus {
    color: var(--accent-color);
  }

  &.selected svg {
    display: block;
  }

  &:hover > .on-hover,
  &:focus > .on-hover {
    opacity: 1;
    animation-name: ${arrowAnimation};
    animation-duration: 400ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }
`;

export const TranslationsArrow = styled(Arrow)`
  opacity: 0;
  position: absolute;
  bottom: -4px;
  left: -4px;
  width: 250px;
  z-index: -1;
  stroke-dasharray: 435;

  @media screen and (min-width: 768px) {
    left: -6px;
    width: 230px;
  }

  @media screen and (min-width: 1280px) {
    left: -8px;
    width: 350px;
  }
`;

export const TranslationsArrowInView = styled(TranslationsArrow)`
  animation-name: ${arrowAnimationTriggeredOnce};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: backwards;
`;

export const VideoLimiter = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;

  @media screen and (min-width: 768px) {
    margin: 0;
    max-width: 448px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 800px;
  }
`;

export const VideoBox = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: -10px -10px 30px 0px #00000040;
`;

export const OrderBtn = styled(LeadBtn)`
  width: 240px;
  margin: 0 auto;

  &::before {
    width: 240px;
    content: url(${sketchOutlineSmall});
    animation: 2s linear infinite ${wobblyOutline};
  }
`;

export const OrderBtnBox = styled(MoreBtnBox)`
  margin-bottom: 21px;

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;
