import useSize from '@react-hook/size';
import {
  HeaderTextNew,
  MobileMenuIcon,
  PlatformLinkNew,
} from 'components/Menu/Menu.styled';
import { useState } from 'react';

import {
  MenuButtonsWrapper,
  MenuCoursesArrowDown,
  MenuCoursesWrapperNew,
  MyAPLogin,
  NavigationAnchorNew,
  NavigationItemNew,
  NavigationLinkNew,
  NavigationListNew,
  NavigationMenuItemNew,
  NavigationMenuListNew,
  NavigationMenuNew,
  NavigationNavLinkNew,
  StyledNavigationNew,
} from './Navigation.styled';

export const NavigationNew = ({ toggleMenu, className }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);
  const [isCourseListOpen, setIsCourseListOpen] = useState(false);

  const toggleCourseList = () => {
    setIsCourseListOpen(isOpen => !isOpen);
  };

  const openCourseListOnHover = () => {
    if (!isCourseListOpen) {
      setIsCourseListOpen(isOpen => !isOpen);
    }
  };

  const closeCourseListOnMouseOut = () => {
    if (isCourseListOpen) {
      setIsCourseListOpen(isOpen => !isOpen);
    }
  };

  const toggleScroll = () => {
    document.body.style.overflowY = 'auto';
  };

  const props =
    width < 768
      ? { spy: true, smooth: true, onClick: toggleMenu, offset: -30 }
      : { spy: true, smooth: true, onClick: toggleMenu, offset: -40 };

  return (
    <StyledNavigationNew className={className}>
      <NavigationListNew>
        <NavigationItemNew key={0}>
          <NavigationLinkNew to={'/'}>Головна</NavigationLinkNew>
        </NavigationItemNew>
        <NavigationItemNew key={1}>
          <NavigationLinkNew to={'/school'}>AP School</NavigationLinkNew>
        </NavigationItemNew>
        <NavigationItemNew key={2}>
          <NavigationLinkNew to={'/university'}>
            AP University
          </NavigationLinkNew>
        </NavigationItemNew>
        <NavigationItemNew key={3}>
          <MenuCoursesWrapperNew
            onMouseEnter={width >= 1280 ? openCourseListOnHover : null}
            onMouseLeave={width >= 1280 ? closeCourseListOnMouseOut : null}
          >
            <NavigationMenuNew onClick={toggleCourseList}>
              Мовні курси
              {width < 1280 && <MenuCoursesArrowDown />}
              {width >= 1280 && <MobileMenuIcon />}
            </NavigationMenuNew>
            <NavigationMenuListNew
              className={
                isCourseListOpen ? 'course-list-open' : 'course-list-closed'
              }
            >
              <NavigationMenuItemNew>
                <NavigationNavLinkNew
                  onClick={() => {
                    toggleScroll();
                    toggleMenu();
                  }}
                  to={'/english'}
                >
                  Англійська мова
                </NavigationNavLinkNew>
              </NavigationMenuItemNew>
              <NavigationMenuItemNew>
                <NavigationNavLinkNew
                  onClick={() => {
                    toggleScroll();
                    toggleMenu();
                  }}
                  to={'/deutsch'}
                >
                  Німецька мова
                </NavigationNavLinkNew>
              </NavigationMenuItemNew>
              <NavigationMenuItemNew>
                <NavigationNavLinkNew
                  onClick={() => {
                    toggleScroll();
                    toggleMenu();
                  }}
                  to={'/polski'}
                >
                  Польська мова
                </NavigationNavLinkNew>
              </NavigationMenuItemNew>
            </NavigationMenuListNew>
          </MenuCoursesWrapperNew>
        </NavigationItemNew>
        <NavigationItemNew key={4}>
          <NavigationAnchorNew to={'reviews-anchor'} {...props}>
            Про нас
          </NavigationAnchorNew>
        </NavigationItemNew>
        <NavigationItemNew key={5}>
          <NavigationAnchorNew to={'contacts'} {...props}>
            Контакти
          </NavigationAnchorNew>
        </NavigationItemNew>
      </NavigationListNew>
      {width < 1280 && (
        <MenuButtonsWrapper>
          <PlatformLinkNew href="https://online.ap.education/" target="_blank">
            <HeaderTextNew>Увійти</HeaderTextNew> <MyAPLogin />
          </PlatformLinkNew>
        </MenuButtonsWrapper>
      )}
    </StyledNavigationNew>
  );
};
