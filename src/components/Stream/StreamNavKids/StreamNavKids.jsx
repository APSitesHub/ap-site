import {
  StreamNavDescription,
  StreamNavItem,
  StreamNavLink,
  StreamNavList,
  StreamNavTitle,
  StreamNavigation,
  StreamNavigationBox,
} from '../StreamNav/StreamNav.styled';

export const StreamNavKids = () => {
  return (
    <>
      <StreamNavigationBox>
        <StreamNavigation>
          <StreamNavTitle>Вітаємо на сторінці онлайн-уроків!</StreamNavTitle>
          <StreamNavDescription>
            Щоб знайти потрібну трансляцію, просто оберіть рівень:
          </StreamNavDescription>
          <StreamNavList>
            {/* <StreamNavItem>
              <StreamNavLink to={'/streams-kids/a0'}>A0</StreamNavLink>
            </StreamNavItem> */}
            {/* <StreamNavItem>
              <StreamNavLink to={'/streams-kids/beg'}>EN BEG</StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/mid'}>EN MID</StreamNavLink>
            </StreamNavItem>*/}
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/high'}>EN HIGH</StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/a1'}>A1</StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/a2'}>A2</StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/b1'}>B1</StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/b2'}>B2</StreamNavLink>
            </StreamNavItem>
            {/* <StreamNavItem>
              <StreamNavLink to={'/streams-kids/b1beginner'}>
                B1 Beginner
              </StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/b2beginner'}>
                B2 Beginner
              </StreamNavLink>
            </StreamNavItem> */}
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/dea0'}>DE A0</StreamNavLink>
            </StreamNavItem>
            {/* <StreamNavItem>
              <StreamNavLink to={'/streams-kids/dea1'}>DE A1</StreamNavLink>
            </StreamNavItem>
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/pla1'}>PL A1</StreamNavLink>
            </StreamNavItem> */}
          </StreamNavList>
        </StreamNavigation>
      </StreamNavigationBox>
    </>
  );
};
