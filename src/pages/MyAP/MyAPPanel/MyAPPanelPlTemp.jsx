import axios from 'axios';
import { MyAPStudentChartTrial } from 'pages/TeacherPage/StudentChart/MyAPStudentChartTrial';
import { useEffect, useState } from 'react';
import { AttendanceTrial } from '../Attendance/AttendanceTrial';
import { LessonFinderTrial } from '../LessonFinder/LessonFinderTrial';
import { PointsTrial } from '../Points/PointsTrial';
import { TimetableTrial } from '../Timetable/TimetableTrial';
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

export const MyAPPanelPlTemp = ({
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
    e.currentTarget.classList.toggle('tooltip-open');
  };

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
      }
    };
    getLastFeedback();

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
      <PanelHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxShown ? <PanelHideRightSwitch /> : <PanelHideLeftSwitch />}
      </PanelHideSwitch>
      <APPanelTrial className={isButtonBoxShown ? '' : 'hidden'}>
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
        <LessonFinderTrial
          lessons={lessons}
          user={user}
          language={language}
          setPlatformIframeLink={setPlatformIframeLink}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
      {isRatingShown && (
        <PointsTrial
          user={user}
          flatPoints={points}
          flatMonthlyPoints={montlyPoints}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
      {console.log(353, timetable)}
      {isCalendarShown && (
        <AttendanceTrial
          user={user}
          personalLessonsDays={
            location.includes('polski')
              ? timetable
                  .find(table => table.lang === 'pl' && table.level === 'a2')
                  .schedule.map(lesson => lesson.day)
              : location.includes('deutsch-a1')
              ? timetable
                  .find(table => table.lang === 'de' && table.level === 'a1')
                  .schedule.map(lesson => lesson.day)
              : location.includes('deutsch-a2')
              ? timetable
                  .find(table => table.lang === 'de' && table.level === 'a2')
                  .schedule.map(lesson => lesson.day)
              : location.includes('dekids')
              ? timetable
                  .find(table => table.lang === 'dekids' && table.level === 'a2')
                  .schedule.map(lesson => lesson.day)
              : location.includes('a2free')
              ? timetable
                  .find(table => table.lang === 'en' && table.level === 'a2')
                  .schedule.map(lesson => lesson.day)
              : location.includes('a1free')
              ? timetable
                  .find(table => table.lang === 'en' && table.level === 'a1')
                  .schedule.map(lesson => lesson.day)
              : timetable
                  .find(table => table.lang === 'en' && table.level === 'a1')
                  .schedule.map(lesson => lesson.day)
          }
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
      {isFeedbackShown && (
        <MyAPStudentChartTrial
          currentStudentChart={currentStudentChart}
          location={location}
        />
      )}
      {isTimetableShown && (
        <TimetableTrial
          user={user}
          language={language}
          timetable={timetable}
          isMultipleLanguages={isMultipleLanguages}
        />
      )}
    </>
  );
};
