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
  console.log(timetable);
  const personalTimetable = timetable.find(
    timeline => timeline.lang === language && timeline.level === user.knowledge
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
      ? baseStreamUrl + user.knowledge
      : language === 'enkids'
      ? baseKidsStreamUrl + user.knowledge
      : language === 'de' && user.knowledge !== 'a1'
      ? baseStreamUrl + 'deutsch' + user.knowledge
      : language === 'de' && user.knowledge === 'a1'
      ? baseStreamUrl + 'deutsch'
      : language === 'pl' && user.knowledge !== 'a1'
      ? baseStreamUrl + 'polski' + user.knowledge
      : language === 'pl' && user.knowledge === 'a1'
      ? baseStreamUrl + 'polski' + user.knowledge
      : baseStreamUrl;
  };
  const getSpeakingLink = () => {
    const baseStreamUrl = 'https://ap.education/streams/';
    const baseKidsStreamUrl = 'https://ap.education/streams-kids/';
    return language === 'en'
      ? baseStreamUrl + user.knowledge + 'sc'
      : language === 'enkids'
      ? baseKidsStreamUrl + user.knowledge + 'sc'
      : baseStreamUrl + language + user.knowledge + 'sc';
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
