import useSize from '@react-hook/size';
import { InputBtn, KahootBtn, KahootLogo } from 'components/Stream/Stream.styled';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HostKahootsUni } from './HostKahoots/HostKahootsUni';
import { NameInput } from './NameInput/NameInput';
import { LessonInfoBox, NameInputBtn } from './NameInput/NameInput.styled';
import { Platform } from './Platform/Platform';
import { TeacherChat } from './TeacherChat/TeacherChat';
import {
  BoxHideDownSwitch,
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  BoxHideUpSwitch,
  InputButtonBox,
  PlatformBtn,
  PlatformLogo,
  TeacherButtonBox,
  TeacherButtonBoxHideSwitch,
  ViewerBtn,
  ViewerLogo,
  WhiteBoardBtn,
  WhiteBoardLogo,
  QRBtn,
} from './TeacherPage.styled';
import { TeacherQuizInput } from './TeacherQuiz/TeacherQuizInput';
import { TeacherQuizOptions } from './TeacherQuiz/TeacherQuizOptions';
import { TeacherQuizTrueFalse } from './TeacherQuiz/TeacherQuizTrueFalse';
import { ViewerUni } from './Viewer/ViewerUni';
import { WhiteBoard } from './WhiteBoard/WhiteBoard';
import { QRCodeModal } from './TeacherQuiz/TeacherQR';
import axios from 'axios';
import toast from 'react-hot-toast';

const TeacherPageUni = ({ group = 'logistics' }) => {
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isKahootWasOpened, setIsKahootWasOpened] = useState(false);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [isQROpen, setIsQROpen] = useState(false);
  // eslint-disable-next-line
  const [isInputButtonBoxOpen, setIsInputButtonBoxOpen] = useState(false);
  const [width, height] = useSize(document.body);
  const location = useLocation().pathname.split('/teacher/')[1];
  const [isNameInputOpen, setIsNameInputOpen] = useState(true);
  const [teacherInfo, setTeacherInfo] = useState({});
  const questionID = useRef(nanoid(5));

  console.log(location);

  const closeInputs = () => {
    setIsQuizInputOpen(false);
    setIsQuizOptionsOpen(false);
    setIsQuizTrueFalseOpen(false);
  };

  const changeQuestionID = () => {
    questionID.current = nanoid(5);
  };

  const getLocation = location => {
    switch (location) {
      case 'pedagogium-1':
        return 'pedagogium_logistics';
      case 'pedagogium-2':
        return 'pedagogium_logistics_2';
      case 'wstijo':
        return 'wstijo_logistics';
      case 'wskm':
        return `wskm_${group}`;
      default:
        return location;
    }
  };
  const page = getLocation(location);

  const changeTeacherInfo = async (nameValue, lessonValue, levelValue) => {
    if (!nameValue || !lessonValue || !levelValue) {
      alert('Fill in all fields');
      return;
    }

    setIsNameInputOpen(isOpen => (isOpen = false));

    setTeacherInfo(
      teacherInfo =>
        (teacherInfo = {
          ...{ name: nameValue, lesson: lessonValue, level: levelValue },
        })
    );

    if (
      localStorage.getItem('groupName') === page &&
      localStorage.getItem('teacherName') === nameValue &&
      localStorage.getItem('lessonName') === levelValue &&
      localStorage.getItem('lessonNumber') === lessonValue
    ) {
      return;
    }

    try {
      const response = await axios.post('/uni-lesson-results', {
        page: page,
        uniName: location,
        teacherName: nameValue,
        lessonName: levelValue,
        lessonNumber: lessonValue,
      });

      localStorage.setItem('lessonId', response.data.lessonId);
      localStorage.setItem('groupName', page);
      localStorage.setItem('teacherName', nameValue);
      localStorage.setItem('lessonName', levelValue);
      localStorage.setItem('lessonNumber', lessonValue);

      toast.success('Урок успішно створено!', {
        duration: 10000,
        position: 'bottom-left',
      });
    } catch (e) {
      alert('Error creating a lesson: ' + e.response.data);
      console.error(e.response.data);
    }
  };

  useEffect(() => {
    document.title = `Teacher ${page.toLocaleUpperCase()}`;

    if (localStorage.getItem('groupName') === page) {
      setTeacherInfo({
        name: localStorage.getItem('teacherName'),
        lesson: localStorage.getItem('lessonNumber'),
        level: localStorage.getItem('lessonName'),
      });
    }
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
    if (!isKahootWasOpened) {
      setIsKahootWasOpened(true);
    }

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
    setIsQuizOptionsOpen(false);
    setIsQuizTrueFalseOpen(false);
  };
  const toggleQuizOptions = () => {
    !isOpenedLast
      ? setIsQuizOptionsOpen(isQuizOptionsOpen => !isQuizOptionsOpen)
      : isOpenedLast === 'input' &&
        setIsQuizOptionsOpen(isQuizOptionsOpen => !isQuizOptionsOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'input')
      : setIsOpenedLast(isOpenedLast => '');
    setIsQuizInputOpen(false);
    setIsQuizTrueFalseOpen(false);
  };
  const toggleQuizTrueFalse = () => {
    !isOpenedLast
      ? setIsQuizTrueFalseOpen(isQuizTrueFalseOpen => !isQuizTrueFalseOpen)
      : isOpenedLast === 'input' &&
        setIsQuizTrueFalseOpen(isQuizTrueFalseOpen => !isQuizTrueFalseOpen);
    isPlatformOpen || isWhiteBoardOpen || isViewerOpen || isKahootOpen
      ? setIsOpenedLast(isOpenedLast => 'input')
      : setIsOpenedLast(isOpenedLast => '');
    setIsQuizInputOpen(false);
    setIsQuizOptionsOpen(false);
  };
  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };
  // eslint-disable-next-line
  const toggleInputButtonBox = () => {
    setIsInputButtonBoxOpen(isInputButtonBoxOpen => !isInputButtonBoxOpen);
  };

  const toggleNameInput = () => {
    setIsNameInputOpen(isNameInputOpen => !isNameInputOpen);
  };

  const toggleQROPen = () => {
    setIsQROpen(isQROpen => !isQROpen);
  };
  return (
    <>
      <NameInputBtn onClick={toggleNameInput}>
        {isNameInputOpen ? <BoxHideDownSwitch /> : <BoxHideUpSwitch />}
      </NameInputBtn>
      <LessonInfoBox>
        {teacherInfo.name} <br />
        {teacherInfo.level} {teacherInfo.lesson}
      </LessonInfoBox>
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
          <QRBtn onClick={toggleQROPen}>QR</QRBtn>
        </InputButtonBox>
      </TeacherButtonBox>
      <TeacherButtonBoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherButtonBoxHideSwitch>

      <ViewerUni
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
      {isKahootWasOpened && (
        <HostKahootsUni
          page={page}
          sectionWidth={width}
          sectionHeight={height}
          isKahootOpen={isKahootOpen}
          isOpenedLast={isOpenedLast}
        />
      )}
      <TeacherChat page={page} />
      <TeacherQuizInput
        page={page}
        isQuizInputOpen={isQuizInputOpen}
        isQuizOptionsOpen={isQuizOptionsOpen}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
        questionID={questionID.current}
        changeQuestionID={changeQuestionID}
        uni={location}
      />
      <TeacherQuizOptions
        page={page}
        isQuizInputOpen={isQuizInputOpen}
        isQuizOptionsOpen={isQuizOptionsOpen}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
        questionID={questionID.current}
        changeQuestionID={changeQuestionID}
        uni={location}
      />
      <TeacherQuizTrueFalse
        page={page}
        isQuizInputOpen={isQuizInputOpen}
        isQuizOptionsOpen={isQuizOptionsOpen}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
        questionID={questionID.current}
        changeQuestionID={changeQuestionID}
        uni={location}
      />
      <NameInput
        isNameInputOpen={isNameInputOpen}
        changeTeacherInfo={changeTeacherInfo}
      />

      <QRCodeModal
        onClose={toggleQROPen}
        isOpen={isQROpen}
        url={`https://${location}.ap.education/lesson/${group}`}
      />
    </>
  );
};

export default TeacherPageUni;
