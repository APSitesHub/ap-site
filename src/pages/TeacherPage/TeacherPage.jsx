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
  PlatformBtn,
  PlatformLogo,
  TeacherButtonBox,
  TeacherButtonBoxHideSwitch,
  ViewerBtn,
  ViewerLogo,
  WhiteBoardBtn,
  WhiteBoardLogo,
} from './TeacherPage.styled';
import { Viewer } from './Viewer/Viewer';
import { WhiteBoard } from './WhiteBoard/WhiteBoard';

const TeacherPage = () => {
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  // eslint-disable-next-line
  const [isInputButtonBoxOpen, setIsInputButtonBoxOpen] = useState(false);
  const [width, height] = useSize(document.body);
  const location = useLocation().pathname.split('/teacher/')[1];

  const getLocation = location => {
    switch (location) {
      case 'deutsch-a0':
        return 'deutscha0';
      case 'deutsch-a0_2':
        return 'deutscha0_2';
      case 'deutsch-a1':
        return 'deutsch';
      case 'deutsch-a1free':
        return 'deutschfree';
      case 'deutsch-a2':
        return 'deutscha2';
      case 'deutsch-a2free':
        return 'deutscha2free';
      case 'deutsch-b1':
        return 'deutschb1';
      case 'deutsch-b2':
        return 'deutschb2';
      case 'polski-a0':
        return 'polskia0';
      case 'polski-a0_2':
        return 'polskia0_2';
      case 'polski-a1':
        return 'polski';
      case 'polski-a1free':
        return 'polskifree';
      case 'polski-a2':
        return 'polskia2';
      case 'polski-b1':
        return 'polskib1';
      case 'polski-b2':
        return 'polskib2';
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
      : isOpenedLast === 'viewer' && setIsViewerOpen(isViewerOpen => !isViewerOpen);
    isWhiteBoardOpen || isPlatformOpen || isKahootOpen || isInputOpen
      ? setIsOpenedLast(isOpenedLast => 'viewer')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleWhiteBoard = () => {
    !isOpenedLast
      ? setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen)
      : isOpenedLast === 'whiteboard' &&
        setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen);
    isViewerOpen || isPlatformOpen || isKahootOpen || isInputOpen
      ? setIsOpenedLast(isOpenedLast => 'whiteboard')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const togglePlatform = () => {
    !isOpenedLast
      ? setIsPlatformOpen(isPlatformOpen => !isPlatformOpen)
      : isOpenedLast === 'platform' &&
        setIsPlatformOpen(isPlatformOpen => !isPlatformOpen);
    isViewerOpen || isWhiteBoardOpen || isKahootOpen || isInputOpen
      ? setIsOpenedLast(isOpenedLast => 'platform')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleKahoot = () => {
    !isOpenedLast
      ? setIsKahootOpen(isKahootOpen => !isKahootOpen)
      : isOpenedLast === 'kahoot' && setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isInputOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  // eslint-disable-next-line
  const toggleInput = () => {
    !isOpenedLast
      ? setIsInputOpen(isInputOpen => !isInputOpen)
      : isOpenedLast === 'input' && setIsInputOpen(isInputOpen => !isInputOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'input')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };
  // eslint-disable-next-line
  const toggleInputButtonBox = () => {
    setIsInputButtonBoxOpen(isInputButtonBoxOpen => !isInputButtonBoxOpen);
  };

  return (
    <>
      <TeacherButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
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
        {/* <InputBtn onClick={toggleInputButtonBox}>
          <InputLogo />
        </InputBtn>
        <InputButtonBox className={isInputButtonBoxOpen ? '' : 'hidden'}>
          <InputBtn onClick={toggleInput}>
            <InputLogo />
          </InputBtn>

          <InputBtn onClick={toggleInput}>
            <InputLogo />
          </InputBtn>

          <InputBtn onClick={toggleInput}>
            <InputLogo />
          </InputBtn>
        </InputButtonBox> */}
      </TeacherButtonBox>
      <TeacherButtonBoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherButtonBoxHideSwitch>

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
      {/* <TeacherInput page={page} isInputOpen={isInputOpen} isOpenedLast={isOpenedLast} /> */}
    </>
  );
};

export default TeacherPage;
