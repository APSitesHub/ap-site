import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamSection,
} from '../../components/Stream/Stream.styled';
import { useLocation } from 'react-router-dom';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const StreamSpeakingClubKids = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectLink, setRedirectLink] = useState('');
  const location = useLocation().pathname;

  const page = location.replace('/streams/', '').replace('sc', '');
  const link = page.includes('dea1')
    ? page.replace('dea1', 'deutsch')
    : page.includes('de')
    ? page.replace('de', 'deutsch')
    : page.includes('pla1')
    ? page.replace('pla1', 'polski')
    : page.includes('pl')
    ? page.replace('pl', 'polski')
    : page;

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
          </StreamPlaceHolder>
          {redirectLink && window.location.replace(redirectLink)}
        </StreamsBackgroundWrapper>
      </StreamSection>
    </>
  );
};

export default StreamSpeakingClubKids;
