import useSize from '@react-hook/size';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PlatformVertical } from './Platform/PlatformVertical';
import { PlatformVerticalPDF } from './Platform/PlatformVerticalPDF';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  PDFBtn,
  PDFLogo,
  PlatformBtn,
  PlatformLogo,
  TeacherButtonBoxHideSwitchVertical,
  TeacherButtonBoxVertical,
  ViewerBtn,
  ViewerLogo,
  WhiteBoardBtn,
  WhiteBoardLogo,
} from './TeacherPage.styled';
import { ViewerVertical } from './Viewer/ViewerVertical';
import { WhiteBoardVertical } from './WhiteBoard/WhiteBoardVertical';

const TeacherPageVertical = () => {
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');

  // eslint-disable-next-line
  const [width, height] = useSize(document.body);
  const location = useLocation().pathname.split('/teacher/')[1];

  const getLocation = location => {
    switch (location) {
      case 'deutsch-a0':
        return 'deutscha0';
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
      case 'polski-a0':
        return 'polskia0';
      case 'polski-a1':
        return 'polski';
      case 'polski-a1free':
        return 'polskifree';
      case 'polski-a2':
        return 'polskia2';
      case 'polski-b1':
        return 'polskib1';
      case 'record':
        return 'record';
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
    isWhiteBoardOpen || isPlatformOpen || isPDFOpen
      ? setIsOpenedLast(isOpenedLast => 'viewer')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleWhiteBoard = () => {
    !isOpenedLast
      ? setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen)
      : isOpenedLast === 'whiteboard' &&
        setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen);
    isViewerOpen || isPlatformOpen || isPDFOpen
      ? setIsOpenedLast(isOpenedLast => 'whiteboard')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const togglePlatform = () => {
    !isOpenedLast
      ? setIsPlatformOpen(isPlatformOpen => !isPlatformOpen)
      : isOpenedLast === 'platform' &&
        setIsPlatformOpen(isPlatformOpen => !isPlatformOpen);
    isViewerOpen || isWhiteBoardOpen || isPDFOpen
      ? setIsOpenedLast(isOpenedLast => 'platform')
      : setIsOpenedLast(isOpenedLast => '');
  };

  const togglePDF = () => {
    !isOpenedLast
      ? setIsPDFOpen(isPDFOpen => !isPDFOpen)
      : isOpenedLast === 'pdf' &&
        setIsPDFOpen(isPDFOpen => !isPDFOpen);
    isViewerOpen || isWhiteBoardOpen || isPlatformOpen
      ? setIsOpenedLast(isOpenedLast => 'pdf')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };

  return (
    <>
      <TeacherButtonBoxVertical className={!isButtonBoxOpen ? 'hidden' : ''}>
        <ViewerBtn onClick={toggleViewer}>
          <ViewerLogo />
        </ViewerBtn>

        <WhiteBoardBtn onClick={toggleWhiteBoard}>
          <WhiteBoardLogo />
        </WhiteBoardBtn>

        <PlatformBtn onClick={togglePlatform}>
          <PlatformLogo />
        </PlatformBtn>

        <PDFBtn onClick={togglePDF}>
          <PDFLogo />
        </PDFBtn>
      </TeacherButtonBoxVertical>
      <TeacherButtonBoxHideSwitchVertical
        id="no-transform"
        onClick={toggleButtonBox}
      >
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherButtonBoxHideSwitchVertical>
      <ViewerVertical
        page={page}
        isViewerOpen={isViewerOpen}
        isOpenedLast={isOpenedLast}
      />
      <WhiteBoardVertical
        page={page}
        sectionWidth={width}
        isWhiteBoardOpen={isWhiteBoardOpen}
        isOpenedLast={isOpenedLast}
      />
      <PlatformVertical
        page={page}
        isPlatformOpen={isPlatformOpen}
        isOpenedLast={isOpenedLast}
      />
      <PlatformVerticalPDF
        isPDFOpen={isPDFOpen}
        isOpenedLast={isOpenedLast}
      />
    </>
  );
};

export default TeacherPageVertical;
