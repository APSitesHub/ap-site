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
    a0: 'https://limnu.com/d/draw.html?b=B_A9hQh5BARkqtLu&',
    a0_2: 'https://limnu.com/d/draw.html?b=B_QZ7G6YbEQZqH2a&',
    a1: 'https://limnu.com/d/draw.html?b=B_FmIZmNqdTfWnRg&',
    a2: 'https://limnu.com/d/draw.html?b=B_Vy959BFwQCylvE&',
    b1: 'https://limnu.com/d/draw.html?b=B_3XD5qpFWQjqvyi&',
    b2: 'https://limnu.com/d/draw.html?b=B_7OemrrNhSBW57r&',
    c1: 'https://limnu.com/d/draw.html?b=B_mHxmj8tdSXWW4A&',
    a1free: 'https://limnu.com/d/draw.html?b=B_Bj0YLILtQwyoDz&',
    a2free: 'https://limnu.com/d/draw.html?b=B_FASIRvrnQAfwFB&',
    a0kids: 'https://limnu.com/d/draw.html?b=B_ot1T09RzScMNjo&',
    a1kids: 'https://limnu.com/d/draw.html?b=B_uVZi6U2QE6hcpb&',
    a2kids: 'https://limnu.com/d/draw.html?b=B_amsbEHvSnW3ETh&',
    b1kids: 'https://limnu.com/d/draw.html?b=B_b4vPLvFQ36XO8C&',
    b2kids: 'https://limnu.com/d/draw.html?b=B_BMEcMg9IQOGQZa&',
    c1kids: 'https://limnu.com/d/draw.html?b=B_BMEcMg9IQOGQZa&',
    a1kidsfree: 'https://limnu.com/d/draw.html?b=B_6M7DzZKvSzqeCb&',
    dea0kids: 'https://limnu.com/d/draw.html?b=B_PcQN6eytSxpqqc&',
    dea1kids: 'https://limnu.com/d/draw.html?b=B_kxaPq9LSzuG9qv&',
    dekidsfree: 'https://limnu.com/d/draw.html?b=B_0sDL1nKQhi6vld&',
    pla1kids: 'https://limnu.com/d/draw.html?b=B_z3f3PPzEQKO4M8&',
    plkidsfree: 'https://limnu.com/d/draw.html?b=B_NvWmUG7wQXWPTR&',
    b1kidsbeginner: 'https://limnu.com/d/draw.html?b=B_gowWVnYUQzhpXP&',
    b2kidsbeginner: 'https://limnu.com/d/draw.html?b=B_W2RnfnRURxKFP6&',
    test: 'https://limnu.com/d/draw.html?b=B_N65K69RyegUKa5&',
    trendets: 'https://limnu.com/d/draw.html?b=B_IOIfiaKoSU2L7O&',
    deutscha0: 'https://limnu.com/d/draw.html?b=B_60k993QOT7WQ1V&',
    deutscha0_2: 'https://limnu.com/d/draw.html?b=B_NATfimnyTeCQi2&',
    deutsch: 'https://limnu.com/d/draw.html?b=B_hiT6UQ3ST6uWVV&',
    deutscha2: 'https://limnu.com/d/draw.html?b=B_ncJnY7GRShOIQI&',
    deutschb1: 'https://limnu.com/d/draw.html?b=B_2U0nf6rRH6lpD4&',
    deutschb2: 'https://limnu.com/d/draw.html?b=B_RJsYwRGrQfOdFz&',
    deutschfree: 'https://limnu.com/d/draw.html?b=B_A0Fn3t7YRxCHI6&',
    deutscha2free: 'https://limnu.com/d/draw.html?b=B_KdJXJLGRTiZEU4&',
    polskia0: 'https://limnu.com/d/draw.html?b=B_GM2gKaJZSjyzC2&',
    polskia0_2: 'https://limnu.com/d/draw.html?b=B_N2DD7ESSSWyJHh&',
    polskia0_3: 'https://limnu.com/d/draw.html?b=B_N2DD7ESSSWyJHh&',
    polski: 'https://limnu.com/d/draw.html?b=B_9TsX3j3TmSHNPn&',
    polskia2: 'https://limnu.com/d/draw.html?b=B_40CRsvLLTp6Wq5&',
    polskib1: 'https://limnu.com/d/draw.html?b=B_OpIkiLsES66saB&',
    polskib2: 'https://limnu.com/d/draw.html?b=B_l4qF3EkXTYKzb0&',
    polskifree: 'https://limnu.com/d/draw.html?b=B_BlddXHk7SNiwOz&',
    record: 'https://limnu.com/d/draw.html?b=B_2jL8BzBbR1yp0m&',
    trials: 'https://limnu.com/d/draw.html?b=B_rxjSY6QhRuKju9&',
    trials_kids: 'https://limnu.com/d/draw.html?b=B_qjKPxvcPR4ernm&',
    trials_pl: 'https://limnu.com/d/draw.html?b=B_ePjI3DyfR56VdE&',
    trials_de: 'https://limnu.com/d/draw.html?b=B_vPcz12VJTaCg5t&',
    kidspre: 'https://limnu.com/d/draw.html?b=B_6vBirtPYRPWphv&',
    kidsbeg: 'https://limnu.com/d/draw.html?b=B_6vBirtPYRPWphv&',
    kidsmid: 'https://limnu.com/d/draw.html?b=B_qPq6cu5dT0ygVr&',
    kidshigh: 'https://limnu.com/d/draw.html?b=B_fLj6VebeTkWNLi&',
    preschool: 'https://limnu.com/d/draw.html?b=B_HRtlAHolQT2xVA&',
    nmt_ukr: 'https://limnu.com/d/draw.html?b=B_6CEKRSdjTOiMjE&',
    nmt_en: 'https://limnu.com/d/draw.html?b=B_v9MVlnKSEe4UNz&',
    nmt_math: 'https://limnu.com/d/draw.html?b=B_bRKEU5EjQHq9Kl&',
    nmt_history: 'https://limnu.com/d/draw.html?b=B_4fa5cLnBRnSI9N&',
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
