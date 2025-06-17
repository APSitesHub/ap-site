import axios from 'axios';
import { MyAPPanelPlMERITO } from 'pages/MyAP/MyAPPanel/MyAPPanelPlMERITO';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KahootNumbersBtn, KahootPicker } from '../HostKahoots/HostKahoots.styled';
import { AddLessonBtn, PlatformBoxTrialLesson } from './Platform.styled';

const pltimetable = [
  {
    day: 1,
    subject: 'Polish',
    lessonNumber: '1',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 2,
    subject: 'English',
    lessonNumber: '1',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 3,
    subject: 'Polish',
    lessonNumber: '2',
    time: '11:00',
    marathon: 'logistics',
  },
  {
    day: 4,
    subject: 'English',
    lessonNumber: '2',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 4,
    subject: 'Polish',
    lessonNumber: '3',
    time: '13:00',
    marathon: 'logistics',
  },
  {
    day: 5,
    subject: 'English',
    lessonNumber: '3',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 5,
    subject: 'English',
    lessonNumber: '4',
    time: '13:00',
    marathon: 'logistics',
  },
];

export const PlatformTrialLessonPl = ({
  page,
  isPlatformOpen,
  isOpenedLast,
  sectionWidth,
}) => {
  const [user, setUser] = useState({});
  const [lessons, setLessons] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [activeLesson, setActiveLesson] = useState(1);
  const [picker, setPicker] = useState([lessons]);
  const location = useLocation().pathname;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('/users/65df40854f921c8f9f40fc73');
        console.log(res);
        setUser(user => (user = res.data));
      } catch (error) {
        console.log(error);
      }
    };
    const getLessons = async () => {
      try {
        const res = await axios.get('/lessons');
        console.log(res);
        setLessons(lessons => (lessons = [...res.data]));
      } catch (error) {
        console.log(error);
      }
    };
    const getTimetable = async () => {
      try {
        const res = await axios.get('/timetable');
        console.log(res);
        setTimetable(timetable => (timetable = [...pltimetable]));
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getLessons();
    getTimetable();
  }, []);

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'platform' ? '4' : '1',
      width: (sectionWidth / 10) * 4,
    };
  };

  const setLessonNumber = async e => {
    const lessonNumber = parseInt(e.currentTarget.innerText);
    setActiveLesson(lessonNumber);
  };

  const monthly = [
    { name: 'Adam Nowak', points: 327 },
    { name: 'Bartosz Kowalski', points: 458 },
    { name: 'Cezary Wiśniewski', points: 783 },
    { name: 'Damian Wójcik', points: 604 },
    { name: 'Emil Kamiński', points: 536 },
    { name: 'Filip Lewandowski', points: 918 },
    { name: 'Grzegorz Zieliński', points: 629 },
    { name: 'Hubert Szymański', points: 705 },
    { name: 'Igor Woźniak', points: 847 },
    { name: 'Jakub Dąbrowski', points: 509 },
    { name: 'Kamil Kozłowski', points: 987 },
    { name: 'Łukasz Jankowski', points: 734 },
    { name: 'Mateusz Mazur', points: 685 },
    { name: 'Norbert Kwiatkowski', points: 595 },
    { name: 'Olaf Piotrowski', points: 819 },
    { name: 'Patryk Grabowski', points: 914 },
    { name: 'Robert Pawłowski', points: 727 },
    { name: 'Szymon Michalski', points: 664 },
    { name: 'Tomasz Król', points: 874 },
    { name: 'Uriel Wieczorek', points: 765 },
    { name: 'Wojciech Jastrzębski', points: 886 },
    { name: 'Zbigniew Tomczak', points: 547 },
    { name: 'Artur Jarosz', points: 924 },
    { name: 'Borys Malinowski', points: 586 },
    { name: 'Daniel Gajewski', points: 746 },
    { name: 'Edward Krupa', points: 618 },
    { name: 'Fryderyk Brzeziński', points: 674 },
    { name: 'Gustaw Stępień', points: 758 },
    { name: 'Henryk Wróbel', points: 879 },
    { name: 'Ireneusz Lis', points: 995 },
    { name: 'Dev Acc', points: 747 },
  ];

  const yearly = [
    { name: 'Adam Nowak', points: 2413 },
    { name: 'Bartosz Kowalski', points: 3129 },
    { name: 'Cezary Wiśniewski', points: 4217 },
    { name: 'Damian Wójcik', points: 2728 },
    { name: 'Emil Kamiński', points: 3514 },
    { name: 'Filip Lewandowski', points: 4619 },
    { name: 'Grzegorz Zieliński', points: 3012 },
    { name: 'Hubert Szymański', points: 3716 },
    { name: 'Igor Woźniak', points: 4328 },
    { name: 'Jakub Dąbrowski', points: 2915 },
    { name: 'Kamil Kozłowski', points: 4823 },
    { name: 'Łukasz Jankowski', points: 4118 },
    { name: 'Mateusz Mazur', points: 3611 },
    { name: 'Norbert Kwiatkowski', points: 2832 },
    { name: 'Olaf Piotrowski', points: 4427 },
    { name: 'Patryk Grabowski', points: 4715 },
    { name: 'Robert Pawłowski', points: 3936 },
    { name: 'Szymon Michalski', points: 3421 },
    { name: 'Tomasz Król', points: 4533 },
    { name: 'Uriel Wieczorek', points: 4029 },
    { name: 'Wojciech Jastrzębski', points: 4578 },
    { name: 'Zbigniew Tomczak', points: 3219 },
    { name: 'Artur Jarosz', points: 4832 },
    { name: 'Borys Malinowski', points: 3134 },
    { name: 'Daniel Gajewski', points: 4075 },
    { name: 'Edward Krupa', points: 2931 },
    { name: 'Fryderyk Brzeziński', points: 3562 },
    { name: 'Gustaw Stępień', points: 3971 },
    { name: 'Henryk Wróbel', points: 4526 },
    { name: 'Ireneusz Lis', points: 4918 },
    { name: 'Dev Acc', points: 3178 },
  ];

  // const monthly = [
  //   { name: 'Артем Ковальчук', points: 327 },
  //   { name: 'Богдан Петренко', points: 458 },
  //   { name: 'Віталій Шевченко', points: 783 },
  //   { name: 'Денис Мельник', points: 604 },
  //   { name: 'Єгор Савченко', points: 536 },
  //   { name: 'Федір Бондаренко', points: 918 },
  //   { name: 'Григорій Кравченко', points: 629 },
  //   { name: 'Ольга Поліщук', points: 705 },
  //   { name: 'Ігор Лисенко', points: 847 },
  //   { name: 'Марина Мороз', points: 509 },
  //   { name: 'Кирило Ткаченко', points: 987 },
  //   { name: 'Леонід Гуменюк', points: 734 },
  //   { name: 'Софія Діденко', points: 685 },
  //   { name: 'Назар Романенко', points: 595 },
  //   { name: 'Олександра Сидоренко', points: 819 },
  //   { name: 'Павло Козак', points: 914 },
  //   { name: 'Роман Павленко', points: 727 },
  //   { name: 'Анастасія Іваненко', points: 664 },
  //   { name: 'Тимур Король', points: 874 },
  //   { name: 'Устим Волошин', points: 765 },
  //   { name: 'Катерина Ященко', points: 886 },
  //   { name: 'Захар Остапчук', points: 547 },
  //   { name: 'Андрій Жуков', points: 924 },
  //   { name: 'Борис Марченко', points: 586 },
  //   { name: 'Дарина Голуб', points: 746 },
  //   { name: 'Євген Кривенко', points: 618 },
  //   { name: 'Франц Бережний', points: 674 },
  //   { name: 'Гаврило Лавріненко', points: 758 },
  //   { name: 'Гнат Вовк', points: 879 },
  //   { name: 'Ілона Сорока', points: 995 },
  //   { name: 'Dev Acc', points: 747 },
  // ];

  // const yearly = [
  //   { name: 'Артем Ковальчук', points: 2413 },
  //   { name: 'Богдан Петренко', points: 3129 },
  //   { name: 'Віталій Шевченко', points: 4217 },
  //   { name: 'Денис Мельник', points: 2728 },
  //   { name: 'Єгор Савченко', points: 3514 },
  //   { name: 'Федір Бондаренко', points: 4619 },
  //   { name: 'Григорій Кравченко', points: 3012 },
  //   { name: 'Ольга Поліщук', points: 3716 },
  //   { name: 'Ігор Лисенко', points: 4328 },
  //   { name: 'Марина Мороз', points: 2915 },
  //   { name: 'Кирило Ткаченко', points: 4823 },
  //   { name: 'Леонід Гуменюк', points: 4118 },
  //   { name: 'Софія Діденко', points: 3611 },
  //   { name: 'Назар Романенко', points: 2832 },
  //   { name: 'Олександра Сидоренко', points: 4427 },
  //   { name: 'Павло Козак', points: 4715 },
  //   { name: 'Роман Павленко', points: 3936 },
  //   { name: 'Анастасія Іваненко', points: 3421 },
  //   { name: 'Тимур Король', points: 4533 },
  //   { name: 'Устим Волошин', points: 4029 },
  //   { name: 'Катерина Ященко', points: 4578 },
  //   { name: 'Захар Остапчук', points: 3219 },
  //   { name: 'Андрій Жуков', points: 4832 },
  //   { name: 'Борис Марченко', points: 3134 },
  //   { name: 'Дарина Голуб', points: 4075 },
  //   { name: 'Євген Кривенко', points: 2931 },
  //   { name: 'Франц Бережний', points: 3562 },
  //   { name: 'Гаврило Лавріненко', points: 3971 },
  //   { name: 'Гнат Вовк', points: 4526 },
  //   { name: 'Ілона Сорока', points: 4918 },
  //   { name: 'Dev Acc', points: 3178 },
  // ];

  return (
    <>
      <PlatformBoxTrialLesson
        className={isPlatformOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <MyAPPanelPlMERITO
          lessons={lessons}
          location={location}
          user={user}
          points={yearly}
          montlyPoints={monthly}
          language={
            location.includes('polski')
              ? 'pl'
              : location.includes('de')
              ? 'de'
              : location.includes('kids')
              ? 'enkids'
              : 'en'
          }
          timetable={timetable}
        />

        {/* <PlatformWhiteboardBtn
          onClick={() => {
            setIsPlatformWhiteBoardOpen(isOpen => !isOpen);
          }}
        >
          +
        </PlatformWhiteboardBtn>

        <PlatformWhiteBoard
          page={page}
          isPlatformWhiteBoardOpen={isPlatformWhiteBoardOpen}
        /> */}

        {lessons === 1 && (
          <AddLessonBtn
            onClick={() => {
              if (page.includes('polski')) {
                setLessons(lessons => lessons + 2);
                setPicker(picker => {
                  return [...picker, lessons + 2];
                });
              }
              setLessons(lessons => lessons + 1);
              setPicker(picker => {
                return [...picker, lessons + 1];
              });
            }}
          >
            +
          </AddLessonBtn>
        )}

        {lessons > 1 && (
          <KahootPicker>
            {picker.map((link, i) => (
              <KahootNumbersBtn
                key={i}
                onClick={setLessonNumber}
                className={activeLesson === i + 1 ? 'active' : ''}
                tabIndex={-1}
              >
                {i + 1}
              </KahootNumbersBtn>
            ))}
          </KahootPicker>
        )}

        <iframe
          className={activeLesson === 1 && 'active'}
          key={lessons}
          id="platform-window"
          title="platform-pin"
          src="https://online.ap.education/school/"
          width="58.83%"
          height="58.83%"
        ></iframe>
        {lessons > 1 && (
          <iframe
            className={activeLesson === 2 && 'active'}
            key={lessons + 1}
            id={`platform-window-${lessons}`}
            title={`platform-pin-${lessons}`}
            src="https://online.ap.education/school/"
            width="58.83%"
            height="58.83%"
          ></iframe>
        )}
        {lessons > 2 && (
          <iframe
            className={activeLesson === 3 && 'active'}
            key={lessons + 2}
            id={`platform-window-${lessons}`}
            title={`platform-pin-${lessons}`}
            src="https://online.ap.education/school/"
            width="58.83%"
            height="58.83%"
          ></iframe>
        )}
      </PlatformBoxTrialLesson>
    </>
  );
};
