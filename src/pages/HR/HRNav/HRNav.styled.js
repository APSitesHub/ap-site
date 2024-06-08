import styled from 'styled-components';
import { ReactComponent as ViberIcon } from '../../../img/svg/social-links/viber.svg';
import { ReactComponent as TelegramIcon } from '../../../img/svg/social-links/telegram.svg';
import { NavLink } from 'react-router-dom';

export const ServiceNavTitle = styled.h2`
  text-align: center;
  color: var(--main-color);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1.8px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 32px;
  }
`;

export const ServiceNavDescription = styled.p`
  text-align: center;
  color: red;

  font-size: 24px;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    font-size: 26px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 28px;
  }
`;

export const ServiceNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const ServiceNavItem = styled.li`
  width: max-content;
`;

export const ServiceNavLink = styled(NavLink)`
  display: block;

  cursor: pointer;

  transition: transform var(--animation-global), filter var(--animation-global);

  &:hover,
  &:focus {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }
`;

export const ViberLogo = styled(ViberIcon)`
  width: 40px;
  height: 40px;
  z-index: 5;

  @media screen and (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const TelegramLogo = styled(TelegramIcon)`
  width: 32px;
  height: 32px;
  z-index: 5;

  @media screen and (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const RedirectDescription = styled.p`
  position: absolute;
  text-align: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: var(--main-color);

  font-size: 22px;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }

  @media screen and (min-width: 1280px) {
    font-size: 26px;
  }
`;
