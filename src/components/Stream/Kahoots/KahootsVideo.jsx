import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import {
  KahootBox,
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
  KahootVideoBackground,
} from './Kahoots.styled';

export const KahootsVideo = ({
  sectionWidth,
  sectionHeight,
  isKahootOpen,
  isChatOpen,
  isOpenedLast,
  activeKahoot,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [kahoots, setKahoots] = useState({});

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
          className={isKahootOpen ? 'shown' : 'hidden'}
          style={{
            zIndex: isOpenedLast === 'kahoot' ? '2' : '1',
            width: isChatOpen ? kahootWidth - 300 : kahootWidth,
            height: sectionHeight,
            right: isChatOpen ? '600px' : '0',
            transform: isChatOpen && !isKahootOpen ? 'translateX(1000%)' : '',
          }}
          onTransitionEnd={kahootLinksRefresher}
        >
          {activeKahoot ? (
            getLinksForLocation().map(
              (link, i) =>
                activeKahoot === i + 1 && (
                  <KahootVideoBackground key={i}>
                    <iframe
                      id="kahoot-window"
                      title="kahoot-pin"
                      src={link}
                      width={
                        !isChatOpen
                          ? kahootWidth
                          : isFullScreen
                          ? kahootWidth - 300
                          : kahootWidth
                      }
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
