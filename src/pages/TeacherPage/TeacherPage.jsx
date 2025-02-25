import useSize from '@react-hook/size';
import {
  InputBtn,
  KahootBtn,
  KahootLogo
} from 'components/Stream/Stream.styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HostKahoots } from './HostKahoots/HostKahoots';
import { Platform } from './Platform/Platform';
import { TeacherChat } from './TeacherChat/TeacherChat';
import { TeacherQuizInput } from './TeacherInput/TeacherQuizInput';
import { TeacherQuizOptions } from './TeacherInput/TeacherQuizOptions';
import { TeacherQuizTrueFalse } from './TeacherInput/TeacherQuizTrueFalse';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  InputButtonBox,
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
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  // eslint-disable-next-line
  const [isInputButtonBoxOpen, setIsInputButtonBoxOpen] = useState(false);
  const [width, height] = useSize(document.body);
  const location = useLocation().pathname.split('/teacher/')[1];

  const closeInputs = () => {
    setIsQuizInputOpen(false);
    setIsQuizOptionsOpen(false);
    setIsQuizTrueFalseOpen(false);
  };

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
    isWhiteBoardOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen
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
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen
      ? setIsOpenedLast(isOpenedLast => 'whiteboard')
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
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen
      ? setIsOpenedLast(isOpenedLast => 'platform')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleKahoot = () => {
    !isOpenedLast
      ? setIsKahootOpen(isKahootOpen => !isKahootOpen)
      : isOpenedLast === 'kahoot' && setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isPlatformOpen ||
    isWhiteBoardOpen ||
    isViewerOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  // eslint-disable-next-line
  const toggleQuizInput = () => {
    !isOpenedLast
      ? setIsQuizInputOpen(isQuizInputOpen => !isQuizInputOpen)
      : isOpenedLast === 'input' &&
        setIsQuizInputOpen(isQuizInputOpen => !isQuizInputOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'input')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleQuizOptions = () => {
    !isOpenedLast
      ? setIsQuizOptionsOpen(isQuizOptionsOpen => !isQuizOptionsOpen)
      : isOpenedLast === 'input' &&
        setIsQuizOptionsOpen(isQuizOptionsOpen => !isQuizOptionsOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'input')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleQuizTrueFalse = () => {
    !isOpenedLast
      ? setIsQuizTrueFalseOpen(isQuizTrueFalseOpen => !isQuizTrueFalseOpen)
      : isOpenedLast === 'input' &&
        setIsQuizTrueFalseOpen(isQuizTrueFalseOpen => !isQuizTrueFalseOpen);
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
        <InputBtn onClick={toggleInputButtonBox}>QUIZ</InputBtn>
        <InputButtonBox className={isInputButtonBoxOpen ? '' : 'hidden'}>
          <InputBtn onClick={toggleQuizInput}>TEXT</InputBtn>

          <InputBtn onClick={toggleQuizOptions}>A-B-C</InputBtn>

          <InputBtn onClick={toggleQuizTrueFalse}>TRUE FALSE</InputBtn>
        </InputButtonBox>
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
      <TeacherQuizInput
        page={page}
        isQuizInputOpen={isQuizInputOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
      />
      <TeacherQuizOptions
        page={page}
        isQuizOptionsOpen={isQuizOptionsOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
      />
      <TeacherQuizTrueFalse
        page={page}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
      />
    </>
  );
};

export default TeacherPage;
