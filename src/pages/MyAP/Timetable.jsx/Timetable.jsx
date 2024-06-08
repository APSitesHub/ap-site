import {
  TimetableBody,
  TimetableBox,
  TimetableDay,
  TimetableDays,
  TimetableDaysItem,
  TimetableHeading,
  TimetableIcon,
  TimetableLessonLink,
  TimetableLessonLinkText,
  TimetableLessonType,
  TimetableSpeakings,
  TimetableWebinars,
} from './Timetable.styled';

export const Timetable = ({ user, timetable }) => {
  const personalTimetable = timetable.find(
    timeline => timeline.lang === user.lang && timeline.level === user.knowledge
  );

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  return (
    <TimetableBox>
      <TimetableHeading>
        <TimetableIcon />
        Графік занять
      </TimetableHeading>
      <TimetableBody>
        <TimetableWebinars>
          <TimetableLessonType>Вебінари</TimetableLessonType>
          <TimetableLessonLink
            href="https://www.ap.education/streams/a1"
            target="_blank"
          >
            <TimetableLessonLinkText>Перейти</TimetableLessonLinkText>
          </TimetableLessonLink>
          <TimetableDays>
            {personalTimetable.schedule
              .filter(lesson => lesson.type === 'webinar')
              .map((lesson, i) => (
                <TimetableDaysItem key={i} style={lesson.day === new Date().getDay() ? { backgroundColor: '#F9C838'} : {}}>
                  <TimetableDay>{DAYS[lesson.day - 1]}</TimetableDay>
                  <TimetableDay>{lesson.time}</TimetableDay>
                </TimetableDaysItem>
              ))}
          </TimetableDays>
        </TimetableWebinars>{' '}
        <TimetableSpeakings>
          <TimetableLessonType>Мовні практики</TimetableLessonType>
          <TimetableLessonLink
            href="https://www.ap.education/streams/a1-sc"
            target="_blank"
          >
            <TimetableLessonLinkText>Перейти</TimetableLessonLinkText>
          </TimetableLessonLink>
          <TimetableDays>
            {personalTimetable.schedule
              .filter(lesson => lesson.type === 'speaking')
              .map((lesson, i) => (
                <TimetableDaysItem key={i} style={lesson.day === new Date().getDay() ? { backgroundColor: '#F9C838'} : {}}>
                  <TimetableDay>{DAYS[lesson.day - 1]}</TimetableDay>
                  <TimetableDay>{lesson.time}</TimetableDay>
                </TimetableDaysItem>
              ))}
          </TimetableDays>
        </TimetableSpeakings>
      </TimetableBody>
    </TimetableBox>
  );
};
