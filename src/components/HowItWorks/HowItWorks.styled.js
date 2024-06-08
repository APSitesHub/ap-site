import { IoVolumeMute } from 'react-icons/io5';
import { Link } from 'react-scroll';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as MenuArrow } from '../../img/svg/menu-arrow.svg';
import { ReactComponent as HeroStarIcon } from '../../img/svg/heroStar.svg';

export const HowItWorksSection = styled.section`
  position: relative;
  padding: 30px;

  @media screen and (min-width: 768px) {
    padding: 42px;
  }

  @media screen and (min-width: 1280px) {
    padding: 55px;
  }
`;

export const HowItWorksSectionNew = styled.section`
  position: relative;
  padding: 50px 20px 0 20px;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    padding: 100px 40px 0 40px;
  }

  @media screen and (min-width: 1280px) {
    padding: 60px;
    padding-top: 150px;
    padding-bottom: 0;
    display: flex;
  }
`;

export const SectionWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 20px;
  max-width: 1280px;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
  }

  @media screen and (min-width: 1280px) {
    padding-right: 120px;
    margin-bottom: 80px;
  }
`;

export const SectionWrapperNew = styled.div`
  position: relative;
  margin: 0 auto;
  margin-bottom: 32px;
  max-width: 1280px;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: column;
    flex-grow: 0;
    gap: 40px;
    margin: 0;
    width: 351px;
  }
`;

export const TitleBox = styled.div`
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    margin: 0;
  }

  @media screen and (min-width: 1280px) {
    min-width: 340px;
  }
`;

export const SectionTitle = styled.h2`
  width: 200px;
  color: var(--main-color);
  font-family: var(--title-font-family);
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2px;
  -webkit-text-stroke: 1px var(--main-color);
  margin-bottom: 18px;

  @media screen and (min-width: 768px) {
    margin: 0;
    letter-spacing: 3.5px;
    width: 400px;
    font-size: 55px;
    -webkit-text-stroke: 2px var(--main-color);

    text-align: center;
  }

  @media screen and (min-width: 1280px) {
    font-size: 70px;
  }
`;

export const SectionTitleNew = styled.h2`
  font-family: var(--new-font-family);
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 50px;
    margin-bottom: 16px;
  }
`;

export const SectionDescription = styled.p`
  font-family: var(--new-font-family);
  font-size: 16px;
  line-height: 1.2;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 1.3;
    max-width: 382px;
  }
`;

export const SectionSubTitle = styled.span`
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

export const PageNavigation = styled.ul`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 1.8px;
  display: flex;
  flex-direction: column;
  gap: 9px;

  @media screen and (min-width: 768px) {
    font-size: 32px;
    gap: 10px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 36px;
  }
`;

export const WhoAreWeList = styled.ul`
  font-size: 16px;
  font-weight: 500;
  font-family: var(--new-font-family);

  line-height: 1;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  gap: 16px;

  position: relative;

  @media screen and (min-width: 768px) {
    width: 200px;
    font-size: 14px;
    gap: 0;
  }

  @media screen and (min-width: 1280px) {
    width: auto;
    font-size: 20px;
  }

  &::before {
    content: '';
    height: 100%;
    width: 3px;
    background-color: #eeeef0;
    position: absolute;
    top: -1px;
    left: 0;
    border-radius: 2px;
  }
`;

export const arrowAnimation = keyframes`
  0%{
    stroke-dashoffset: -435;
  }
  100% {
    /* closing the offset makes the line appear to be drawn-in */
    stroke-dashoffset: 0;
  }
`;

export const PageNavigationItem = styled.li`
  z-index: 1;
`;

export const WhoAreWeItem = styled.li`
  z-index: 1;
  padding-left: 16px;
  vertical-align: baseline;

  @media screen and (min-width: 768px) {
    width: max-content;
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 35px;
  }

  @media screen and (min-width: 1280px) {
    width: auto;
    font-size: 20px;
  }
`;

export const PageNavigationLink = styled(Link)`
  position: relative;
  display: block;
  z-index: 1;
  color: var(--main-color);
  transition: color var(--animation-global), opacity var(--animation-global);

  @media screen and (min-width: 1280px) {
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    user-select: none;
  }

  &:hover,
  &:focus {
    color: var(--accent-color);
  }

  &:hover > span,
  &:focus > span {
    opacity: 1;
    transition: opacity var(--animation-global) 250ms;
  }

  &:hover > svg,
  &:focus > svg {
    opacity: 1;
    animation-name: ${arrowAnimation};
    animation-duration: 400ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  }
`;

export const WhoAreWeTrigger = styled.a`
  position: relative;
  display: block;
  z-index: 1;
  transition: color var(--animation-global), opacity var(--animation-global);

  @media screen and (min-width: 1280px) {
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    user-select: none;
  }

  &:active {
    color: var(--accent-color);
  }

  &:hover > span,
  &:focus > span {
    opacity: 1;
    transition: opacity var(--animation-global) 250ms;
  }
`;

export const WhoAreWePointer = styled.div`
  width: 3px;
  height: 25px;
  background-color: var(--main-color);

  border-radius: 2px;

  position: absolute;
  top: 0;
  left: 0;

  @media screen and (min-width: 768px) {
    height: 34px;
  }

  @media screen and (min-width: 1280px) {
    height: 40px;
  }

  transition: transform 250ms var(--animation-global);
`;

export const WhoAreWePointerSchool = styled(WhoAreWePointer)`
  background-color: var(--school-color);
`;

export const WhoAreWePointerUniversity = styled(WhoAreWePointer)`
  background-color: var(--university-color);
`;

export const PageNavigationArrow = styled(MenuArrow)`
  display: block;
  opacity: 0;
  position: absolute;
  bottom: -5px;
  left: -5px;
  width: 250px;
  z-index: -1;
  stroke-dasharray: 435;

  @media screen and (min-width: 768px) {
    bottom: -6px;
    left: -6px;
    width: 300px;
  }

  @media screen and (min-width: 1280px) {
    bottom: -6px;
    left: -6px;
    width: 400px;
  }
`;

export const PageNavigationText = styled.span`
  display: none;

  @media screen and (min-width: 1280px) {
    display: inline;
    color: var(--accent-color);
    opacity: 0;
    position: absolute;
    top: 33%;
    right: -95px;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: normal;
  }
`;

export const VideoLimiter = styled.div`
  margin: 0 auto;
  max-width: 640px;

  @media screen and (min-width: 768px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;

export const PlayerLimiter = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  max-width: 640px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 768px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;

export const PlayerLimiterNew = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  border-radius: 8px;
  background-color: #d9d9d9;
  overflow: hidden;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));

  @media screen and (min-width: 768px) {
    max-width: 960px;
    border-radius: 17px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;

export const VideoBox = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: -10px -10px 30px 0px rgba(0, 0, 0, 0.25);
`;

export const Video = styled.video`
  display: block;
  width: 100%;
`;

export const VideoSoundBtn = styled(IoVolumeMute)`
  fill: var(--accent-color);
  stroke: var(--accent-color);
  width: 20px;
  height: 20px;
  opacity: 0.7;

  cursor: pointer;

  position: absolute;
  z-index: 5;
  top: 10px;
  right: 10px;

  transition: opacity var(--animation-global);

  @media screen and (min-width: 480px) {
    width: 30px;
    height: 30px;
  }

  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;

    top: 20px;
    right: 20px;
  }
`;

export const YouTubeVideoSoundBtn = styled(VideoSoundBtn)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const WhoWeAreStar = styled(HeroStarIcon)`
  position: absolute;
  top: 102px;
  right: -25px;

  width: 49px;
  height: 49px;

  @media screen and (min-width: 768px) {
    top: -74px;
    right: unset;
    left: -26px;

    width: 53px;
    height: 53px;
  }

  @media screen and (min-width: 1280px) {
    top: -110px;
    left: -45px;

    width: 91px;
    height: 91px;
  }
`;
