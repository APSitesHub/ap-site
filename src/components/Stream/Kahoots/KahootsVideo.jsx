import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  KahootBox,
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
  KahootVideoBackground
} from './Kahoots.styled';

export const KahootsVideo = ({ sectionWidth, sectionHeight, isKahootOpen }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [kahoots, setKahoots] = useState({});
  const [activeKahoot, setActiveKahoot] = useState(1);

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const page = 'polskia0_3';

  const kahootWidth = isFullScreen ? sectionWidth : (sectionWidth / 10) * 4;

  const getLinksForLocation = () => {
    const entries = [];
    Object.values(kahoots[page].links).map(entry => {
      entries.push(entry);
      return entries;
    });
    return entries;
  };

  const kahootLinksRefresher = async e => {
    if (e.target === e.currentTarget) {
      setKahoots((await axios.get('/kahoots')).data);
    }
  };

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setKahoots((await axios.get('/kahoots')).data);
      } catch (error) {
        console.log(error);
      }
    };

    getLinksRequest();
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  return (
    <>
      {Object.keys(kahoots).length && (
        <KahootBox
          ref={ref}
          className={isKahootOpen ? 'shown' : 'hidden'}
          style={{
            zIndex: '3',
            width: kahootWidth,
            height: sectionHeight,
          }}
          onTransitionEnd={kahootLinksRefresher}
        >

          {isKahootOpen ? (
            getLinksForLocation().map(
              (link, i) =>
                activeKahoot === i + 1 && (
                  <KahootVideoBackground key={i}>
                    <iframe
                      id="kahoot-window"
                      title="kahoot-pin"
                      src={link}
                      width={kahootWidth}
                      height={sectionHeight}
                    ></iframe>
                    <KahootFullScreenBtn onClick={toggleFullScreen}>
                      {isFullScreen ? (
                        <KahootExitFullScreenIcon />
                      ) : (
                        <KahootFullScreenIcon />
                      )}
                    </KahootFullScreenBtn>
                  </KahootVideoBackground>
                )
            )
          ) : (
            <></>
          )}
        </KahootBox>
      )}
    </>
  );
};
