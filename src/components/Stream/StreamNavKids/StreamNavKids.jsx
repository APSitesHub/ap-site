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
            <StreamNavItem>
              <StreamNavLink to={'/streams-kids/a0'}>A0</StreamNavLink>
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
          </StreamNavList>
        </StreamNavigation>
      </StreamNavigationBox>
    </>
  );
};
