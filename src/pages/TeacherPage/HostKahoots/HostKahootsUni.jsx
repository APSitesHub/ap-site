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

export const HostKahootsUni = ({
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
      setKahoots((await axios.get('/unihostkahoots')).data);
    }
  };

  const setKahootNumber = async e => {
    const kahootNumber = parseInt(e.currentTarget.innerText);
    setKahoots((await axios.get('/unihostkahoots')).data);
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
        setKahoots((await axios.get('/unihostkahoots')).data);
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
          className={classNames()}
          style={{
            zIndex: isOpenedLast === 'kahoot' ? '3' : isMinimized ? '5' : '1',
            width: isMinimized ? minimizedWidth : kahootWidth,
            height: !isMinimized ? sectionHeight : minimizedHeight,
          }}
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
          <KahootEnlargeButton onClick={toggleKahootWidth}>+</KahootEnlargeButton>

          {Object.values(kahoots[page].links).length > 1 && (
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
          )}
          {getLinksForLocation().map((link, i) => (
            <KahootBackground key={i} className={activeKahoot === i + 1 ? 'active' : ''}>
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
