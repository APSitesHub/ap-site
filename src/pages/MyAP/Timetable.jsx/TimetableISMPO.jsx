import { useState } from 'react';
import eyesImg from '../../../img/quiz/eyes.png';
import { CalendarIcon } from '../Attendance/Attendance.styled';
import {
  EyesEmoji,
  PointsPlaceHolder,
  PointsPlaceHolderText,
} from '../Points/Points.styled';
import {
  TimetableBody,
  TimetableBox,
  TimetableChangeCourseBtnISMPO,
  TimetableChangeCourseBtnText,
  TimetableDaysCell,
  TimetableDaysItem,
  TimetableHead,
  TimetableHeading,
  TimetableLessonLinkISMPO,
  TimetableLessonLinkText,
  TimetableLessonPlTypeISMPO,
  TimetableTable,
  TimetableWebinars,
  TimetableWebinarsHead
} from './Timetable.styled';

export const TimetableISMPO = ({ user, language, timetable, isMultipleCourses }) => {
  const [course, setCourse] = useState('logistics');
  const [isAnimated, setIsAnimated] = useState(false);

  const changeTimetable = () => {
    setIsAnimated(true);
    setCourse(course => (course === 'logistics' ? 'prep' : 'logistics'));
    setTimeout(() => {
      setIsAnimated(false);
    }, 3000);
  };

  const getLink = () => {
    const baseStreamUrl = 'https://academy.ap.education/streams/';

    return baseStreamUrl + 'polskia0_2';
  };

  const link = getLink();

  const DAYS = ['Pon', 'Uto', 'Str', 'Štv', 'Pia', 'Sob', 'Ned'];

  return (
    <TimetableBox style={{ top: '145px' }}>
      <TimetableHeading>
        <CalendarIcon />
        Rozvrh hodín
        <TimetableChangeCourseBtnISMPO onClick={changeTimetable}>
          <TimetableChangeCourseBtnText>Zmeniť kurz</TimetableChangeCourseBtnText>
        </TimetableChangeCourseBtnISMPO>
      </TimetableHeading>
      {!timetable ? (
        <PointsPlaceHolder>
          <EyesEmoji src={eyesImg} alt="Eyes emoji" width="80" />
          <PointsPlaceHolderText>
            Здається, у вас ще немає розкладу!
          </PointsPlaceHolderText>
          <PointsPlaceHolderText>
            Але він з'явиться, коли у вас розпочнуться заняття!
          </PointsPlaceHolderText>
        </PointsPlaceHolder>
      ) : (
        <TimetableBody>
          <TimetableWebinars>
            <TimetableWebinarsHead>
              <TimetableLessonPlTypeISMPO className={isAnimated ? 'animated' : undefined}>
                {course === 'logistics' ? 'Logistics' : 'Preparation Course'}
              </TimetableLessonPlTypeISMPO>
              <TimetableLessonLinkISMPO href={link} target="_blank">
                <TimetableLessonLinkText>Prejsť na</TimetableLessonLinkText>
              </TimetableLessonLinkISMPO>
            </TimetableWebinarsHead>
            <TimetableTable>
              <thead>
                <tr>
                  <TimetableHead className="day">Deň</TimetableHead>
                  <TimetableHead className="time">Čas</TimetableHead>
                  <TimetableHead className="lessonNumber">№ lekcia</TimetableHead>
                  <TimetableHead className="teacher">Predmet</TimetableHead>
                </tr>
              </thead>
              <tbody>
                {timetable
                  .filter(lesson => course === lesson.marathon)
                  .sort((a, b) => a.day - b.day)
                  .map((lesson, i) => (
                    <TimetableDaysItem
                      key={i}
                      style={
                        lesson.day === new Date().getDay()
                          ? { backgroundColor: '#F9C838' }
                          : {}
                      }
                    >
                      <TimetableDaysCell className="day">
                        {DAYS[lesson.day - 1]}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="time">
                        {lesson.time}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="lessonNumber">
                        {lesson.lessonNumber}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="teacher">
                        {lesson.subject}
                      </TimetableDaysCell>
                    </TimetableDaysItem>
                  ))}
              </tbody>
            </TimetableTable>
          </TimetableWebinars>{' '}
        </TimetableBody>
      )}
    </TimetableBox>
  );
};
