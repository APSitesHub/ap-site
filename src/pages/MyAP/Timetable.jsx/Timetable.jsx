import {
  TimetableBody,
  TimetableBox,
  TimetableDay,
  TimetableDays,
  TimetableDaysItem,
  TimetableDayTime,
  TimetableHeading,
  TimetableIcon,
  TimetableLessonLink,
  TimetableLessonLinkText,
  TimetableLessonType,
  TimetableSpeakings,
  TimetableWebinars,
} from './Timetable.styled';

export const Timetable = ({ user, timetable }) => {
  console.log(timetable);
  const personalTimetable = timetable.find(
    timeline => timeline.lang === user.lang && timeline.level === user.knowledge
  );

  const getLink = () => {
    const baseStreamUrl = 'https://ap.education/streams/';
    const baseKidsStreamUrl = 'https://ap.education/streams-kids/';
    console.log(user.lang);
    console.log(user.adult === undefined ? true : user.adult);
    console.log(user.knowledge);
    console.log(user.package === undefined ? 'vippro' : user.package);
    return user.lang === 'en'
      ? baseStreamUrl + user.knowledge
      : user.lang === 'enkids'
      ? baseKidsStreamUrl + user.knowledge
      : user.lang === 'de' && user.knowledge !== 'a1'
      ? baseStreamUrl + 'deutsch' + user.knowledge
      : user.lang === 'de' && user.knowledge === 'a1'
      ? baseStreamUrl + 'deutsch'
      : user.lang === 'pl' && user.knowledge !== 'a1'
      ? baseStreamUrl + 'polski' + user.knowledge
      : user.lang === 'pl' && user.knowledge === 'a1'
      ? baseStreamUrl + 'polski' + user.knowledge
      : baseStreamUrl;
  };
  console.log(getLink());
  const link = getLink();

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
          <TimetableLessonLink href={link} target="_blank">
            <TimetableLessonLinkText>Перейти</TimetableLessonLinkText>
          </TimetableLessonLink>
          <TimetableDays>
            {personalTimetable.schedule
              .filter(lesson => lesson.type === 'webinar')
              .map((lesson, i) => (
                <TimetableDaysItem
                  key={i}
                  style={
                    lesson.day === new Date().getDay()
                      ? { backgroundColor: '#F9C838' }
                      : {}
                  }
                >
                  <TimetableDay>{DAYS[lesson.day - 1]}</TimetableDay>
                  <TimetableDayTime>{lesson.time}</TimetableDayTime>
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
                <TimetableDaysItem
                  key={i}
                  style={
                    lesson.day === new Date().getDay()
                      ? { backgroundColor: '#F9C838' }
                      : {}
                  }
                >
                  <TimetableDay>{DAYS[lesson.day - 1]}</TimetableDay>
                  <TimetableDayTime>{lesson.time}</TimetableDayTime>
                </TimetableDaysItem>
              ))}
          </TimetableDays>
        </TimetableSpeakings>
      </TimetableBody>
    </TimetableBox>
  );
};
