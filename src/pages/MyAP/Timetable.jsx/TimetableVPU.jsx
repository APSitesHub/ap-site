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
  TimetableChangeCourseBtnText,
  TimetableChangeCourseBtnVPU,
  TimetableDaysCell,
  TimetableDaysItem,
  TimetableHead,
  TimetableHeading,
  TimetableLessonLinkText,
  TimetableLessonLinkVPU,
  TimetableLessonPlTypeVPU,
  TimetableTable,
  TimetableWebinars,
  TimetableWebinarsHead
} from './Timetable.styled';

export const TimetableVPU = ({ user, language, timetable, isMultipleCourses }) => {
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

  const DAYS = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'];

  return (
    <TimetableBox style={{ top: '145px' }}>
      <TimetableHeading>
        <CalendarIcon />
        Harmonogram zajęć
        <TimetableChangeCourseBtnVPU onClick={changeTimetable}>
          <TimetableChangeCourseBtnText>Zmienić kurs</TimetableChangeCourseBtnText>
        </TimetableChangeCourseBtnVPU>
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
              <TimetableLessonPlTypeVPU className={isAnimated ? 'animated' : undefined}>
                {course === 'logistics' ? 'Logistics' : 'Preparation Course'}
              </TimetableLessonPlTypeVPU>
              <TimetableLessonLinkVPU href={link} target="_blank">
                <TimetableLessonLinkText>Przejść do</TimetableLessonLinkText>
              </TimetableLessonLinkVPU>
            </TimetableWebinarsHead>
            <TimetableTable>
              <thead>
                <tr>
                  <TimetableHead className="day">Dzień</TimetableHead>
                  <TimetableHead className="time">Czas</TimetableHead>
                  <TimetableHead className="lessonNumber">№ lekcja</TimetableHead>
                  <TimetableHead className="teacher">Przedmiot</TimetableHead>
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
