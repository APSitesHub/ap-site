import {
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import { WhiteBoardBox } from './WhiteBoard.styled';
import { useState } from 'react';

export const WhiteBoard = ({ page, isWhiteBoardOpen, isOpenedLast, sectionWidth }) => {
  const [isFullScreen, setIsFullScreen] = useState(true);

  const BOARDS = {
    // a0: 'https://onlineboard.eu/b/JO4uVrTP',
    a0: 'https://limnu.com/d/draw.html?b=B_A9hQh5BARkqtLu&',
    a0_2: 'https://limnu.com/d/draw.html?b=B_QZ7G6YbEQZqH2a&',
    // a1: 'https://onlineboard.eu/b/R68YtRVK',
    // a2: 'https://onlineboard.eu/b/dFS9r0PL',
    // b1: 'https://onlineboard.eu/b/ACK4lPnx',
    a1: 'https://limnu.com/d/draw.html?b=B_FmIZmNqdTfWnRg&',
    a2: 'https://limnu.com/d/draw.html?b=B_Vy959BFwQCylvE&',
    b1: 'https://limnu.com/d/draw.html?b=B_3XD5qpFWQjqvyi&',
    b2: 'https://limnu.com/d/draw.html?b=B_7OemrrNhSBW57r&',
    // b2: 'https://onlineboard.eu/b/z9ULiIYc',
    c1: 'https://limnu.com/d/draw.html?b=B_mHxmj8tdSXWW4A&',
    a1free: 'https://limnu.com/d/draw.html?b=B_Bj0YLILtQwyoDz&',
    // a1free: 'https://wbo.ophir.dev/boards/a726qY6pVgJ54U1ChaPbCXLUQgNKtMRX8m1IDAtySQI-',
    // a1free: 'https://onlineboard.eu/b/dWc0JMoH',
    a2free: 'https://limnu.com/d/draw.html?b=B_FASIRvrnQAfwFB&',
    // a2free: 'https://wbo.ophir.dev/boards/prSNm094cTCcW8aw5v5bP29-SYSeudvOpZsJbvT-OfI-',
    // a2free: 'https://onlineboard.eu/b/1KnOipMO',
    a0kids: 'https://limnu.com/d/draw.html?b=B_ot1T09RzScMNjo&',
    // a1kids: 'https://onlineboard.eu/b/fjQbqwdT',
    // a2kids: 'https://onlineboard.eu/b/2uoLMua3',
    // b1kids: 'https://onlineboard.eu/b/vw9XrZIL',
    // b2kids: 'https://onlineboard.eu/b/AHwXr41J',
    a1kids: 'https://limnu.com/d/draw.html?b=B_uVZi6U2QE6hcpb&',
    a2kids: 'https://limnu.com/d/draw.html?b=B_amsbEHvSnW3ETh&',
    b1kids: 'https://limnu.com/d/draw.html?b=B_b4vPLvFQ36XO8C&',
    b2kids: 'https://limnu.com/d/draw.html?b=B_BMEcMg9IQOGQZa&',
    c1kids: 'https://limnu.com/d/draw.html?b=B_BMEcMg9IQOGQZa&',
    // a1kidsfree: 'https://onlineboard.eu/b/RLFDsD7Z',
    a1kidsfree: 'https://limnu.com/d/draw.html?b=B_6M7DzZKvSzqeCb&',
    dea0kids: 'https://limnu.com/d/draw.html?b=B_PcQN6eytSxpqqc&',
    dea1kids: 'https://limnu.com/d/draw.html?b=B_kxaPq9LSzuG9qv&',
    dea2kids: 'https://limnu.com/d/draw.html?b=B_FXhIYLiGRs61CK&',
    deb1kids: 'https://limnu.com/d/draw.html?b=B_FXhIYLiGRs61CK&',
    // dekidsfree: 'https://onlineboard.eu/b/cmpNebPX',
    dekidsfree: 'https://limnu.com/d/draw.html?b=B_0sDL1nKQhi6vld&',
    pla1kids: 'https://limnu.com/d/draw.html?b=B_z3f3PPzEQKO4M8&',
    pla2kids: 'https://limnu.com/d/draw.html?b=B_z3f3PPzEQKO4M8&',
    plkidsfree: 'https://limnu.com/d/draw.html?b=B_NvWmUG7wQXWPTR&',
    b1kidsbeginner: 'https://limnu.com/d/draw.html?b=B_gowWVnYUQzhpXP&',
    b2kidsbeginner: 'https://limnu.com/d/draw.html?b=B_W2RnfnRURxKFP6&',
    test: 'https://limnu.com/d/draw.html?b=B_N65K69RyegUKa5&',
    trendets: 'https://limnu.com/d/draw.html?b=B_IOIfiaKoSU2L7O&',
    // deutscha0: 'https://onlineboard.eu/b/2kNvVUwp',
    deutscha0: 'https://limnu.com/d/draw.html?b=B_60k993QOT7WQ1V&',
    deutscha0_2: 'https://limnu.com/d/draw.html?b=B_NATfimnyTeCQi2&',
    deutsch: 'https://limnu.com/d/draw.html?b=B_hiT6UQ3ST6uWVV&',
    // deutsch: 'https://wbo.ophir.dev/boards/YTlBzu0msFbYhWCoJG7YecUkrjeOwBzEQk-BiT3akg8-',
    // deutsch: 'https://onlineboard.eu/b/x7AI5WxI',
    deutscha2: 'https://limnu.com/d/draw.html?b=B_ncJnY7GRShOIQI&',
    deutschb1: 'https://limnu.com/d/draw.html?b=B_2U0nf6rRH6lpD4&',
    // deutscha2: 'https://onlineboard.eu/b/4Epjnmzi',
    // deutschb1: 'https://onlineboard.eu/b/HqJaogsz',
    deutschb2: 'https://limnu.com/d/draw.html?b=B_RJsYwRGrQfOdFz&',
    // deutschb2:
    //   'https://wbo.ophir.dev/boards/RFN-yOx72EvSuZHvLosBe30vxogEeJkZvGIITRWVfBw-',
    // deutschb2: 'https://onlineboard.eu/b/x7AI5WxI',
    deutschfree: 'https://limnu.com/d/draw.html?b=B_A0Fn3t7YRxCHI6&',
    // deutschfree:
    //   'https://wbo.ophir.dev/boards/TiFFzAwkPwLgu9qVQv8JnG2PVdtMUUxOXRKohs9aMzs-',
    // deutschfree: 'https://onlineboard.eu/b/g8MtvNZz',
    deutscha2free: 'https://limnu.com/d/draw.html?b=B_KdJXJLGRTiZEU4&',
    // deutscha2free:
    //   'https://wbo.ophir.dev/boards/YYfTJ93GSWtgVgMJJCZQU2VsRkXcEqtlIVMIIFi1Kcs-',
    // deutscha2free: 'https://onlineboard.eu/b/1KnOipMO',
    polskia0: 'https://limnu.com/d/draw.html?b=B_GM2gKaJZSjyzC2&',
    polskia0_2: 'https://limnu.com/d/draw.html?b=B_N2DD7ESSSWyJHh&',
    polskia0_3: 'https://limnu.com/d/draw.html?b=B_N2DD7ESSSWyJHh&',
    // polskia0_3: 'https://onlineboard.eu/b/jmVqursB',
    // polski: 'https://onlineboard.eu/b/PBazzUHc',
    // polskia2: 'https://onlineboard.eu/b/GO4Om9NN',
    // polskib1: 'https://onlineboard.eu/b/6gBSGc6R',
    polski: 'https://limnu.com/d/draw.html?b=B_9TsX3j3TmSHNPn&',
    polskia2: 'https://limnu.com/d/draw.html?b=B_40CRsvLLTp6Wq5&',
    polskib1: 'https://limnu.com/d/draw.html?b=B_OpIkiLsES66saB&',
    polskib2: 'https://limnu.com/d/draw.html?b=B_l4qF3EkXTYKzb0&',
    // polskib2: 'https://wbo.ophir.dev/boards/SInP2nDbk0tjMpn2P46aP7cPttLa2HDMXt5cNzcxB4o-',
    // polskib2: 'https://onlineboard.eu/b/8Dh01GQ0',
    polskifree: 'https://limnu.com/d/draw.html?b=B_BlddXHk7SNiwOz&',
    record: 'https://limnu.com/d/draw.html?b=B_2jL8BzBbR1yp0m&',
    trials: 'https://limnu.com/d/draw.html?b=B_rxjSY6QhRuKju9&',
    trials_kids: 'https://limnu.com/d/draw.html?b=B_qjKPxvcPR4ernm&',
    trials_pl: 'https://limnu.com/d/draw.html?b=B_ePjI3DyfR56VdE&',
    trials_de: 'https://limnu.com/d/draw.html?b=B_vPcz12VJTaCg5t&',
    kidspre: 'https://limnu.com/d/draw.html?b=B_6vBirtPYRPWphv&',
    kidsbeg: 'https://limnu.com/d/draw.html?b=B_6vBirtPYRPWphv&',
    kidsmid: 'https://limnu.com/d/draw.html?b=B_qPq6cu5dT0ygVr&',
    // kidshigh: 'https://onlineboard.eu/b/ZvCoQd73',
    kidshigh: 'https://limnu.com/d/draw.html?b=B_fLj6VebeTkWNLi&',
    preschool: 'https://limnu.com/d/draw.html?b=B_HRtlAHolQT2xVA&',
    nmt_ukr: 'https://limnu.com/d/draw.html?b=B_6CEKRSdjTOiMjE&',
    nmt_en: 'https://limnu.com/d/draw.html?b=B_v9MVlnKSEe4UNz&',
    nmt_math: 'https://limnu.com/d/draw.html?b=B_bRKEU5EjQHq9Kl&',
    nmt_history: 'https://limnu.com/d/draw.html?b=B_4fa5cLnBRnSI9N&',

    pedagogium_logistics: 'https://limnu.com/d/draw.html?b=B_k4R7KNVpSaSCYa&',
    pedagogium_logistics_2: 'https://limnu.com/d/draw.html?b=B_k4R7KNVpSaSCYa&',
    wstijo_logistics: 'https://limnu.com/d/draw.html?b=B_0CvDJykXTq9LiI&',

    kubrak: 'https://limnu.com/d/draw.html?b=B_yIF60R3CSKuMRj&',
    bulavka: 'https://limnu.com/d/draw.html?b=B_8FJtWXQ8SCCWt7&',
    ivachevska: 'https://limnu.com/d/draw.html?b=B_X2FiNmdwR9uQOi&',
    deineka: 'https://limnu.com/d/draw.html?b=B_NeKVuD0vRuKoD9&',
    nakonechna: 'https://limnu.com/d/draw.html?b=B_HCES0jqASQyFcT&',
    heinz: 'https://limnu.com/d/draw.html?b=B_l692R2RtSf2mlQ&',
    doloka: 'https://limnu.com/d/draw.html?b=B_cwRrr1TvRNGFES&',
    lyasota: 'https://limnu.com/d/draw.html?b=B_qRQx5t1SyyzhYf&',
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
          {isFullScreen ? <KahootExitFullScreenIcon /> : <KahootFullScreenIcon />}
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
