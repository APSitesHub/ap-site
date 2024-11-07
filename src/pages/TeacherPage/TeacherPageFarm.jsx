import useSize from '@react-hook/size';
import { KahootBtn, KahootLogo } from 'components/Stream/Stream.styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HostKahoots } from './HostKahoots/HostKahoots';
import { Platform } from './Platform/Platform';
import { TeacherChat } from './TeacherChat/TeacherChat';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  CowLogo,
  FarmBtn,
  PigLogo,
  PlatformBtn,
  PlatformLogo,
  TeacherFarmButtonBox,
  TeacherFarmButtonBoxHideSwitch,
  ViewerBtn,
  ViewerLogo,
  WhiteBoardBtn,
  WhiteBoardLogo,
} from './TeacherPage.styled';
import { Viewer } from './Viewer/Viewer';
import { WhiteBoard } from './WhiteBoard/WhiteBoard';
import { CowFarm } from './Farm/CowFarm';
import { PigFarm } from './Farm/PigFarm';

const TeacherPageFarm = () => {
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isCowFarmOpen, setIsCowFarmOpen] = useState(false);
  const [isPigFarmOpen, setIsPigFarmOpen] = useState(false);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [width, height] = useSize(document.body);
  const location = useLocation().pathname.split('/teacher/')[1];

  const getLocation = location => {
    switch (location) {
      case 'polski-a0_2':
        return 'polskia0_2';
      default:
        return location;
    }
  };
  const page = getLocation(location);

  useEffect(() => {
    document.title = `Teacher ${page.toLocaleUpperCase()} | AP Education`;
  }, [page]);

  const toggleViewer = () => {
    !isOpenedLast
      ? setIsViewerOpen(isViewerOpen => !isViewerOpen)
      : isOpenedLast === 'viewer' &&
        setIsViewerOpen(isViewerOpen => !isViewerOpen);
    isWhiteBoardOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isCowFarmOpen ||
    isPigFarmOpen
      ? setIsOpenedLast(isOpenedLast => 'viewer')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleWhiteBoard = () => {
    !isOpenedLast
      ? setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen)
      : isOpenedLast === 'whiteboard' &&
        setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen);
    isViewerOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isCowFarmOpen ||
    isPigFarmOpen
      ? setIsOpenedLast(isOpenedLast => 'whiteboard')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleCowFarm = () => {
    !isOpenedLast
      ? setIsCowFarmOpen(isCowFarmOpen => !isCowFarmOpen)
      : isOpenedLast === 'cowfarm' &&
        setIsCowFarmOpen(isCowFarmOpen => !isCowFarmOpen);
    isViewerOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isWhiteBoardOpen ||
    isPigFarmOpen
      ? setIsOpenedLast(isOpenedLast => 'cowfarm')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const togglePigFarm = () => {
    !isOpenedLast
      ? setIsPigFarmOpen(isPigFarmOpen => !isPigFarmOpen)
      : isOpenedLast === 'pigfarm' &&
        setIsPigFarmOpen(isPigFarmOpen => !isPigFarmOpen);
    isViewerOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isWhiteBoardOpen ||
    isCowFarmOpen
      ? setIsOpenedLast(isOpenedLast => 'pigfarm')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const togglePlatform = () => {
    !isOpenedLast
      ? setIsPlatformOpen(isPlatformOpen => !isPlatformOpen)
      : isOpenedLast === 'platform' &&
        setIsPlatformOpen(isPlatformOpen => !isPlatformOpen);
    isViewerOpen ||
    isWhiteBoardOpen ||
    isKahootOpen ||
    isCowFarmOpen ||
    isPigFarmOpen
      ? setIsOpenedLast(isOpenedLast => 'platform')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleKahoot = () => {
    !isOpenedLast
      ? setIsKahootOpen(isKahootOpen => !isKahootOpen)
      : isOpenedLast === 'kahoot' &&
        setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isPlatformOpen ||
    isWhiteBoardOpen ||
    isViewerOpen ||
    isCowFarmOpen ||
    isPigFarmOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };

  return (
    <>
      <TeacherFarmButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
        <FarmBtn onClick={toggleCowFarm}>
          <CowLogo />
        </FarmBtn>

        <FarmBtn onClick={togglePigFarm}>
          <PigLogo />
        </FarmBtn>

        <ViewerBtn onClick={toggleViewer}>
          <ViewerLogo />
        </ViewerBtn>

        <WhiteBoardBtn onClick={toggleWhiteBoard}>
          <WhiteBoardLogo />
        </WhiteBoardBtn>

        <PlatformBtn onClick={togglePlatform}>
          <PlatformLogo />
        </PlatformBtn>

        <KahootBtn onClick={toggleKahoot}>
          <KahootLogo />
        </KahootBtn>
      </TeacherFarmButtonBox>
      <TeacherFarmButtonBoxHideSwitch
        id="no-transform"
        onClick={toggleButtonBox}
      >
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherFarmButtonBoxHideSwitch>

      <CowFarm
        sectionWidth={width}
        isCowFarmOpen={isCowFarmOpen}
        isOpenedLast={isOpenedLast}
      />

      <PigFarm
        sectionWidth={width}
        isPigFarmOpen={isPigFarmOpen}
        isOpenedLast={isOpenedLast}
      />

      <Viewer
        page={page}
        sectionWidth={width}
        isViewerOpen={isViewerOpen}
        isOpenedLast={isOpenedLast}
      />

      <WhiteBoard
        page={page}
        sectionWidth={width}
        isWhiteBoardOpen={isWhiteBoardOpen}
        isOpenedLast={isOpenedLast}
      />
      <Platform
        page={page}
        sectionWidth={width}
        isPlatformOpen={isPlatformOpen}
        isOpenedLast={isOpenedLast}
      />
      <HostKahoots
        page={page}
        sectionWidth={width}
        sectionHeight={height}
        isKahootOpen={isKahootOpen}
        isOpenedLast={isOpenedLast}
      />
      <TeacherChat page={page} />
    </>
  );
};

export default TeacherPageFarm;
