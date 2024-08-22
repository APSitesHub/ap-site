import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StreamSection } from '../../components/Stream/Stream.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const StreamA02SpeakingClub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState({});

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setLinks((await axios.get('/links')).data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getLinksRequest();
  }, []);

  useEffect(() => {
    document.title = 'A0 Speaking Club, 2 | AP Education';
  }, []);

  return (
    <>
      <StreamSection>
        <StreamsBackgroundWrapper>
          {isLoading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          {links.trials_de &&
          !links.trials_de.includes('youtube') &&
          !links.trials_de.includes('youtu.be')
            ? window.location.replace(
                'https://us06web.zoom.us/j/86858602689?pwd=6kwFpwwq5g0gEbS1gQoTZQKm1ifkYw.1#success'
              )
            : null}
        </StreamsBackgroundWrapper>
      </StreamSection>
    </>
  );
};

export default StreamA02SpeakingClub;
