import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import {
  ClickDisabler,
  ClickDisablerRight,
  KahootBackground,
  KahootBox,
  KahootMinimizerBtn,
  KahootMaximizeIcon,
  KahootMinimizeIcon,
  KahootNumbersBtn,
  KahootPicker,
  KahootPlaceholder,
  KahootEnlargeButton,
} from './HostKahoots.styled';

export const HostKahoots = ({
  page,
  sectionWidth,
  sectionHeight,
  isKahootOpen,
  isOpenedLast,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLinkSize, setIsLinkSize] = useState(false);
  const [kahoots, setKahoots] = useState({});
  const [activeKahoot, setActiveKahoot] = useState(1);

  const kahootWidth = isLinkSize ? '1024px' : (sectionWidth / 10) * 4;
  const minimizedWidth = '124px';
  const minimizedHeight = '70px';

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
      setKahoots((await axios.get('/host-kahoots')).data);
    }
  };

  const setKahootNumber = async e => {
    const kahootNumber = parseInt(e.currentTarget.innerText);
    setKahoots((await axios.get('/host-kahoots')).data);
    setActiveKahoot(kahootNumber);
  };

  const toggleKahootWidth = () => {
    setIsLinkSize(!isLinkSize);
  };

  const classNames = () => {
    let style = '';
    style = isKahootOpen ? 'shown' : 'hidden';
    style = isMinimized ? style + ' minimized' : style;
    return style;
  };

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setKahoots((await axios.get('/host-kahoots')).data);
      } catch (error) {
        console.log(error);
      }
    };

    getLinksRequest();
  }, []);

  const toggleMinimize = () => {
    setIsMinimized(isMinimized => (isMinimized = !isMinimized));
  };

  return (
    <>
      {Object.keys(kahoots).length && (
        <KahootBox
          width={isMinimized ? minimizedWidth : kahootWidth}
          height={!isMinimized ? sectionHeight : minimizedHeight}
          className={classNames()}
          style={
            isOpenedLast === 'kahoot'
              ? { zIndex: '3' }
              : isMinimized
              ? { zIndex: '5' }
              : { zIndex: '1' }
          }
          onTransitionEnd={kahootLinksRefresher}
        >
          {isMinimized && (
            <KahootPlaceholder>
              <ClickDisablerRight />
              <ClickDisabler />
            </KahootPlaceholder>
          )}
          <KahootMinimizerBtn
            onClick={toggleMinimize}
            className={isKahootOpen ? '' : 'hidden'}
          >
            {isMinimized ? <KahootMaximizeIcon /> : <KahootMinimizeIcon />}
          </KahootMinimizerBtn>
          <KahootEnlargeButton onClick={toggleKahootWidth}>
            +
          </KahootEnlargeButton>
          <KahootPicker>
            {Object.values(kahoots[page].links).map((link, i) => (
              <KahootNumbersBtn
                key={i}
                onClick={setKahootNumber}
                className={activeKahoot === i + 1 ? 'active' : ''}
                tabIndex={-1}
              >
                {i + 1}
              </KahootNumbersBtn>
            ))}
          </KahootPicker>
          {getLinksForLocation().map((link, i) => (
            <KahootBackground
              key={i}
              className={activeKahoot === i + 1 ? 'active' : ''}
            >
              <iframe
                id={`host-kahoot-window-${i + 1}`}
                title={`host-kahoot-${i + 1}`}
                src={link}
                width={isMinimized ? minimizedWidth : kahootWidth}
                height={!isMinimized ? sectionHeight : minimizedHeight}
              ></iframe>
            </KahootBackground>
          ))}
        </KahootBox>
      )}
    </>
  );
};
