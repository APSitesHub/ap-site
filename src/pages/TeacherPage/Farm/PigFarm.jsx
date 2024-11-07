import {
  KahootExitFullScreenIcon,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import { useState } from 'react';
import { FarmBox, FullScreenBtn } from './Farm.styled';

export const PigFarm = ({ isPigFarmOpen, isOpenedLast, sectionWidth }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'pigfarm' ? '4' : '1',
      width: isFullScreen ? sectionWidth : (sectionWidth / 10) * 4,
    };
  };

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  return (
    <>
      <FarmBox
        className={isPigFarmOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <FullScreenBtn onClick={toggleFullScreen}>
          {isFullScreen ? (
            <KahootExitFullScreenIcon />
          ) : (
            <KahootFullScreenIcon />
          )}
        </FullScreenBtn>

        <iframe
          id="farm-pig"
          title="farm-pig"
          src="https://www.pipestone.com/pig-tour/"
        ></iframe>
      </FarmBox>
    </>
  );
};
