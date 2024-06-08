import { PlatformWhiteBoardBox } from './PlatformWhiteBoard.styled';

export const PlatformWhiteBoard = ({ page, isPlatformWhiteBoardOpen }) => {
  const BOARDS = {
    a0: 'https://wbo.ophir.dev/boards/J7RmpLKceGbNptoJ6J3qew7JX1kTXgx1J-tpT-USkfI-',
    a1: 'https://wbo.ophir.dev/boards/i8c4m8cMJhPjy-dWWrMDFLtvhUgmWyM0i77LB19sHmw-',
    a2: 'https://wbo.ophir.dev/boards/Bmiet9AI5P8GNP5ixKbucOZr7Xd92xBVgqaod7exoSQ-',
    b1: 'https://wbo.ophir.dev/boards/FQzYr0lILU0oCSezZGsIVGHZbcHrPiIcjBvenv-Y7BA-',
    b2: 'https://wbo.ophir.dev/boards/ccnR6rzFbWp-Kgna2MtnyA7CqLOIBXhEVYFexRvPjp4-',
    a1kids:
      'https://wbo.ophir.dev/boards/ujbh9g-qMXSEj3bMwO1eBtywS3FTJJZhXPMXPGdtDR4-',
    a2kids:
      'https://wbo.ophir.dev/boards/L3jebdd8-7JnANOlNvcvoiyShjz52mo2jsY6iwtLZVI-',
    b1kids:
      'https://wbo.ophir.dev/boards/uxW8hZoRxv29XvZa2tPWDaPG6Yf2mKvaSD67oO979TI-',
    b2kids:
      'https://wbo.ophir.dev/boards/z5k7kgtyUKBPhBYPmtI-Vu-9fiogNVG4Sw81tCGGxU0-',
    b1kidsbeginner:
      'https://wbo.ophir.dev/boards/pqhGMIQbDEu0XyqtTqokpUz9zO0j3gGkeziLBVeKCpA-',
    test: 'https://wbo.ophir.dev/boards/a-ncwWxxbVznUDHBEzMbnO1aYE-7TR-EZgHtZJIVoUA-',
    deutsch:
      'https://wbo.ophir.dev/boards/fsQFDadAzg3H2bfRVg0Sl0fsNdmMgW5e023TFIFeDgE-',
    deutscha2:
      'https://wbo.ophir.dev/boards/ITQ0Bma2acCiaTgadiq5gmisV6J5ICgUP32S2HNe9Mc-',
    polski:
      'https://wbo.ophir.dev/boards/0-DmXOnKjWCiu0vuEaN3-xij02VftT5Wwx15nRTxlSA-',
    polskia2:
      'https://wbo.ophir.dev/boards/-WzS-MOW-pQiClyE7gzECbfUYqpfpvqkPnKq-bSvDS4-',
    trials:
      'https://wbo.ophir.dev/boards/KbEPuRPVX-j2OVjcAl90rAhYgb6uc1NrO-RpwhDTwKA-',
    trials_kids:
      'https://wbo.ophir.dev/boards/7SlsErBwkkjvSG59AbOsZa6uDOSe-RPJZXfQTjwlNAc-',
    trials_pl:
      'https://wbo.ophir.dev/boards/heV-bIFILeHeRA7EFqFiGA55JJJyIIbWlAWDqYM2kqU-',
    trials_de:
      'https://wbo.ophir.dev/boards/eQDPQuKllivCxSX7ZuQN7xi-f2aM1HrYzgpuZGhSIRQ-',
  };

  return (
    <>
      <PlatformWhiteBoardBox
        className={isPlatformWhiteBoardOpen ? 'shown' : 'hidden'}
      >
        <iframe
          id="whiteboard window"
          title="whiteboard-pin"
          src={BOARDS[page]}
          width="100%"
          height="100%"
        ></iframe>
      </PlatformWhiteBoardBox>
    </>
  );
};
