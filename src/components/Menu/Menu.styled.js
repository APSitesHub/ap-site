import styled, { keyframes } from 'styled-components';
import { ReactComponent as MenuDownArrow } from '../../img/svg/invertedDownArrow.svg';
import { ReactComponent as LogoIcon } from '../../img/svg/invertedLogo.svg';
import { ReactComponent as LogoNewIcon } from '../../img/svg/logoNew.svg';
import { ReactComponent as LogoSchoolIcon } from '../../img/svg/logoSchool.svg';
import { ReactComponent as LogoUniversityIcon } from '../../img/svg/logoUniversity.svg';
import { ReactComponent as MenuIcon } from '../../img/svg/burger-menu.svg';
import { ReactComponent as CloseMenuIcon } from '../../img/svg/burger-menu-close.svg';
import { RxHamburgerMenu } from 'react-icons/rx';
import sketchOutline from 'img/svg/sketchOutline.svg';
import sketchOutlineNarrow from 'img/svg/sketchOutlineNarrow.svg';
import sketchOutlineSmallNarrow from 'img/svg/sketchOutlineSmallNarrow.svg';
import { Link } from 'react-router-dom';
import { LogoAnchor } from 'components/Navigation/Navigation.styled';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 0 16px;
  height: 60px;
  background-color: var(--secondary-color);
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0.5px 5px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 0.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform var(--animation-global);

  @media screen and (min-width: 400px) {
    padding: 0 30px;
  }

  @media screen and (min-width: 768px) {
    padding: 0 42px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 60px;
  }

  @media screen and (min-width: 1920px) {
    padding: 0 120px;
  }

  &.hidden {
    transform: translateY(-90px);
  }

  &.shown {
    transform: translateY(0px);
  }
`;

export const HeaderNew = styled.header`
  position: fixed;

  font-family: var(--new-font-family);

  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 0 16px;
  height: 44px;
  background-color: var(--secondary-color);
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 3px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform var(--animation-global);

  @media screen and (min-width: 375px) {
    padding: 0 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 0 40px;
    height: 60px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 60px;
  }

  @media screen and (min-width: 1920px) {
    padding: 0 120px;
  }

  &.hidden {
    transform: translateY(-90px);
  }

  &.shown {
    transform: translateY(0px);
  }
`;

export const NavContainer = styled.div`
  position: sticky;
  z-index: 9;
  top: 0;
`;

export const HeaderWrapper = styled.div`
  @media screen and (max-width: 1279px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const MobileMenuBtn = styled.button`
  border: none;
  border-radius: 9px;
  padding: 8px;
  background-color: var(--main-transparent-color);
  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  @media screen and (min-width: 768px) {
    background-color: transparent;
    padding: 8px 12px;
  }

  &:hover,
  &:focus {
    background-color: var(--main-transparent-color);
  }
`;

export const NewMobileMenuBtn = styled.button`
  border: none;
  background-color: transparent;
  outline: transparent;
  align-self: center;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const MobileMenuIcon = styled(MenuDownArrow)`
  color: currentColor;
  flex-shrink: 0;
  stroke-width: 1;

  @media screen and (min-width: 768px) {
    stroke-width: 2;
  }
`;
export const MenuBurgerIcon = styled(MenuIcon)`
  color: currentColor;
  flex-shrink: 0;
`;

export const MenuBurgerCloseIcon = styled(CloseMenuIcon)`
  color: currentColor;
  flex-shrink: 0;
`;

export const BurgerMenuIcon = styled(RxHamburgerMenu)`
  color: var(--main-color);
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`;

export const LogoRoute = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

export const Logo = styled(LogoIcon)`
  z-index: 10;
  width: 43px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  transition: transform var(--animation-global), filter var(--animation-global);

  ${LogoRoute}:hover & {
    transform: scale(1.2);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }
`;

export const LogoNew = styled(LogoNewIcon)`
  z-index: 10;
  width: 121px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  overflow: visible;

  @media screen and (min-width: 768px) {
    width: 150px;
  }

  @media screen and (min-width: 1280px) {
    width: 183px;
  }

  & > path#star {
    transform-origin: center bottom -2px;
    transition: transform var(--animation-global);
  }

  ${LogoRoute}:hover &>path#star {
    transform: translate(4px, 2px) scale(1.2);
  }
`;

export const LogoSchool = styled(LogoSchoolIcon)`
  z-index: 10;
  width: 99px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  overflow: visible;

  @media screen and (min-width: 768px) {
    width: 122px;
  }

  @media screen and (min-width: 1280px) {
    width: 149px;
  }

  & > path#star {
    transform-origin: center bottom -2px;
    transition: transform var(--animation-global);
  }

  ${LogoAnchor}:hover &>path#star {
    transform: translate(4px, 2px) scale(1.2);
  }
`;

export const LogoUniversity = styled(LogoUniversityIcon)`
  z-index: 10;
  width: 119px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  overflow: visible;

  @media screen and (min-width: 768px) {
    width: 148px;
  }

  @media screen and (min-width: 1280px) {
    width: 180px;
  }

  & > path#star {
    transform-origin: center bottom -2px;
    transition: transform var(--animation-global);
  }

  ${LogoAnchor}:hover &>path#star {
    transform: translate(4px, 2px) scale(1.2);
  }
`;

export const wobblyOutline = keyframes`
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-2deg);
  }
  20% {
    transform: rotateZ(2deg);
  }
  25% {
    transform: rotateZ(-4deg);
  }
  30% {
    transform: rotateZ(4deg);
  }
  35% {
    transform: rotateZ(1deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
`;

export const LeadBtn = styled.button`
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;

  padding: 10px 10px;
  font-size: 20px;
  font-weight: 600;
  width: 180px;
  height: 50px;
  border: none;
  flex-shrink: 0;
  /* border: 2px solid #fff; */
  border-radius: 47px;
  background-color: var(--secondary-color);
  color: var(--main-color);
  text-align: center;
  position: relative;
  outline: transparent;
  transition: box-shadow var(--animation-global),
    transform var(--animation-global);

  @media screen and (min-width: 400px) {
    width: 250px;
    height: 50px;
  }

  @media screen and (min-width: 768px) {
    width: 287px;
    height: 60px;
  }

  &:hover,
  &:focus {
    box-shadow: inset 0px 0px 10px 2px #fff;
    transform: scale(0.95);
    /* background-color: #fff;
    border-color: var(--secondary-color);
    color: var(--main-color); */
  }

  &::before {
    position: absolute;
    width: 180px;
    top: -2px;
    left: -2px;
    content: url(${sketchOutlineSmallNarrow});
    animation: 2s linear infinite ${wobblyOutline};

    transition: opacity var(--animation-global);

    @media screen and (min-width: 400px) {
      width: 250px;
      content: url(${sketchOutlineNarrow});
    }

    @media screen and (min-width: 768px) {
      content: url(${sketchOutline});
      width: 289px;
    }
  }
`;

export const PlatformLink = styled.a`
  border-color: var(--secondary-color);
  border-radius: 9px;
  padding: 10px 14px;
  background-color: transparent;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &:hover,
  &:focus {
    background-color: var(--main-transparent-color);
  }
`;

export const PlatformLinkNew = styled.a`
  border-radius: 50px;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%);
  padding: 14px 60px;
  text-decoration: none;
  height: 58px;

  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: baseline;

  position: relative;

  &:hover,
  &:focus {
    background-color: var(--main-transparent-color);
  }

  @media screen and (min-width: 1280px) {
    padding: 0;
    background: unset;

    &:hover,
    &:focus {
      background: unset;
    }

    &:hover span,
    &:focus span {
      color: var(--accent-color);
    }

    &:hover svg,
    &:focus svg {
      color: var(--accent-color);
    }
  }
`;

export const HeaderText = styled.span`
  font-size: 20px;
  line-height: 1.45;

  margin-right: 8px;
  color: var(--main-color);

  @media screen and (min-width: 768px) {
    font-weight: 600;
  }
`;

export const HeaderTextNew = styled.span`
  font-size: 18px;
  line-height: 20px;
  font-weight: 700;
  text-transform: uppercase;

  margin-right: 10px;
  color: #fff;

  transition: color var(--animation-global);

  @media screen and (min-width: 768px) {
    font-weight: 600;
  }

  @media screen and (min-width: 1280px) {
    font-weight: 500;
    text-transform: unset;
    color: #000;
  }
`;
