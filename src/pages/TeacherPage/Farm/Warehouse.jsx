import {
  KahootExitFullScreenIcon,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import { useState } from 'react';
import { FarmBox, FullScreenBtn } from './Farm.styled';

export const Warehouse = ({ isWarehouseOpen, isOpenedLast, sectionWidth }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'warehouse' ? '4' : '1',
      width: isFullScreen ? sectionWidth : (sectionWidth / 10) * 4,
    };
  };

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  return (
    <>
      <FarmBox
        className={isWarehouseOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <FullScreenBtn onClick={toggleFullScreen}>
          {isFullScreen ? <KahootExitFullScreenIcon /> : <KahootFullScreenIcon />}
        </FullScreenBtn>

        <iframe
          id="warehouse"
          title="warehouse"
          src="https://tours.momentumvirtualtours.com/tours/sCW8Zszv-?sceneId=E5XAuv2Q_vv"
          // src="https://pxlbake.com/published/673b1ac298ec661fe05f4a9c"
        ></iframe>
      </FarmBox>
    </>
  );
};
