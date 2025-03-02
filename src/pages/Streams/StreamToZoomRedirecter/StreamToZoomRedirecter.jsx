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
      page = 'https://us04web.zoom.us/j/4155403535?pwd=cFpjNkVkTWdubGRIMmtIbHE3Um9Tdz09';
      break;
    case 'a1':
      page = 'https://us04web.zoom.us/j/7472785782?pwd=mlmx1s2CYUiGOEnzqLlnnh1NCiNYvA.1';
      break;
    case 'a2':
      page = 'https://us04web.zoom.us/j/7096171412?pwd=d242VVNLMXdpbWt1RURyVjVLekQzdz09';
      break;
    case 'b1':
      page = 'https://us05web.zoom.us/j/3059336934?pwd=YnJtcjlBYzZuR1pCTWxDREVvNi9xQT09';
      break;
    case 'deutscha2':
      page = 'https://us04web.zoom.us/j/74122161789?pwd=L5D8nML2aBColv5NEppW1Tx2qwcaBg.1';
      break;
    case 'deutschb1':
      page = 'https://us04web.zoom.us/j/74122161789?pwd=L5D8nML2aBColv5NEppW1Tx2qwcaBg.1';
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
