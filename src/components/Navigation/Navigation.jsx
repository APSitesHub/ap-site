import useSize from '@react-hook/size';
import {
  HeaderText,
  MobileMenuIcon,
  PlatformLink,
} from 'components/Menu/Menu.styled';
import { useEffect, useState } from 'react';
import { ReactComponent as LoginIcon } from '../../img/svg/invertedLoginIcon.svg';
import {
  MenuButtonsWrapper,
  MenuCoursesArrowLeft,
  MenuCoursesArrowRight,
  MenuCoursesWrapper,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationNavLink,
  StyledNavigation,
} from './Navigation.styled';

export const Navigation = ({ toggleMenu, className }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);
  const [isCourseListOpen, setIsCourseListOpen] = useState(false);

  const nodeList = [];
  document.querySelectorAll('[id]').forEach(node => nodeList.push(node));

  const toggleCourseList = () => {
    setIsCourseListOpen(isOpen => !isOpen);
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isCourseListOpen) {
        toggleCourseList();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  const filteredNodeList = nodeList.filter(
    node =>
      !!node.className &&
      node.id !== 'hero' &&
      (node.nodeName === 'HEADER' ||
        node.nodeName === 'SECTION' ||
        node.nodeName === 'H4')
  );

  const props =
    width < 768
      ? { spy: true, smooth: true, onClick: toggleMenu, offset: -30 }
      : { spy: true, smooth: true, onClick: toggleMenu, offset: -40 };

  return (
    <StyledNavigation className={className}>
      {width < 1280 && (
        <MenuButtonsWrapper>
          <PlatformLink href="https://online.ap.education/" target="_blank">
            <HeaderText>УВІЙТИ</HeaderText> <LoginIcon />
          </PlatformLink>
        </MenuButtonsWrapper>
      )}
      <MenuCoursesWrapper>
        <NavigationMenu onClick={toggleCourseList}>
          {width < 1280 && width > 500 && <MenuCoursesArrowLeft />} НАШІ КУРСИ
          {width < 500 && <MenuCoursesArrowRight />}
          {width >= 1280 && <MobileMenuIcon />}
        </NavigationMenu>
        <NavigationMenuList
          className={
            isCourseListOpen ? 'course-list-open' : 'course-list-closed'
          }
        >
          <NavigationMenuItem>
            <NavigationNavLink to={'/english'} onClick={toggleCourseList}>
              Англійська
            </NavigationNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationNavLink to={'/deutsch'} onClick={toggleCourseList}>
              Німецька
            </NavigationNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationNavLink to={'/polski'} onClick={toggleCourseList}>
              Польська
            </NavigationNavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </MenuCoursesWrapper>
      <NavigationList>
        {filteredNodeList.map((node, i) => {
          if (i === 0) {
            return null;
          }
          return (
            <NavigationItem key={i}>
              <NavigationLink to={node.id} {...props}>
                {node.outerText.split('\n')[0] === 'ONE STEP'
                  ? null
                  : node.outerText.split('\n')[0]}
              </NavigationLink>
            </NavigationItem>
          );
        })}
      </NavigationList>
    </StyledNavigation>
  );
};
