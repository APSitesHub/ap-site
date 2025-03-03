import { LinkText, PlatformLink } from 'components/Menu/Menu.styled';
import { useLocation } from 'react-router-dom';
import {
  StreamPlaceHolder,
  StreamPlaceHolderText,
} from '../../../components/Stream/Stream.styled';

const StreamToZoomRedirecter = () => {
  const location = useLocation();

  let page;
  switch (location.pathname.replace('/streams/', '')) {
    case 'a0':
      // Юлія Дейнека
      page = 'https://us04web.zoom.us/j/4155403535?pwd=cFpjNkVkTWdubGRIMmtIbHE3Um9Tdz09';
      break;
    case 'a1':
      // Віка Івачевська
      page = 'https://us04web.zoom.us/j/7472785782?pwd=mlmx1s2CYUiGOEnzqLlnnh1NCiNYvA.1';
      break;
    case 'a2':
      // Діана Боднар
      page = 'https://us05web.zoom.us/j/6556315385?pwd=djhBWnJhYWlNeEpSOTFqQmdjNVJEZz09';
      break;
    // case 'a2':
    //   // Лілія Барановська
    //   page = 'https://us04web.zoom.us/j/7096171412?pwd=d242VVNLMXdpbWt1RURyVjVLekQzdz09';
    //   break;
    case 'b1':
      // Іра Кривуля
      page = 'https://us04web.zoom.us/j/5650469744?pwd=aWxxaVl4aDlsTVBrNnFtSmZQeVcrdz09';
      break;
    // case 'b1':
    //   // Наталія Цвігун
    //   page = 'https://us05web.zoom.us/j/3059336934?pwd=YnJtcjlBYzZuR1pCTWxDREVvNi9xQT09';
    //   break;
    case 'deutscha0':
      // Андріяна Наконечна
      page = 'https://us04web.zoom.us/j/74122161789?pwd=L5D8nML2aBColv5NEppW1Tx2qwcaBg.1';
      break;
    case 'deutscha2':
      // Оля Долока
      page = 'https://us04web.zoom.us/j/3792111105?pwd=n1fIzCs5xwn3Gg1AuuLqHWJIbR5GhI.1';
      break;
    case 'deutschb1':
      // Андріяна Наконечна
      page = 'https://us04web.zoom.us/j/74122161789?pwd=L5D8nML2aBColv5NEppW1Tx2qwcaBg.1';
      break;
    case 'polski':
      // Христина Красногурська'
      page = 'https://us05web.zoom.us/j/83397324158?pwd=VMjG75UO1QfEcqkEOQWREkBHOOrzJ6.1';
      break;
    case 'polskia2':
      // Христина Красногурська'
      page = 'https://us05web.zoom.us/j/83397324158?pwd=VMjG75UO1QfEcqkEOQWREkBHOOrzJ6.1';
      break;
    case 'polskib1':
      // Іванна Петрикович'
      page = 'https://us04web.zoom.us/j/2624898627?pwd=S0EwRGtaUHMxQ0wrbjc4RGowbk51dz09';
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
          Сьогоднішній урок відбудеться на платформі Zoom! <br /> Зачекайте, будь ласка,
          поки ми переадресуємо вас на сторінку трансляції.
        </StreamPlaceHolderText>
        <PlatformLink href={page} target="_blank" rel="noopener noreferrer">
          <LinkText>Або спробуйте під'єднатися самостійно за цим посиланням</LinkText>
        </PlatformLink>
      </StreamPlaceHolder>
    </>
  );
};

export default StreamToZoomRedirecter;
