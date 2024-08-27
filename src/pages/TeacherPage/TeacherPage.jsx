import useSize from '@react-hook/size';
import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
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
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState({});
  // eslint-disable-next-line
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

    const getCollectionsRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setCollection((await axios.get('/collections')).data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getCollectionsRequest();
  }, [page]);

  const toggleViewer = () => {
    !isOpenedLast
      ? setIsViewerOpen(isViewerOpen => !isViewerOpen)
      : isOpenedLast === 'viewer' &&
        setIsViewerOpen(isViewerOpen => !isViewerOpen);
    isWhiteBoardOpen || isPlatformOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'viewer')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleWhiteBoard = () => {
    !isOpenedLast
      ? setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen)
      : isOpenedLast === 'whiteboard' &&
        setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen);
    isViewerOpen || isPlatformOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'whiteboard')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const togglePlatform = () => {
    !isOpenedLast
      ? setIsPlatformOpen(isPlatformOpen => !isPlatformOpen)
      : isOpenedLast === 'platform' &&
        setIsPlatformOpen(isPlatformOpen => !isPlatformOpen);
    isViewerOpen || isWhiteBoardOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'platform')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleKahoot = () => {
    !isOpenedLast
      ? setIsKahootOpen(isKahootOpen => !isKahootOpen)
      : isOpenedLast === 'kahoot' &&
        setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
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
      </TeacherButtonBox>
      <TeacherButtonBoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherButtonBoxHideSwitch>
      {collection.length && (
        <Viewer
          page={page}
          collection={collection}
          sectionWidth={width}
          isViewerOpen={isViewerOpen}
          isOpenedLast={isOpenedLast}
        />
      )}
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
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};

export default TeacherPage;
