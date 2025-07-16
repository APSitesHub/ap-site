import useSize from '@react-hook/size';
import axios from 'axios';
import { InputBtn, KahootBtn, KahootLogo } from 'components/Stream/Stream.styled';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../img/svg/supportIcons/tourLogo.png';
import { HostKahootsPedagogium } from './HostKahoots/HostKahootsPedagogium';
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
} from './TeacherPage.styled';
import { QRCodeModal } from './TeacherQuiz/TeacherQR';
import { TeacherQuizInput } from './TeacherQuiz/TeacherQuizInput';
import { TeacherQuizOptions } from './TeacherQuiz/TeacherQuizOptions';
import { TeacherQuizTrueFalse } from './TeacherQuiz/TeacherQuizTrueFalse';
import { TourViewer } from './TourViewer/TourViewer';
import { TourBtn, TourLogo } from './TourViewer/TourViewer.styled';
import { ViewerUni } from './Viewer/ViewerUni';
import { WhiteBoard } from './WhiteBoard/WhiteBoard';
import toast from 'react-hot-toast';

const group = 'logistics_2';
axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const TeacherPagePedagogium = () => {
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isKahootOpen, setIsKahootOpen] = useState(false);
  const [isKahootWasOpened, setIsKahootWasOpened] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isQuizInputOpen, setIsQuizInputOpen] = useState(false);
  const [isQuizOptionsOpen, setIsQuizOptionsOpen] = useState(false);
  const [isQuizTrueFalseOpen, setIsQuizTrueFalseOpen] = useState(false);
  const [isQuizFeedbackOpen, setIsQuizFeedbackOpen] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [isOpenedLast, setIsOpenedLast] = useState('');
  const [isInputButtonBoxOpen, setIsInputButtonBoxOpen] = useState(false);
  // eslint-disable-next-line
  const [width, height] = useSize(document.body);
  const [isNameInputOpen, setIsNameInputOpen] = useState(true);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tour, setTour] = useState('');
  const location = useLocation().pathname.split('/teacher/')[1];
  const questionID = useRef(nanoid(5));

  const closeInputs = () => {
    setIsQuizInputOpen(false);
    setIsQuizOptionsOpen(false);
    setIsQuizTrueFalseOpen(false);
    setIsQuizFeedbackOpen(false);
  };

  const changeQuestionID = () => {
    questionID.current = nanoid(5);
  };

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
      localStorage.getItem('groupName') === group &&
      localStorage.getItem('teacherName') === nameValue &&
      localStorage.getItem('lessonName') === levelValue &&
      localStorage.getItem('lessonNumber') === lessonValue
    ) {
      return;
    }

    try {
      const response = await axios.post('/pedagogium-lessons', {
        page: group,
        teacherName: nameValue,
        lessonName: levelValue,
        lessonNumber: lessonValue,
      });

      localStorage.setItem('lessonId', response.data.lessonId);
      localStorage.setItem('groupName', group);
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
    document.title = `Teacher ${group.toLocaleUpperCase()} | AP Education`;

    const getTour = async () => {
      try {
        const tours = await axios.get('/tours');
        const teacherPageTour = tours.data.find(tour => tour.page === location);
        if (teacherPageTour) {
          setTour(prev => (prev = teacherPageTour.link));
        } else {
          throw new Error('Tour not found');
        }
      } catch (error) {
        console.error('Error fetching tour data:', error);
      }
    };
    getTour();

    if (localStorage.getItem('groupName') === group) {
      setTeacherInfo({
        name: localStorage.getItem('teacherName'),
        lesson: localStorage.getItem('lessonNumber'),
        level: localStorage.getItem('lessonName'),
      });
    }
  }, [location]);

  const toggleTourViewer = () => {
    !isOpenedLast
      ? setIsTourOpen(isTourOpen => !isTourOpen)
      : isOpenedLast === 'tour' && setIsTourOpen(isTourOpen => !isTourOpen);
    isWhiteBoardOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isViewerOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen ||
    isQuizFeedbackOpen
      ? setIsOpenedLast(isOpenedLast => 'tour')
      : setIsOpenedLast(isOpenedLast => '');
  };
  const toggleViewer = () => {
    !isOpenedLast
      ? setIsViewerOpen(isViewerOpen => !isViewerOpen)
      : isOpenedLast === 'viewer' && setIsViewerOpen(isViewerOpen => !isViewerOpen);
    isWhiteBoardOpen ||
    isPlatformOpen ||
    isKahootOpen ||
    isTourOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen ||
    isQuizFeedbackOpen
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
    isTourOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen ||
    isQuizFeedbackOpen
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
    isTourOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen ||
    isQuizFeedbackOpen
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
    isTourOpen ||
    isQuizInputOpen ||
    isQuizOptionsOpen ||
    isQuizTrueFalseOpen ||
    isQuizFeedbackOpen
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
    setIsQuizFeedbackOpen(false);
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
    setIsQuizFeedbackOpen(false);
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
    setIsQuizFeedbackOpen(false);
  };

  const toggleQROPen = () => {
    setIsQROpen(isQROpen => !isQROpen);
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

  return (
    <>
      <NameInputBtn onClick={toggleNameInput}>
        {isNameInputOpen ? <BoxHideUpSwitch /> : <BoxHideDownSwitch />}
      </NameInputBtn>
      <LessonInfoBox
        className={
          teacherInfo.name || teacherInfo.level || teacherInfo.lesson ? '' : 'no-info'
        }
      >
        {teacherInfo.name} <br />
        {teacherInfo.level} {teacherInfo.lesson}
      </LessonInfoBox>
      <TeacherButtonBox className={!isButtonBoxOpen ? 'hidden' : ''}>
        {tour && (
          <TourBtn onClick={toggleTourViewer}>
            <TourLogo src={logo} alt="Tour logo" />
          </TourBtn>
        )}
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

          <InputBtn onClick={toggleQROPen}>QR</InputBtn>

          {/* <InputBtn onClick={toggleQuizFeedback}>FEED BACK</InputBtn> */}
        </InputButtonBox>
      </TeacherButtonBox>
      <TeacherButtonBoxHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxOpen ? <BoxHideRightSwitch /> : <BoxHideLeftSwitch />}
      </TeacherButtonBoxHideSwitch>

      <ViewerUni
        page={`pedagogium_${group}`}
        sectionWidth={width}
        isViewerOpen={isViewerOpen}
        isOpenedLast={isOpenedLast}
      />

      {tour && (
        <TourViewer
          tour={tour}
          sectionWidth={width}
          isTourOpen={isTourOpen}
          isOpenedLast={isOpenedLast}
        />
      )}

      <WhiteBoard
        page={`pedagogium_${group}`}
        sectionWidth={width}
        isWhiteBoardOpen={isWhiteBoardOpen}
        isOpenedLast={isOpenedLast}
      />

      <Platform
        page={group}
        sectionWidth={width}
        isPlatformOpen={isPlatformOpen}
        isOpenedLast={isOpenedLast}
      />
      {isKahootWasOpened && (
        <HostKahootsPedagogium
          page={group}
          sectionWidth={width}
          sectionHeight={height}
          isKahootOpen={isKahootOpen}
          isOpenedLast={isOpenedLast}
        />
      )}
      <TeacherChat page={group} />
      <TeacherQuizInput
        page={group}
        isQuizInputOpen={isQuizInputOpen}
        isQuizOptionsOpen={isQuizOptionsOpen}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        isQuizFeedbackOpen={isQuizFeedbackOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
        questionID={questionID.current}
        changeQuestionID={changeQuestionID}
        uni={'pedagogium'}
      />
      <TeacherQuizOptions
        page={group}
        isQuizInputOpen={isQuizInputOpen}
        isQuizOptionsOpen={isQuizOptionsOpen}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        isQuizFeedbackOpen={isQuizFeedbackOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
        questionID={questionID.current}
        changeQuestionID={changeQuestionID}
        uni={'pedagogium'}
      />
      <TeacherQuizTrueFalse
        page={group}
        isQuizInputOpen={isQuizInputOpen}
        isQuizOptionsOpen={isQuizOptionsOpen}
        isQuizTrueFalseOpen={isQuizTrueFalseOpen}
        isQuizFeedbackOpen={isQuizFeedbackOpen}
        closeInputs={closeInputs}
        isOpenedLast={isOpenedLast}
        questionID={questionID.current}
        changeQuestionID={changeQuestionID}
        uni={'pedagogium'}
      />
      <QRCodeModal
        onClose={toggleQROPen}
        isOpen={isQROpen}
        url={`https://pedagogium.ap.education/lesson/${group}`}
      />
      <NameInput
        isNameInputOpen={isNameInputOpen}
        changeTeacherInfo={changeTeacherInfo}
        uni={true}
      />
    </>
  );
};

export default TeacherPagePedagogium;
