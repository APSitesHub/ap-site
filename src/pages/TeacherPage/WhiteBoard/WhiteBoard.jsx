import {
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import { WhiteBoardBox } from './WhiteBoard.styled';
import { useState } from 'react';

export const WhiteBoard = ({
  page,
  isWhiteBoardOpen,
  isOpenedLast,
  sectionWidth,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(true);

  const BOARDS = {
    a0: 'http://go.limnu.com/poppy-naked',
    a1: 'http://go.limnu.com/browallia-bursting',
    a2: 'http://go.limnu.com/sealion-nasty',
    b1: 'http://go.limnu.com/marker-powerless',
    b2: 'http://go.limnu.com/skunk-outraged',
    a1free: 'http://go.limnu.com/honda-patchy',
    a2free: 'http://go.limnu.com/mirabilis-candied',
    a0kids: 'https://limnu.com/d/draw.html?b=B_ot1T09RzScMNjo&',
    a1kids: 'http://go.limnu.com/saucer-nutritious',
    a2kids: 'http://go.limnu.com/tulip-hollow',
    b1kids: 'http://go.limnu.com/boxwood-flexible',
    b2kids: 'http://go.limnu.com/rattlesnake-naughty',
    a1kidsfree: 'http://go.limnu.com/cyclamen-depressed',
    b1kidsbeginner: 'http://go.limnu.com/goatsbeard-naked',
    test: 'https://limnu.com/d/draw.html?b=B_N65K69RyegUKa5&',
    deutscha0: 'http://go.limnu.com/blanket-mealy',
    deutsch: 'http://go.limnu.com/cobra-potent',
    deutscha2: 'http://go.limnu.com/woodruff-dreamy',
    deutschfree: 'http://go.limnu.com/artemisia-exquisite',
    deutscha2free: 'http://go.limnu.com/mouse-melodic',
    polskia0: 'http://go.limnu.com/dahlia-junior',
    polski: 'http://go.limnu.com/hippogryph-pouched',
    polskia2: 'http://go.limnu.com/emu-meek',
    polskifree: 'http://go.limnu.com/bluebell-mammoth',
    trials: 'http://go.limnu.com/hare-patchy',
    trials_kids: 'http://go.limnu.com/pine-brisk',
    trials_pl: 'http://go.limnu.com/cherry-arcane',
    trials_de: 'http://go.limnu.com/blimp-numb',
  };

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'whiteboard' ? '3' : '1',
      width: isFullScreen ? sectionWidth : (sectionWidth / 10) * 4,
    };
  };

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  return (
    <>
      <WhiteBoardBox
        className={isWhiteBoardOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <KahootFullScreenBtn onClick={toggleFullScreen}>
          {isFullScreen ? (
            <KahootExitFullScreenIcon />
          ) : (
            <KahootFullScreenIcon />
          )}
        </KahootFullScreenBtn>
        <iframe
          id="whiteboard window"
          title="whiteboard-pin"
          // src="https://wbo.ophir.dev/boards/i8c4m8cMJhPjy-dWWrMDFLtvhUgmWyM0i77LB19sHmw-"
          src={BOARDS[page]}
          width="100%"
          height="100%"
        ></iframe>
      </WhiteBoardBox>
    </>
  );
};
