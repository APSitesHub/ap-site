import useSize from '@react-hook/size';
import {
  InputBtn,
  InputLogo,
  KahootBtn,
  KahootLogo,
} from 'components/Stream/Stream.styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hotel } from './Farm/Hotel';
import { Warehouse } from './Farm/Warehouse';
import { HostKahoots } from './HostKahoots/HostKahoots';
import { Platform } from './Platform/Platform';
import { TeacherChat } from './TeacherChat/TeacherChat';
import { TeacherQuizInput } from './TeacherInput/TeacherQuizInput';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  FarmBtn,
  PlatformBtn,
  PlatformLogo,
  TeacherFarmButtonBox,
  TeacherWarehouseHotelButtonBoxHideSwitch,
  ViewerBtn,
  ViewerLogo,
  WarehouseLogo,
  WhiteBoardBtn,
  WhiteBoardLogo,
  WorkshopLogo,
} from './TeacherPage.styled';
import { Viewer } from './Viewer/Viewer';
import { WhiteBoard } from './WhiteBoard/WhiteBoard';

const TeacherPageWarehouseHotel = () => {
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const [isHotelOpen, setIsHotelOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [width, height] = useSize(document.body);
  const location = useLocation().pathname.split('/teacher/')[1];

  const getLocation = location => {
    switch (location) {
      case 'polski-a0_3':
        return 'polskia0_3';
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
    isWhiteBoardOpen || isPlatformOpen || isKahootOpen || isWarehouseOpen || isHotelOpen
      ? setIsOpenedLast(isOpenedLast => 'viewer')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleWhiteBoard = () => {
    !isOpenedLast
      ? setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen)
      : isOpenedLast === 'whiteboard' &&
        setIsWhiteBoardOpen(isWhiteBoardOpen => !isWhiteBoardOpen);
    isViewerOpen || isPlatformOpen || isKahootOpen || isWarehouseOpen || isHotelOpen
      ? setIsOpenedLast(isOpenedLast => 'whiteboard')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleWarehouse = () => {
    !isOpenedLast
      ? setIsWarehouseOpen(isWarehouseOpen => !isWarehouseOpen)
      : isOpenedLast === 'warehouse' &&
        setIsWarehouseOpen(isWarehouseOpen => !isWarehouseOpen);
    isViewerOpen || isPlatformOpen || isKahootOpen || isWhiteBoardOpen || isHotelOpen
      ? setIsOpenedLast(isOpenedLast => 'warehouse')
      : setIsOpenedLast(isOpenedLast => '');
  };
  // eslint-disable-next-line
  const toggleHotel = () => {
    !isOpenedLast
      ? setIsHotelOpen(isHotelOpen => !isHotelOpen)
      : isOpenedLast === 'hotel' && setIsHotelOpen(isHotelOpen => !isHotelOpen);
    isViewerOpen || isPlatformOpen || isKahootOpen || isWhiteBoardOpen || isWarehouseOpen
      ? setIsOpenedLast(isOpenedLast => 'hotel')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const togglePlatform = () => {
    !isOpenedLast
      ? setIsPlatformOpen(isPlatformOpen => !isPlatformOpen)
      : isOpenedLast === 'platform' &&
        setIsPlatformOpen(isPlatformOpen => !isPlatformOpen);
    isViewerOpen || isWhiteBoardOpen || isKahootOpen || isWarehouseOpen || isHotelOpen
      ? setIsOpenedLast(isOpenedLast => 'platform')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleKahoot = () => {
    !isOpenedLast
      ? setIsKahootOpen(isKahootOpen => !isKahootOpen)
      : isOpenedLast === 'kahoot' && setIsKahootOpen(isKahootOpen => !isKahootOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isWarehouseOpen || isHotelOpen
      ? setIsOpenedLast(isOpenedLast => 'kahoot')
      : setIsOpenedLast(isOpenedLast => '');
  };
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

  return (
    <>
      <TeacherFarmButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
        <FarmBtn onClick={toggleHotel}>
          <WorkshopLogo />
        </FarmBtn>

        <FarmBtn onClick={toggleWarehouse}>
          <WarehouseLogo />
        </FarmBtn>

        <InputBtn onClick={toggleInput}>
          <InputLogo />
        </InputBtn>

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
      <TeacherWarehouseHotelButtonBoxHideSwitch
        id="no-transform"
        onClick={toggleButtonBox}
      >
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherWarehouseHotelButtonBoxHideSwitch>

      <Warehouse
        sectionWidth={width}
        isWarehouseOpen={isWarehouseOpen}
        isOpenedLast={isOpenedLast}
      />

      <Hotel sectionWidth={width} isHotelOpen={isHotelOpen} isOpenedLast={isOpenedLast} />

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
      <TeacherQuizInput page={page} isInputOpen={isInputOpen} isOpenedLast={isOpenedLast} />
    </>
  );
};

export default TeacherPageWarehouseHotel;
