import axios from 'axios';
import { MyAPStudentChartPl } from 'pages/TeacherPage/StudentChart/MyAPStudentChartPl';
import { useEffect, useState } from 'react';
import { AttendanceTrialPl } from '../Attendance/AttendanceTrialPl';
import { LessonFinderPl } from '../LessonFinder/LessonFinderPl';
import { PointsPl } from '../Points/PointsPl';
import { TimetablePl } from '../Timetable/TimetablePl';
import {
  APPanelBtn,
  APPanelTrial,
  CalendarBtnIcon,
  CupBtnIcon,
  FeedbackBtnIcon,
  PanelBackdropTrial,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
  PanelHideSwitch,
  SearchBtnIcon,
  TimetableBtnIcon,
} from './MyAPPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const MyAPPanelPlMERITO = ({
  lessons,
  location,
  user,
  language,
  points,
  timetable,
  montlyPoints,
  isMultipleLanguages,
  setPlatformIframeLink,
}) => {
  const [isBackdropShown, setIsBackdropShown] = useState(false);
  const [isLessonFinderShown, setIsLessonFinderShown] = useState(false);
  const [isRatingShown, setIsRatingShown] = useState(false);
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [isTimetableShown, setIsTimetableShown] = useState(false);
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [isButtonBoxShown, setIsButtonBoxShown] = useState(true);
  const [currentStudentChart, setCurrentStudentChart] = useState({});
  // const [isDisclaimerTimeoutActive, setIsDisclaimerTimeoutActive] =
  //   useState(false);
  // const [isMarathonBtnShown, setIsMarathonBtnShown] = useState(false);
  // const [isMarathonBtnClicked, setIsMarathonBtnClicked] = useState(false);

  const toggleButtonBox = () => {
    hideBackdrop();
    setIsButtonBoxShown(isShown => !isShown);
  };

  console.log(user);

  const hideBackdrop = () => {
    setIsBackdropShown(false);
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(false);
    setIsFeedbackShown(false);
  };

  const toggleSearch = () => {
    !isBackdropShown &&
      (!isRatingShown || !isCalendarShown || !isTimetableShown || !isFeedbackShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isCalendarShown &&
      !isTimetableShown &&
      !isFeedbackShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsRatingShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(false);
    setIsFeedbackShown(false);
    setIsLessonFinderShown(isLessonFinderShown => !isLessonFinderShown);
  };

  const toggleRating = () => {
    !isBackdropShown &&
      (!isLessonFinderShown ||
        !isCalendarShown ||
        !isTimetableShown ||
        !isFeedbackShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isLessonFinderShown &&
      !isCalendarShown &&
      !isTimetableShown &&
      !isFeedbackShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(false);
    setIsFeedbackShown(false);
    setIsRatingShown(isRatingShown => !isRatingShown);
  };

  const toggleCalendar = () => {
    !isBackdropShown &&
      (!isRatingShown || !isLessonFinderShown || !isTimetableShown || !isFeedbackShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isLessonFinderShown &&
      !isTimetableShown &&
      !isFeedbackShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsTimetableShown(false);
    setIsFeedbackShown(false);
    setIsCalendarShown(isCalendarShown => !isCalendarShown);
  };

  const toggleTimetable = () => {
    !isBackdropShown &&
      (!isRatingShown || !isLessonFinderShown || !isCalendarShown || !isFeedbackShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isLessonFinderShown &&
      !isCalendarShown &&
      !isFeedbackShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsCalendarShown(false);
    setIsFeedbackShown(false);
    setIsTimetableShown(isTimetableShown => !isTimetableShown);
  };

  const toggleFeedback = () => {
    !isBackdropShown &&
      (!isRatingShown || !isLessonFinderShown || !isTimetableShown || !isCalendarShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isLessonFinderShown &&
      !isTimetableShown &&
      !isCalendarShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsTimetableShown(false);
    setIsCalendarShown(false);
    setIsFeedbackShown(isFeedbackShown => !isFeedbackShown);
  };

  const toggleTooltip = e => {
    // !isDisclaimerTimeoutActive &&
    e.currentTarget.classList.toggle('tooltip-open');
  };

  // const toggleTooltipTimeout = () => {
  //   const resetBtnEl = document.querySelector('#reset-btn');

  //   if (isDisclaimerTimeoutActive) {
  //     setTimeout(() => {
  //       resetBtnEl.classList.add('tooltip-open');
  //     }, 10000);

  //     setTimeout(() => {
  //       resetBtnEl.classList.remove('tooltip-open');
  //       setIsDisclaimerTimeoutActive(false);
  //     }, 20000);
  //   }
  // };

  // const toggleLangTooltipTimeout = () => {
  //   const resetBtnEl = document.querySelector('#toggle-btn');

  //   if (isDisclaimerTimeoutActive) {
  //     setTimeout(() => {
  //       resetBtnEl.classList.add('tooltip-open');
  //     }, 10000);

  //     setTimeout(() => {
  //       resetBtnEl.classList.remove('tooltip-open');
  //       setIsDisclaimerTimeoutActive(false);
  //     }, 20000);
  //   }
  // };

  // const toggleMarathonButtonTimeout = () => {
  //   if (!isMarathonBtnClicked) {
  //     setTimeout(() => {
  //       setIsMarathonBtnShown(true);
  //     }, 15000);
  //   }
  // };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isBackdropShown) {
        hideBackdrop();
      }
    };

    const getLastFeedback = async () => {
      try {
        const userToSet = await axios.get(`/speakingusers/65df40854f921c8f9f40fc73`);
        console.log(258, userToSet);
        setCurrentStudentChart(user => (user = userToSet.data));
        console.log('eff');
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(isLoading => (isLoading = false));
      }
    };
    getLastFeedback();
    // toggleTooltipTimeout();
    // toggleLangTooltipTimeout();
    // toggleMarathonButtonTimeout();

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isBackdropShown, user.id]);

  return (
    <>
      <PanelBackdropTrial
        onClick={hideBackdrop}
        className={isBackdropShown ? '' : 'hidden'}
      />
      {/* <PlatformDataConcealer /> */}
      <PanelHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxShown ? <PanelHideRightSwitch /> : <PanelHideLeftSwitch />}
      </PanelHideSwitch>
      {/* {isMarathonBtnShown && (
        <IframeMarathonLinkPanel>
          <IframeMarathonText>
            <IframeMarathonPointerText>
              Натисніть на цю кнопку, щоб перейти до марафону
            </IframeMarathonPointerText>
            <IframeMarathonPointerLinkIcon />
          </IframeMarathonText>
          <APPanelMarathonBtn
            id="marathon-btn"
            onClick={() => {
              setIsMarathonBtnShown(false);
              setIsMarathonBtnClicked(true);
              setPlatformIframeLink(marathonLink + ' ');
            }}
          >
            <APPanelMarathonBtnText>МАРАФОН</APPanelMarathonBtnText>
          </APPanelMarathonBtn>
        </IframeMarathonLinkPanel>
      )} */}
      <APPanelTrial className={isButtonBoxShown ? '' : 'hidden'}>
        {/* {isMultipleLanguages && (
          <IframeResetLinkButton className={isMultipleLanguages ? 'multiple' : ''}>
            <APPanelToggleBtn
              id="toggle-btn"
              onMouseEnter={e => toggleTooltip(e)}
              onMouseOut={e => toggleTooltip(e)}
              onClick={() => {
                console.log(link);
                setLanguage(
                  language =>
                    (language =
                      languageIndex + 1 < user.lang.split('/').length
                        ? user.lang.split('/')[languageIndex + 1]
                        : user.lang.split('/')[0])
                );
                setLanguageIndex(
                  index =>
                    (index = index + 1 < user.lang.split('/').length ? index + 1 : 0)
                );
              }}
            >
              <LangIcon
                src={language.includes('de') ? de : language.includes('pl') ? pl : en}
              />
            </APPanelToggleBtn>
          </IframeResetLinkButton>)} 
        */}
        <APPanelBtn
          onClick={toggleSearch}
          onMouseEnter={e => toggleTooltip(e)}
          onMouseOut={e => toggleTooltip(e)}
        >
          <SearchBtnIcon id="search-btn" className={isLessonFinderShown && 'active'} />
        </APPanelBtn>
        {user.package !== 'online' && (
          <APPanelBtn
            onClick={toggleRating}
            onMouseEnter={e => toggleTooltip(e)}
            onMouseOut={e => toggleTooltip(e)}
          >
            <CupBtnIcon id="rating-btn" className={isRatingShown && 'active'} />
          </APPanelBtn>
        )}
        {user.package !== 'online' && (
          <APPanelBtn
            onClick={toggleFeedback}
            onMouseEnter={e => toggleTooltip(e)}
            onMouseOut={e => toggleTooltip(e)}
          >
            <FeedbackBtnIcon id="feedback-btn" className={isFeedbackShown && 'active'} />
          </APPanelBtn>
        )}
        {user.package !== 'online' && (
          <APPanelBtn
            onClick={toggleCalendar}
            onMouseEnter={e => toggleTooltip(e)}
            onMouseOut={e => toggleTooltip(e)}
          >
            <CalendarBtnIcon id="calendar-btn" className={isCalendarShown && 'active'} />
          </APPanelBtn>
        )}
        {user.package !== 'online' && (
          <APPanelBtn
            onClick={toggleTimetable}
            onMouseEnter={e => toggleTooltip(e)}
            onMouseOut={e => toggleTooltip(e)}
          >
            <TimetableBtnIcon
              className={isTimetableShown && 'active'}
              id="timetable-btn"
            />
          </APPanelBtn>
        )}
        {/* <APPanelInstructionsPanel>
          <APPanelBtn onClick={toggleSearch}>
            <GuideBtnIcon className={isLessonFinderShown && 'active'} />
          </APPanelBtn>
        </APPanelInstructionsPanel> */}
      </APPanelTrial>
      {isLessonFinderShown && (
        <LessonFinderPl
          lessons={lessons}
          user={user}
          language={language}
          setPlatformIframeLink={setPlatformIframeLink}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
      {isRatingShown && (
        <PointsPl
          user={user}
          flatPoints={points}
          flatMonthlyPoints={montlyPoints}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
      {console.log(353, timetable)}
      {console.log(
        354,
        timetable.map(lesson => lesson.day)
      )}
      {isCalendarShown && (
        <AttendanceTrialPl
          user={user}
          personalLessonsDays={timetable.map(lesson => lesson.day)}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
      {isFeedbackShown && (
        <MyAPStudentChartPl
          currentStudentChart={currentStudentChart}
          location={location}
        />
      )}
      {isTimetableShown && (
        <TimetablePl
          user={user}
          language={language}
          timetable={timetable}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
    </>
  );
};
