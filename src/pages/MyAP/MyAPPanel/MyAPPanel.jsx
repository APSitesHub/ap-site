import { useEffect, useState } from 'react';
import { Attendance } from '../Attendance/Attendance';
import { LessonFinder } from '../LessonFinder/LessonFinder';
import { Points } from '../Points/Points';
import { Timetable } from '../Timetable.jsx/Timetable';
import {
  APPanel,
  APPanelBtn,
  APPanelMarathonBtn,
  APPanelMarathonBtnText,
  CalendarBtnIcon,
  CupBtnIcon,
  IframeMarathonLinkPanel,
  IframeMarathonPointerLinkIcon,
  IframeMarathonPointerText,
  IframeMarathonText,
  PanelBackdrop,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
  PanelHideSwitch,
  SearchBtnIcon,
  TimetableBtnIcon
} from './MyAPPanel.styled';

export const MyAPPanel = ({
  lessons,
  link,
  user,
  points,
  timetable,
  marathonLink,
  montlyPoints,
  setPlatformIframeLink,
}) => {
  const [isBackdropShown, setIsBackdropShown] = useState(false);
  const [isLessonFinderShown, setIsLessonFinderShown] = useState(false);
  const [isRatingShown, setIsRatingShown] = useState(false);
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [isTimetableShown, setIsTimetableShown] = useState(false);
  const [isButtonBoxShown, setIsButtonBoxShown] = useState(true);
  // const [isDisclaimerTimeoutActive, setIsDisclaimerTimeoutActive] =
  //   useState(true);
  const [isMarathonBtnShown, setIsMarathonBtnShown] = useState(false);
  const [isMarathonBtnClicked, setIsMarathonBtnClicked] = useState(false);

  const toggleButtonBox = () => {
    hideBackdrop();
    setIsButtonBoxShown(isShown => !isShown);
  };

  const flatPoints = Object.values(points).flatMap(user => user);
  const flatMonthlyPoints = Object.values(montlyPoints).flatMap(user => user);

  const hideBackdrop = () => {
    setIsBackdropShown(false);
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(false);
  };

  const toggleSearch = () => {
    !isBackdropShown &&
      (!isRatingShown || !isCalendarShown || !isTimetableShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isCalendarShown &&
      !isTimetableShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsRatingShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(false);
    setIsLessonFinderShown(isLessonFinderShown => !isLessonFinderShown);
  };

  const toggleRating = () => {
    !isBackdropShown &&
      (!isLessonFinderShown || !isCalendarShown || !isTimetableShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isLessonFinderShown &&
      !isCalendarShown &&
      !isTimetableShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(false);
    setIsRatingShown(isRatingShown => !isRatingShown);
  };

  const toggleCalendar = () => {
    !isBackdropShown &&
      (!isRatingShown || !isLessonFinderShown || !isTimetableShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isLessonFinderShown &&
      !isTimetableShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsTimetableShown(false);
    setIsCalendarShown(isCalendarShown => !isCalendarShown);
  };

  const toggleTimetable = () => {
    !isBackdropShown &&
      (!isRatingShown || !isLessonFinderShown || !isCalendarShown) &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isRatingShown &&
      !isLessonFinderShown &&
      !isCalendarShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsLessonFinderShown(false);
    setIsRatingShown(false);
    setIsCalendarShown(false);
    setIsTimetableShown(isTimetableShown => !isTimetableShown);
  };

  // const toggleTooltip = e => {
  //   !isDisclaimerTimeoutActive &&
  //     e.currentTarget.classList.toggle('tooltip-open');
  // };

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

  const toggleMarathonButtonTimeout = () => {
    if (!isMarathonBtnClicked) {
      setTimeout(() => {
        setIsMarathonBtnShown(true);
      }, 15000);
    }
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isBackdropShown) {
        hideBackdrop();
      }
    };
    // toggleTooltipTimeout();
    toggleMarathonButtonTimeout();

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  return (
    <>
      <PanelBackdrop
        onClick={hideBackdrop}
        className={isBackdropShown ? '' : 'hidden'}
      />

      <PanelHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxShown ? <PanelHideRightSwitch /> : <PanelHideLeftSwitch />}
      </PanelHideSwitch>
      {isMarathonBtnShown && (
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
      )}
      <APPanel className={isButtonBoxShown ? '' : 'hidden'}>
        {/* <IframeResetLinkButton>
          <APPanelResetBtn
            id="reset-btn"
            onMouseEnter={e => toggleTooltip(e)}
            onMouseOut={e => toggleTooltip(e)}
            onClick={() => {
              setPlatformIframeLink(link + ' ');
            }}
          >
            <IframeSetLinkIcon />
          </APPanelResetBtn>
        </IframeResetLinkButton> */}
        <APPanelBtn onClick={toggleSearch}>
          <SearchBtnIcon className={isLessonFinderShown && 'active'} />
        </APPanelBtn>
        <APPanelBtn onClick={toggleRating}>
          <CupBtnIcon className={isRatingShown && 'active'} />
        </APPanelBtn>
        <APPanelBtn onClick={toggleCalendar}>
          <CalendarBtnIcon className={isCalendarShown && 'active'} />
        </APPanelBtn>
        <APPanelBtn onClick={toggleTimetable}>
          <TimetableBtnIcon className={isTimetableShown && 'active'} />
        </APPanelBtn>
        {/* <APPanelInstructionsPanel>
          <APPanelBtn onClick={toggleSearch}>
            <GuideBtnIcon className={isLessonFinderShown && 'active'} />
          </APPanelBtn>
        </APPanelInstructionsPanel> */}
      </APPanel>

      {isLessonFinderShown && (
        <LessonFinder
          lessons={lessons}
          user={user}
          setPlatformIframeLink={setPlatformIframeLink}
        />
      )}
      {isRatingShown && (
        <Points
          user={user}
          flatPoints={flatPoints}
          flatMonthlyPoints={flatMonthlyPoints}
        />
      )}
      {isCalendarShown && <Attendance user={user} />}
      {isTimetableShown && <Timetable user={user} timetable={timetable} />}
    </>
  );
};
