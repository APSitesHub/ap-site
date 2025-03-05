import { LinkText, PlatformLink } from 'components/Menu/Menu.styled';
import { useLocation } from 'react-router-dom';
import {
  StreamPlaceHolder,
  StreamPlaceHolderText,
} from '../../../components/Stream/Stream.styled';
import { useEffect } from 'react';

const StreamToZoomRedirecterKids = () => {
  const location = useLocation();

  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Cache-Control';
    metaTag.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(metaTag);

    return () => {
      // Cleanup: Remove the tag when the component unmounts (optional)
      document.head.removeChild(metaTag);
    };
  }, []);

  let page;
  switch (location.pathname.replace('/streams-kids/', '')) {
    // Лілія Барановська
    //  page = 'https://us04web.zoom.us/j/7096171412?pwd=d242VVNLMXdpbWt1RURyVjVLekQzdz09';
    case 'a1':
      // Віка Івачевська
      page = 'https://us04web.zoom.us/j/7472785782?pwd=mlmx1s2CYUiGOEnzqLlnnh1NCiNYvA.1';
      break;
    case 'a2':
      // Юлія Дейнека
      page = 'https://us04web.zoom.us/j/4155403535?pwd=cFpjNkVkTWdubGRIMmtIbHE3Um9Tdz09';
      break;
    case 'b1':
      // Діана Боднар
      page = 'https://us05web.zoom.us/j/6556315385?pwd=djhBWnJhYWlNeEpSOTFqQmdjNVJEZz09';
      break;
    case 'b2':
      // Наталія Цвігун
      page = 'https://us05web.zoom.us/j/3059336934?pwd=YnJtcjlBYzZuR1pCTWxDREVvNi9xQT09';
      break;
    case 'high':
      // Іра Кривуля
      page = 'https://us04web.zoom.us/j/5650469744?pwd=aWxxaVl4aDlsTVBrNnFtSmZQeVcrdz09';
      break;
    // case 'dea2':
    //   // Андріяна Наконечна
    //   page = 'https://us04web.zoom.us/j/74122161789?pwd=L5D8nML2aBColv5NEppW1Tx2qwcaBg.1';
    //   break;
    case 'dea2':
      // Роман Кобрин
      page = 'https://us05web.zoom.us/j/2298370039?pwd=bsaSVbhipQ02tEfAkimKQlYx9VFaUa.1';
      break;
    default:
      break;
  }

  const redirect = () => {
    setTimeout(() => {
      window.location.replace(page);
    }, 7500);
  };

  page && redirect();

  document.title = 'Redirecting... | AP Education';

  return (
    <>
      <StreamPlaceHolder>
        <StreamPlaceHolderText>
          Привіт! <br />
          Сьогоднішнє заняття відбудеться на платформі Zoom! <br /> Залишайтесь, будь
          ласка, на цій сторінці, поки ми переадресовуємо вас на урок.
        </StreamPlaceHolderText>
        <PlatformLink href={page} target="_blank" rel="noopener noreferrer">
          <LinkText>
            Або спробуйте під'єднатися самостійно, для цього просто натисніть на цей текст
          </LinkText>
        </PlatformLink>
      </StreamPlaceHolder>
    </>
  );
};

export default StreamToZoomRedirecterKids;
