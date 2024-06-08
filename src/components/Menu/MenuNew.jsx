import useSize from '@react-hook/size';
import { MyAPLogin } from 'components/Navigation/Navigation.styled';
import { NavigationNew } from 'components/Navigation/NavigationNew';
import { useEffect, useRef, useState } from 'react';
import {
  HeaderNew,
  HeaderTextNew,
  HeaderWrapper,
  LogoNew,
  LogoRoute,
  MenuBurgerCloseIcon,
  MenuBurgerIcon,
  NewMobileMenuBtn,
  PlatformLinkNew,
} from './Menu.styled';

export const MenuNew = ({ toggleModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerEl = useRef();
  // eslint-disable-next-line
  const [width, _] = useSize(headerEl);
  // eslint-disable-next-line
  const [show, __] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(isOpen => !isOpen);
  };

  useEffect(() => {
    document.body.style.overflowY !== 'hidden' && width < 768 && isMenuOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  }, [isMenuOpen, width]);

  return (
    <>
      <HeaderNew
        id="header"
        ref={headerEl}
        className={show ? 'shown' : 'hidden'}
      >
        <HeaderWrapper>
          <LogoRoute to="/">
            <LogoNew />
          </LogoRoute>

          {width < 1280 && (
            <NewMobileMenuBtn onClick={toggleMenu}>
              {!isMenuOpen ? <MenuBurgerIcon /> : <MenuBurgerCloseIcon />}
            </NewMobileMenuBtn>
          )}
        </HeaderWrapper>
        {/* {width >= 768 && (
          <LeadBtn onClick={toggleModal}> ШВИДКА КОНСУЛЬТАЦІЯ </LeadBtn>
        )} */}
        {width >= 1280 && (
          <NavigationNew
            toggleMenu={toggleMenu}
            toggleModal={toggleModal}
            className={'nav-open'}
          />
        )}

        {width >= 1280 && (
          <PlatformLinkNew href="https://online.ap.education/" target="_blank">
            <HeaderTextNew>Увійти</HeaderTextNew> <MyAPLogin />
          </PlatformLinkNew>
        )}
      </HeaderNew>
      {width < 1280 && (
        <NavigationNew
          toggleMenu={toggleMenu}
          toggleModal={toggleModal}
          className={isMenuOpen ? 'nav-open' : 'nav-closed'}
        />
      )}
    </>
  );
};
