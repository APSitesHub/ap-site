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
          {isFullScreen ? (
            <KahootExitFullScreenIcon />
          ) : (
            <KahootFullScreenIcon />
          )}
        </FullScreenBtn>

        <iframe
          id="warehouse"
          title="warehouse"
          src="https://panos.highfoto.at/CARGO-PARTNER/VT_cargo-partner_bratislava.html"
        ></iframe>
      </FarmBox>
    </>
  );
};
