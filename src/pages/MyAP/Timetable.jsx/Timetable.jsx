import { CalendarIcon } from '../Attendance/Attendance.styled';
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

export const Timetable = ({ user, language, timetable, isMultipleCourses }) => {
  const personalTimetable = timetable.find(timeline =>
    language === 'enkids'
      ? timeline.lang === language &&
        timeline.course === user.course &&
        timeline.level === user.knowledge
      : timeline.lang === language && timeline.course === user.course
  );

  const getLink = () => {
    const baseStreamUrl = 'https://ap.education/streams/';
    const baseKidsStreamUrl = 'https://ap.education/streams-kids/';
    console.log(user.lang);
    console.log(language);
    console.log(user.adult === undefined ? true : user.adult);
    console.log(user.knowledge);
    console.log(user.package === undefined ? 'vippro' : user.package);
    return language === 'en'
      ? baseStreamUrl + personalTimetable.level
      : language === 'enkids'
      ? baseKidsStreamUrl + personalTimetable.level
      : language === 'de' && personalTimetable.level !== 'a1'
      ? baseStreamUrl + 'deutsch' + personalTimetable.level
      : language === 'de' && personalTimetable.level === 'a1'
      ? baseStreamUrl + 'deutsch'
      : language === 'pl' && personalTimetable.level !== 'a1'
      ? baseStreamUrl + 'polski' + personalTimetable.level
      : language === 'pl' && personalTimetable.level === 'a1'
      ? baseStreamUrl + 'polski' + personalTimetable.level
      : baseStreamUrl;
  };
  const getSpeakingLink = () => {
    const baseStreamUrl = 'https://ap.education/streams/';
    const baseKidsStreamUrl = 'https://ap.education/streams-kids/';
    return language === 'en'
      ? baseStreamUrl + personalTimetable.level + 'sc'
      : language === 'enkids'
      ? baseKidsStreamUrl + personalTimetable.level + 'sc'
      : baseStreamUrl + language + personalTimetable.level + 'sc';
  };

  const panelStyles = () => {
    return {
      top: isMultipleCourses ? '184px' : '142px',
    };
  };

  const link = getLink();
  const speakingLink = getSpeakingLink();

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <TimetableBox style={{ ...panelStyles() }}>
      <TimetableHeading>
        <CalendarIcon />
        Графік занять
      </TimetableHeading>
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
                <TimetableHead className="lessonNumber">№ уроку</TimetableHead>
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
                <TimetableHead className="lessonNumber">№ уроку</TimetableHead>
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
      </TimetableBody>
    </TimetableBox>
  );
};
