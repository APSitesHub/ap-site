import { useState } from 'react';
import {
  KahootNumbersBtn,
  KahootPicker,
} from '../HostKahoots/HostKahoots.styled';
import { PlatformBackground, PlatformBox } from './Platform.styled';

export const PlatformTrial = ({
  page,
  isPlatformOpen,
  isOpenedLast,
  sectionWidth,
}) => {
  const [activeLesson, setActiveLesson] = useState(1);

  const PLATFORM_LINKS = {
    trials: {
      links: {
        trials_1:
          'https://online.ap.education/school/marathons?marathonId=49509',
        trials_2:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=5904149&marathonId=49509&marathonLessonId=736479',
        trials_3:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6765383&marathonId=49702',
        trials_4:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=5652735&marathonId=49509&marathonLessonId=713736',
        trials_5:
          'https://online.ap.education/school/marathons?marathonId=49509',
      },
    },
    trials_kids: {
      links: {
        trials_kids_1:
          'https://online.ap.education/school/marathons?marathonId=50784',
        trials_kids_2:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=5904789&marathonId=50784&marathonLessonId=736670',
        trials_kids_3:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6671815&marathonId=49702&marathonLessonId=828172',
        trials_kids_4:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6457234&marathonId=50784&marathonLessonId=802432',
        trials_kids_5:
          'https://online.ap.education/school/marathons?marathonId=50784',
      },
    },
    trials_pl: {
      links: {
        trials_pl_1:
          'https://online.ap.education/school/marathons?marathonId=41057',
        trials_pl_2:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6774539&marathonId=49702&marathonLessonId=841761',
        trials_pl_3:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6710925&marathonId=49702&marathonLessonId=832792',
        trials_pl_4:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6657897&marathonId=41057&marathonLessonId=826643',
        trials_pl_5:
          'https://online.ap.education/school/marathons?marathonId=41057',
      },
    },
    trials_de: {
      links: {
        trials_de_1:
          'https://online.ap.education/school/marathons?marathonId=41534',
        trials_de_2:
          'https://online.ap.education/school/courses/lesson-edit?bookId=436309&lessonId=6379213',
        trials_de_3:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=6660895&marathonId=49702&marathonLessonId=827089',
        trials_de_4:
          'https://online.ap.education/school/courses/lesson-edit?lessonId=5956269&marathonId=41534&marathonLessonId=742495',
        trials_de_5:
          'https://online.ap.education/school/marathons?marathonId=41534',
      },
    },
  };

  const lessons = PLATFORM_LINKS[page].links;

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

  return (
    <>
      <PlatformBox
        className={isPlatformOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <>
          <KahootPicker>
            {Object.values(lessons).map((link, i) => (
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

          {Object.values(lessons).map((link, i) => (
            <PlatformBackground
              key={i}
              className={activeLesson === i + 1 ? 'active' : ''}
            >
              <iframe
                id={`platform-window-${i + 1}`}
                title={`platform-pin-${i + 1}`}
                src={link}
                width="100%"
                height="100%"
              ></iframe>
            </PlatformBackground>
          ))}
        </>
      </PlatformBox>
    </>
  );
};
