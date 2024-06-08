import useSize from '@react-hook/size';
import { Navigation } from 'components/Navigation/Navigation';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as LoginIcon } from '../../img/svg/invertedLoginIcon.svg';
import {
  Header,
  HeaderText,
  HeaderWrapper,
  LeadBtn,
  Logo,
  LogoRoute,
  MobileMenuBtn,
  MobileMenuIcon,
  NavContainer,
  PlatformLink,
} from './Menu.styled';

export const Menu = ({ toggleModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerEl = useRef();
  // eslint-disable-next-line
  const [width, _] = useSize(headerEl);
  const [show, setShow] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(isOpen => !isOpen);
  };

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener('scroll', () => {
      currentScrollPosition = window.scrollY;

      if (previousScrollPosition <= currentScrollPosition) {
        setIsMenuOpen(isOpen => (isOpen = false));
        setShow(show => (show = false));
      } else if (previousScrollPosition > currentScrollPosition) {
        setShow(show => (show = true));
      }

      previousScrollPosition = currentScrollPosition;
    });
  }, []);

  return (
    <>
      <Header id="header" ref={headerEl} className={show ? 'shown' : 'hidden'}>
        <HeaderWrapper>
          <LogoRoute to="/">
            <Logo />
          </LogoRoute>
          <MobileMenuBtn onClick={toggleMenu}>
            <HeaderText>МЕНЮ</HeaderText> <MobileMenuIcon />
          </MobileMenuBtn>
        </HeaderWrapper>
        {width >= 768 && (
          <LeadBtn onClick={toggleModal}> ШВИДКА КОНСУЛЬТАЦІЯ </LeadBtn>
        )}
        {width >= 768 && (
          <PlatformLink href="https://online.ap.education/" target="_blank">
            <HeaderText>УВІЙТИ</HeaderText> <LoginIcon />
          </PlatformLink>
        )}
      </Header>
      <NavContainer className={show ? 'shown' : 'hidden'}>
        <Navigation
          toggleMenu={toggleMenu}
          toggleModal={toggleModal}
          className={isMenuOpen ? 'nav-open' : 'nav-closed'}
        />
      </NavContainer>
    </>
  );
};
