import {
  KahootExitFullScreenIcon,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import { useState } from 'react';
import { FarmBox, FullScreenBtn } from './Farm.styled';

export const Hotel = ({ isHotelOpen, isOpenedLast, sectionWidth }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'hotel' ? '4' : '1',
      width: isFullScreen ? sectionWidth : (sectionWidth / 10) * 4,
    };
  };

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  return (
    <>
      <FarmBox
        className={isHotelOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <FullScreenBtn onClick={toggleFullScreen}>
          {isFullScreen ? <KahootExitFullScreenIcon /> : <KahootFullScreenIcon />}
        </FullScreenBtn>

        <iframe
          id="hotel"
          title="hotel"
          src="https://starship.mobile.my3ideas.com/"
          // src="https://my.matterport.com/show/?m=eeu3PmqYSue&play=1&brand=0"
          // src="https://pxlbake.com/published/673b1ac298ec661fe05f4a9c"
          // src="https://k2wirtualnespacery.pl/hotelpodroza/"
        ></iframe>
      </FarmBox>
    </>
  );
};
