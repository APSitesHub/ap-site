import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamRefreshPageLink,
  StreamRefreshQuestion,
  StreamRefreshText,
  StreamSection,
} from '../../components/Stream/Stream.styled';
import { useLocation } from 'react-router-dom';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const StreamSpeakingClubKids = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectLink, setRedirectLink] = useState('');
  const location = useLocation().pathname;

  const page = location.includes('preschool')
    ? location.replace('/streams-kids/', '').slice(0, -2)
    : location.includes('pre') ||
      location.includes('beg') ||
      location.includes('mid') ||
      location.includes('high')
    ? 'kids' + location.replace('/streams-kids/', '').replace('sc', '')
    : location.replace('/streams-kids/', '').replace('sc', '') + 'kids';
  const link = page.includes('b1beginnerkids')
    ? 'b1kidsbeginner'
    : page.includes('b2beginnerkids')
    ? 'b2kidsbeginner'
    : page;

  console.log(page);

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setRedirectLink((await axios.get('/speakings')).data[link]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getLinksRequest();
  }, [link]);

  useEffect(() => {
    document.title = `Практичне заняття | AP Education`;
  }, [redirectLink]);

  return (
    <>
      <StreamSection>
        <StreamsBackgroundWrapper>
          {isLoading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          <StreamPlaceHolder>
            <StreamPlaceHolderText>
              Привіт! <br />
              Будь ласка, зачекайте, незабаром вас переадресує на практичне
              заняття в Zoom
            </StreamPlaceHolderText>
            <StreamRefreshText>
              <StreamRefreshQuestion>
                Очікуєте занадто довго?
              </StreamRefreshQuestion>
              <StreamRefreshPageLink onClick={() => window.location.reload()}>
                Натисніть сюди, щоб оновити сторінку
              </StreamRefreshPageLink>
            </StreamRefreshText>
          </StreamPlaceHolder>
          {redirectLink && window.location.replace(redirectLink)}
        </StreamsBackgroundWrapper>
      </StreamSection>
    </>
  );
};

export default StreamSpeakingClubKids;
