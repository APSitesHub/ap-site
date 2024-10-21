import { useRef } from 'react';
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
  TimetableDaysCell,
  TimetableDaysItem,
  TimetableHead,
  TimetableHeading,
  TimetableLessonLink,
  TimetableLessonLinkText,
  TimetableLessonType,
  TimetableSpeakings,
  TimetableTable,
  TimetableWebinars,
  TimetableWebinarsHead,
} from './Timetable.styled';

// const PACKAGEARRAY = [
//   'online',
//   'simple',
//   'student',
//   'basic',
//   'standart',
//   'pro',
// ];

export const Timetable = ({ user, language, timetable, isMultipleCourses }) => {
  const userPackage = useRef(user.package === undefined ? 'pro' : user.package);
  const personalTimetable = timetable.find(timeline =>
    language === 'enkids' && user.knowledge.includes('beginner')
      ? timeline.lang === language &&
        timeline.course === user.course &&
        timeline.level === user.knowledge
      : timeline.lang === language && timeline.course === user.course
  );

  const getLink = () => {
    const baseStreamUrl = 'https://academy.ap.education/streams/';
    const baseKidsStreamUrl = 'https://academy.ap.education/streams-kids/';
    console.log(user.lang);
    console.log(language);
    console.log(user.adult === undefined ? true : user.adult);
    console.log(user.knowledge);
    console.log(user.package === undefined ? 'student' : user.package);
    console.log(userPackage.current);

    return language === 'en'
      ? baseStreamUrl + personalTimetable?.level
      : language === 'enkids'
      ? baseKidsStreamUrl + personalTimetable?.level
      : language === 'de' && personalTimetable?.level !== 'a1'
      ? baseStreamUrl + 'deutsch' + personalTimetable?.level
      : language === 'de' && personalTimetable?.level === 'a1'
      ? baseStreamUrl + 'deutsch'
      : language === 'dekids'
      ? baseKidsStreamUrl + 'de' + personalTimetable?.level
      : language === 'pl' && personalTimetable?.level !== 'a1'
      ? baseStreamUrl + 'polski' + personalTimetable?.level
      : language === 'pl' && personalTimetable?.level === 'a1'
      ? baseStreamUrl + 'polski'
      : language === 'plkids'
      ? baseKidsStreamUrl + 'pl' + personalTimetable?.level
      : baseStreamUrl;
  };
  const getSpeakingLink = () => {
    const baseStreamUrl = 'https://academy.ap.education/streams/';
    const baseKidsStreamUrl = 'https://academy.ap.education/streams-kids/';
    return language === 'en'
      ? baseStreamUrl + personalTimetable?.level + 'sc'
      : language === 'enkids'
      ? baseKidsStreamUrl + personalTimetable?.level + 'sc'
      : baseStreamUrl + language + personalTimetable?.level + 'sc';
  };
  const getIndividualLink = () => {
    const enUrl = 'https://n1313568.alteg.io';
    const enKidsUrl = 'https://n1313571.alteg.io/';
    const deUrl = 'https://n1313569.alteg.io';
    const deKidsUrl = 'https://n1313572.alteg.io/';
    const plUrl = 'https://n1313570.alteg.io';
    const plKidsUrl = 'https://n1313573.alteg.io/';
    return language === 'en'
      ? enUrl
      : language === 'enkids'
      ? enKidsUrl
      : language === 'de'
      ? deUrl
      : language === 'dekids'
      ? deKidsUrl
      : language === 'pl'
      ? plUrl
      : language === 'plkids'
      ? plKidsUrl
      : enUrl;
  };

  const panelStyles = () => {
    return {
      top: isMultipleCourses ? '184px' : '142px',
    };
  };

  const link = getLink();
  const indLink = getIndividualLink();
  console.log(indLink);
  const speakingLink = getSpeakingLink();

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <TimetableBox style={{ ...panelStyles() }}>
      <TimetableHeading>
        <CalendarIcon />
        Графік занять
      </TimetableHeading>
      {!personalTimetable ? (
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
              <TimetableLessonType>Теоретичні заняття</TimetableLessonType>
              <TimetableLessonLink href={link} target="_blank">
                <TimetableLessonLinkText>Перейти</TimetableLessonLinkText>
              </TimetableLessonLink>
            </TimetableWebinarsHead>
            <TimetableTable>
              <thead>
                <tr>
                  <TimetableHead className="day">День</TimetableHead>
                  <TimetableHead className="time">Час</TimetableHead>
                  <TimetableHead className="lessonNumber">
                    № уроку
                  </TimetableHead>
                  <TimetableHead className="teacher">Викладач</TimetableHead>
                </tr>
              </thead>
              <tbody>
                {personalTimetable.schedule
                  .filter(
                    lesson =>
                      lesson.type === 'webinar' ||
                      lesson.type === 'webinar, repeat'
                  )
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
                        {lesson.teacher}
                      </TimetableDaysCell>
                    </TimetableDaysItem>
                  ))}
              </tbody>
            </TimetableTable>
          </TimetableWebinars>{' '}
          <TimetableSpeakings>
            <TimetableWebinarsHead>
              <TimetableLessonType>Практичні заняття</TimetableLessonType>
              <TimetableLessonLink href={speakingLink} target="_blank">
                <TimetableLessonLinkText>Перейти</TimetableLessonLinkText>
              </TimetableLessonLink>
            </TimetableWebinarsHead>
            <TimetableTable>
              <thead>
                <tr>
                  <TimetableHead className="day">День</TimetableHead>
                  <TimetableHead className="time">Час</TimetableHead>
                  <TimetableHead className="lessonNumber">
                    № уроку
                  </TimetableHead>
                  <TimetableHead className="teacher">Викладач</TimetableHead>
                </tr>
              </thead>
              <tbody>
                {personalTimetable.schedule
                  .filter(lesson => lesson.type === 'speaking')
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
                        {lesson.teacher}
                      </TimetableDaysCell>
                    </TimetableDaysItem>
                  ))}
              </tbody>
            </TimetableTable>
          </TimetableSpeakings>
          {/* {userPackage.current !== 'simple' && userPackage.current !== 'student' && (
            <TimetableSpeakings>
              <TimetableWebinarsHead>
                <TimetableLessonType>Індивідуальні заняття</TimetableLessonType>
                <TimetableLessonLink href={indLink} target="_blank">
                  <TimetableLessonLinkText>Перейти</TimetableLessonLinkText>
                </TimetableLessonLink>
              </TimetableWebinarsHead>
            </TimetableSpeakings>
          )} */}
        </TimetableBody>
      )}
    </TimetableBox>
  );
};
