import {
  StreamNavigation,
  StreamNavigationBox,
} from 'components/Stream/StreamNav/StreamNav.styled';
import {
  ServiceNavDescription,
  ServiceNavItem,
  ServiceNavLink,
  ServiceNavList,
  ServiceNavTitle,
  TelegramLogo,
  ViberLogo,
} from './ServiceNav.styled';
import { useLocation } from 'react-router-dom';

export const ServiceNav = () => {
  const location = useLocation().pathname;

  return (
    <>
      <StreamNavigationBox>
        <StreamNavigation>
          <ServiceNavTitle>
            Оберіть месенджер, в якому Вам буде зручно спілкуватись з менеджером
            сервісу:
          </ServiceNavTitle>
          <ServiceNavDescription>
            Не забудьте написати Ваше прізвище та ім'я першим повідомленням!
          </ServiceNavDescription>
          <ServiceNavList>
            <ServiceNavItem>
              <ServiceNavLink
                to={
                  location.includes('marathon')
                    ? '/marathon/viber'
                    : '/service/viber'
                }
              >
                <ViberLogo />
              </ServiceNavLink>
            </ServiceNavItem>
            <ServiceNavItem>
              <ServiceNavLink
                to={
                  location.includes('marathon') ? '/marathon/tg' : '/service/tg'
                }
              >
                <TelegramLogo />
              </ServiceNavLink>
            </ServiceNavItem>
          </ServiceNavList>
        </StreamNavigation>
      </StreamNavigationBox>
    </>
  );
};
