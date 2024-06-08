import styled from 'styled-components';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { ReactComponent as CoursesArrowLeft } from '../../img/svg/coursesArrowLeft.svg';
import { ReactComponent as CoursesArrowRight } from '../../img/svg/coursesArrowRight.svg';
import { ReactComponent as CoursesArrowDown } from '../../img/svg/coursesArrowDown.svg';
import { ReactComponent as MyAPIcon } from '../../img/svg/my-ap.svg';

export const StyledNavigation = styled.nav`
  position: fixed;
  width: 100%;
  max-width: 360px;
  top: 60px;
  right: 0%;
  font-size: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  z-index: 6;
  background-color: var(--secondary-color);
  transition: opacity var(--animation-global), transform var(--animation-global);

  @media screen and (min-width: 1280px) {
    position: relative;
    top: 0;
    right: 0;
    display: flex;
    max-width: fit-content;
    height: 100%;

    box-shadow: none;
  }
`;

export const StyledNavigationNew = styled.nav`
  position: fixed;
  width: 100%;
  height: calc(100lvh - 44px);
  overflow-y: scroll;
  scrollbar-gutter: stable;
  max-width: 100vw;
  top: 44px;
  right: 0%;
  font-size: 18px;
  font-family: var(--new-font-family);
  z-index: 6;
  background-color: var(--secondary-color);
  transition: opacity var(--animation-global), transform var(--animation-global);

  @media screen and (min-width: 768px) {
    width: 256px;
    height: auto;
    top: 59px;
    overflow-y: visible;

    border-radius: 0px 0px 0px 24px;
    box-shadow: -2px 0px 3px 0px rgba(0, 0, 0, 0.18);
  }

  @media screen and (min-width: 1280px) {
    position: relative;
    height: 100%;
    top: 0;
    right: 0;
    width: auto;
    display: flex;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const MenuButtonsWrapper = styled.div`
  padding: 28px 0 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: 768px) {
    padding: 32px 0 50px 0;
  }

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export const NavigationListNew = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 24px;
  padding: 52px 20px;

  color: var(--secondary-color);
  justify-content: center;

  @media screen and (min-width: 768px) {
    border: none;
    padding: 50px 20px;
  }

  @media screen and (min-width: 1280px) {
    height: 100%;
    padding: 0;
    margin: 0 auto;
    z-index: 6;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    overflow: visible;
  }
`;

export const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  color: var(--secondary-color);
  justify-content: center;

  @media screen and (min-width: 768px) {
    border: none;
  }

  @media screen and (min-width: 1280px) {
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;

export const NavigationItem = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    border-bottom: 0.5px solid #0f645b33;

    @media screen and (min-width: 768px) {
      border: none;
    }
  }

  @media screen and (min-width: 1280px) {
    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

export const NavigationItemNew = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    padding-bottom: 24px;
    border-bottom: 0.5px solid #0f645b33;
  }

  @media screen and (min-width: 768px) {
    &:not(:last-child) {
      border-bottom: none;
    }
  }

  @media screen and (min-width: 1280px) {
    overflow: visible;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 6;

    &:not(:last-child) {
      padding: 0;
    }
  }
`;

export const NavigationLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--main-color);

  transition: color var(--animation-global),
    background-color var(--animation-global),
    text-shadow var(--animation-global);
  padding: 10px 16px;

  @media screen and (min-width: 1280px) {
    padding: 0px;
    display: inline;
  }

  &:hover,
  &:focus,
  &.active {
    @media screen and (min-width: 1280px) {
      cursor: pointer;
      color: var(--main-color);
      text-shadow: 0.5px 0px 0.5px rgba(0, 0, 0, 0.75);
    }
  }
`;

export const NavigationAnchor = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000;

  font-size: 30px;
  font-weight: 500;

  transition: color var(--animation-global),
    background-color var(--animation-global),
    text-shadow var(--animation-global);
  padding: 10px 16px;

  @media screen and (min-width: 1280px) {
    padding: 0px;
    display: block;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--main-color);

    position: absolute;
    left: 0;
    bottom: 0;
    transform-origin: left;
    transform: scaleX(0);

    transition: transform var(--animation-global);
  }

  &:hover,
  &:focus,
  &.active {
    @media screen and (min-width: 1280px) {
      cursor: pointer;
    }
  }

  &:hover::after,
  &:focus::after {
    transform: scaleX(1);
  }
`;

export const NavigationAnchorNew = styled(Link)`
  display: block;
  position: relative;
  text-decoration: none;
  color: #000;

  font-size: 30px;
  font-weight: 500;

  transition: color var(--animation-global),
    background-color var(--animation-global),
    text-shadow var(--animation-global);

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1280px) {
    padding: 5px 0;
    display: block;
  }

  &::after {
    @media screen and (min-width: 1280px) {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--main-color);

      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: left;
      transform: scaleX(0);

      transition: transform var(--animation-global);
    }
  }

  &:hover,
  &:focus,
  &.active {
    @media screen and (min-width: 1280px) {
      cursor: pointer;
    }
  }

  &:hover::after,
  &:focus::after {
    transform: scaleX(1);
  }
`;

export const NavigationAnchorSchool = styled(NavigationAnchorNew)`
  &::after {
    background-color: var(--school-color);
  }
`;

export const NavigationAnchorUniversity = styled(NavigationAnchorNew)`
  &::after {
    background-color: var(--university-color);
  }
`;

export const NavigationLinkNew = styled(NavLink)`
  display: block;
  position: relative;
  text-decoration: none;
  color: #000;

  font-size: 30px;
  font-weight: 500;

  transition: color var(--animation-global),
    background-color var(--animation-global),
    text-shadow var(--animation-global), font-weight var(--animation-global);

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1280px) {
    padding: 5px 0;
  }

  &::after {
    @media screen and (min-width: 1280px) {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--main-color);

      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: left;
      transform: scaleX(0);

      transition: transform var(--animation-global);
    }
  }

  &:hover,
  &:focus {
    @media screen and (min-width: 1280px) {
      cursor: pointer;
      stroke-width: 0.5px;
    }
  }

  &:hover::after,
  &:focus::after {
    transform: scaleX(1);
  }

  &.active {
    font-weight: 700;
  }

  &:visited {
    color: #000;
  }
`;

export const NavigationLinkSchool = styled(NavigationLinkNew)`
  &::after {
    @media screen and (min-width: 1280px) {
      background-color: var(--school-color);
    }
  }
`;

export const NavigationLinkUniversity = styled(NavigationLinkNew)`
  &::after {
    @media screen and (min-width: 1280px) {
      background-color: var(--university-color);
    }
  }
`;

export const MenuCoursesWrapperNew = styled.div`
  position: relative;

  @media screen and (min-width: 1280px) {
    border-bottom: none;
    height: 100%;
  }
`;

export const MenuCoursesWrapper = styled.div`
  position: relative;
  border-bottom: 0.5px solid var(--main-color);

  transition: all var(--animation-global);

  @media screen and (min-width: 1280px) {
    border-bottom: none;
    margin-right: 12px;
  }
`;

export const MenuCoursesArrowLeft = styled(CoursesArrowLeft)`
  color: currentColor;

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;

export const MenuCoursesArrowRight = styled(CoursesArrowRight)`
  color: currentColor;

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;

export const MenuCoursesArrowDown = styled(CoursesArrowDown)`
  color: currentColor;
  flex-shrink: 0;
  width: 30px;
  height: 30px;

  @media screen and (min-width: 768px) {
    width: 20px;
    height: 20px;
  }

  &:hover,
  &:focus {
    color: var(--accent-color);
  }
`;

export const NavigationMenu = styled.button`
  position: relative;

  height: 100%;

  border: none;
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  gap: 8px;

  color: var(--main-color);
  font-weight: 600;
  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  transition: color var(--animation-global), fill var(--animation-global);

  &:hover,
  &:focus {
    color: var(--accent-color);
    fill: var(--accent-color);
    stroke: var(--accent-color);
  }

  @media screen and (max-width: 1279px) {
    padding: 10px 16px;
  }
`;

export const NavigationMenuNew = styled.button`
  position: relative;
  font-size: 30px;
  font-weight: 500;

  height: 100%;

  border: none;
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  gap: 8px;

  color: #000;
  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  transition: color var(--animation-global), fill var(--animation-global);

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }

  @media screen and (max-width: 1279px) {
    padding: 0;
  }

  @media screen and (min-width: 1280px) {
    padding: 5px 0;
  }

  &:hover,
  &:focus,
  &.active {
    @media screen and (min-width: 1280px) {
      cursor: pointer;
    }
  }
`;

export const NavigationMenuList = styled.ul`
  text-align: start;
  position: absolute;
  width: 120px;

  top: 0;
  left: -120px;

  display: flex;
  flex-direction: column;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  transition: opacity var(--animation-global), transform var(--animation-global);

  background-color: var(--secondary-color);
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  @media screen and (min-width: 500px) {
    border-top-left-radius: 8px;
    border-top-right-radius: 0;
  }

  @media screen and (min-width: 1280px) {
    top: 102%;
    left: 0;

    width: max-content;

    clip-path: inset(2px -10px -10px -10px);
  }

  &.course-list-open {
    opacity: 1;
    transform: translateX(280px);

    @media screen and (min-width: 500px) {
      transform: translateX(0%);
    }

    @media screen and (min-width: 1280px) {
      transform: translateY(0%);
    }
  }

  &.course-list-closed {
    pointer-events: none;
    opacity: 0;
    transform: translateX(100%);

    @media screen and (min-width: 1280px) {
      transform: translateY(-100%);
    }
  }
`;

export const NavigationMenuListNew = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;

  transition: all 450ms cubic-bezier(0.17, 0.22, 0.2, 1);

  background-color: #fff;

  @media screen and (min-width: 1280px) {
    width: max-content;
    position: absolute;
    top: 58px;
    left: -25px;

    transform: translateY(-150%);

    padding: 16px 21px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 3px 0px;
  }

  &.course-list-open {
    opacity: 1;
    transition: all 450ms cubic-bezier(0.17, 0.22, 0.2, 1);

    @media screen and (min-width: 500px) {
      transform: translateY(0%);
    }

    @media screen and (min-width: 1280px) {
      width: max-content;
      z-index: 3;
      gap: 0;
      clip-path: inset(2px -10px -10px -10px);
    }
  }

  &.course-list-closed {
    @media screen and (max-width: 1279px) {
      pointer-events: none;
      opacity: 0;

      position: absolute;
      white-space: nowrap;
      width: 1px;
      height: 1px;
      overflow: hidden;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      margin: -1px;
    }

    @media screen and (min-width: 1280px) {
      transform: translateY(-150%);
    }
  }
`;

export const NavigationMenuItem = styled.li`
  padding: 10px 8px;

  &:not(:last-child) {
    border-bottom: 0.5px solid var(--main-color);
  }
`;

export const NavigationMenuItemNew = styled.li`
  @media screen and (min-width: 1280px) {
    padding: 12px 0;

    &:not(:last-child) {
      border-bottom: 0.5px solid #0f645b33;
    }
  }
`;

export const NavigationNavLink = styled(NavLink)`
  display: block;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--main-color);

  transition: color var(--animation-global);
  /* padding: 10px 16px; */

  @media screen and (min-width: 1280px) {
    padding: 0px;
    display: inline;
  }

  &:hover,
  &:focus,
  &.active {
    color: var(--accent-color);

    @media screen and (min-width: 1280px) {
      cursor: pointer;
    }
  }
`;

export const NavigationNavLinkNew = styled(NavLink)`
  display: block;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  color: #000;

  transition: color var(--animation-global);
  /* padding: 10px 16px; */

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0px;
    display: inline;
  }

  &:hover,
  &:focus,
  &.active {
    color: var(--accent-color);

    @media screen and (min-width: 1280px) {
      cursor: pointer;
    }
  }
`;

export const MyAPLogin = styled(MyAPIcon)`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  color: #fff;

  transition: color var(--animation-global);

  @media screen and (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (min-width: 1280px) {
    width: 22px;
    height: 22px;
    color: #000;
  }
`;

export const LogoAnchor = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;
