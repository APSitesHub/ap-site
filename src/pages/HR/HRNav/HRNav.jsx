import {
  StreamNavigation,
  StreamNavigationBox,
} from 'components/Stream/StreamNav/StreamNav.styled';
import {
  ServiceNavItem,
  ServiceNavLink,
  ServiceNavList,
  ServiceNavTitle,
  TelegramLogo,
  ViberLogo
} from './HRNav.styled';

export const HRNav = () => {
  return (
    <>
      <StreamNavigationBox>
        <StreamNavigation>
          <ServiceNavTitle>
            Оберіть месенджер, в якому Вам буде зручно спілкуватись з нашим HR-менеджером:
          </ServiceNavTitle>
          {/* <ServiceNavDescription>
            Не забудьте написати Ваше прізвище та ім'я першим повідомленням!
          </ServiceNavDescription> */}
          <ServiceNavList>
            <ServiceNavItem>
              <ServiceNavLink to={'/hr/viber'}>
                <ViberLogo />
              </ServiceNavLink>
            </ServiceNavItem>
            <ServiceNavItem>
              <ServiceNavLink to={'/hr/tg'}>
                <TelegramLogo />
              </ServiceNavLink>
            </ServiceNavItem>
          </ServiceNavList>
        </StreamNavigation>
      </StreamNavigationBox>
    </>
  );
};
