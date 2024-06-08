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
  NavigationAnchorUniversity,
  NavigationItemNew,
  NavigationLinkUniversity,
  NavigationListNew,
  NavigationMenuItemNew,
  NavigationMenuListNew,
  NavigationMenuNew,
  NavigationNavLinkNew,
  StyledNavigationNew,
} from './Navigation.styled';

export const NavigationUniversity = ({ toggleMenu, className }) => {
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
          <NavigationLinkUniversity to={'/'}>Головна</NavigationLinkUniversity>
        </NavigationItemNew>
        <NavigationItemNew key={1}>
          <NavigationLinkUniversity to={'/school'}>
            AP School
          </NavigationLinkUniversity>
        </NavigationItemNew>
        <NavigationItemNew key={2}>
          <NavigationLinkUniversity to={'/university'}>
            AP University
          </NavigationLinkUniversity>
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
                <NavigationNavLinkNew onClick={toggleScroll} to={'/english'}>
                  Англійська мова
                </NavigationNavLinkNew>
              </NavigationMenuItemNew>
              <NavigationMenuItemNew>
                <NavigationNavLinkNew onClick={toggleScroll} to={'/deutsch'}>
                  Німецька мова
                </NavigationNavLinkNew>
              </NavigationMenuItemNew>
              <NavigationMenuItemNew>
                <NavigationNavLinkNew onClick={toggleScroll} to={'/polski'}>
                  Польська мова
                </NavigationNavLinkNew>
              </NavigationMenuItemNew>
            </NavigationMenuListNew>
          </MenuCoursesWrapperNew>
        </NavigationItemNew>
        <NavigationItemNew key={4}>
          <NavigationAnchorUniversity to={'reviews-anchor'} {...props}>
            Про нас
          </NavigationAnchorUniversity>
        </NavigationItemNew>
        <NavigationItemNew key={5}>
          <NavigationAnchorUniversity to={'contacts'} {...props}>
            Контакти
          </NavigationAnchorUniversity>
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
