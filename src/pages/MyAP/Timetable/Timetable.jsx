import eyesImg from '../../../img/quiz/eyes.png';
import holidayImg from '../../../img/quiz/holiday.png';
import de from '../../../img/svg/myap/langs/de.png';
import en from '../../../img/svg/myap/langs/en.png';
import pl from '../../../img/svg/myap/langs/pl.png';
import { CalendarIcon } from '../Attendance/Attendance.styled';
import { LangIcon } from '../MyAPPanel/MyAPPanel.styled';
import {
  EyesEmoji,
  PointsPlaceHolder,
  PointsPlaceHolderText,
} from '../Points/Points.styled';
import {
  TimetableBody,
  TimetableBox,
  TimetableChangeCourseBox,
  TimetableChangeCourseBtn,
  TimetableCourseMemo,
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

export const Timetable = ({
  user,
  course,
  language,
  timetable,
  setCourse,
  courseIndex,
  setCourseIndex,
  isMultipleCourses,
  isMultipleLanguages,
}) => {
  // const userPackage = useRef(user.package === undefined ? 'pro' : user.package);
  const personalTimetable = timetable.find(timeline =>
    language === 'enkids' && user.knowledge.includes('beginner')
      ? timeline.lang === language &&
        timeline.course === course &&
        timeline.level === user.knowledge
      : timeline.lang === language && timeline.course === course
  );

  console.log('personalTimetable', personalTimetable);

  // const getRoomId = roomLevel => {
  //   const roomMapping = {
  //     b2: '2505c0a8-9136-4c13-8a5d-272a33a2d87b',
  //   };

  //   return roomMapping[roomLevel] || null;
  // };

  const getLink = () => {
    // const roomId = getRoomId(personalTimetable?.level);

    // if (roomId) {
    //   return `https://academy.ap.education/room/stream/${personalTimetable?.level}/${roomId}`;
    // }

    const baseStreamUrl = 'https://academy.ap.education/streams/';
    const baseKidsStreamUrl = 'https://academy.ap.education/streams-kids/';

    return language === 'en' && personalTimetable?.course.includes('_1')
      ? baseStreamUrl + personalTimetable?.level.replace('_1', '')
      : language === 'en'
      ? baseStreamUrl + personalTimetable?.level
      : language === 'enkids' && personalTimetable?.course.includes('high')
      ? baseKidsStreamUrl + 'high'
      : language === 'enkids'
      ? baseKidsStreamUrl + personalTimetable?.level
      : language === 'de' && personalTimetable?.course.includes('_1')
      ? baseStreamUrl + 'deutsch' + personalTimetable?.level.replace('_1', '')
      : language === 'de' && personalTimetable?.level.includes('b2')
      ? baseStreamUrl + 'deutschb2'
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
    return language === 'en' && personalTimetable?.course.includes('_1')
      ? baseStreamUrl + personalTimetable?.level.replace('_1', '') + 'sc'
      : language === 'en'
      ? baseStreamUrl + personalTimetable?.level + 'sc'
      : language === 'de' && personalTimetable?.course.includes('_1')
      ? baseStreamUrl + 'de' + personalTimetable?.level.replace('_1', '') + 'sc'
      : language === 'enkids' && personalTimetable?.course.includes('high')
      ? baseKidsStreamUrl + 'highsc'
      : language === 'enkids'
      ? baseKidsStreamUrl + personalTimetable?.level + 'sc'
      : language.includes('kids')
      ? baseKidsStreamUrl + language.replace('kids', '') + personalTimetable?.level + 'sc'
      : baseStreamUrl + language + personalTimetable?.level + 'sc';
  };

  const link = getLink();
  const speakingLink = getSpeakingLink();

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <TimetableBox style={{ top: '145px' }}>
      <TimetableHeading>
        <CalendarIcon />
        Графік занять
      </TimetableHeading>
      {isMultipleCourses && !isMultipleLanguages && (
        <TimetableChangeCourseBox>
          <TimetableCourseMemo>
            <LangIcon
              src={language.includes('de') ? de : language.includes('pl') ? pl : en}
            />
            {personalTimetable?.level === 'b2_1' && language === 'de'
              ? 'B2 ранкові'
              : personalTimetable?.level === 'b2' && language === 'de'
              ? 'B2 вечірні'
              : personalTimetable?.level}
          </TimetableCourseMemo>
          <TimetableChangeCourseBtn
            className="my-ap-change-course"
            onClick={() => {
              setCourse(
                course =>
                  (course =
                    courseIndex + 1 < user.course.split('/').length
                      ? user.course.split('/')[courseIndex + 1]
                      : user.course.split('/')[0])
              );
              setCourseIndex(
                index =>
                  (index = index + 1 < user.course.split('/').length ? index + 1 : 0)
              );
            }}
          >
            <TimetableLessonLinkText className="my-ap-change-course">
              Змінити курс
            </TimetableLessonLinkText>
          </TimetableChangeCourseBtn>
        </TimetableChangeCourseBox>
      )}
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
      ) : personalTimetable.isHoliday ? (
        <PointsPlaceHolder>
          <EyesEmoji src={holidayImg} alt="Holiday emoji" width="80" />
          <PointsPlaceHolderText>
            Сьогодні у вас канікули!
          </PointsPlaceHolderText>
          <PointsPlaceHolderText>
            Слідкуйте за оновленнями розкладу у нашому Telegram-каналі, або зверніться до вашого менеджера, щоб не пропустити нові заняття!
          </PointsPlaceHolderText>
        </PointsPlaceHolder>
      ) : (
        <>
          <TimetableBody>
            {(!user.package.includes('sc') ||
              (isMultipleLanguages && !user.package.includes(`${language}_sc`))) && (
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
                          lesson.type === 'webinar' || lesson.type === 'webinar, repeat'
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
              </TimetableWebinars>
            )}
            {!user.package.match(/(?<=\d)t/) && (
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
            )}
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
        </>
      )}
    </TimetableBox>
  );
};
