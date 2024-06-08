import { useState } from 'react';
import {
  KahootNumbersBtn,
  KahootPicker,
} from '../HostKahoots/HostKahoots.styled';
import { AddLessonBtn, PlatformBox } from './Platform.styled';

export const Platform = ({
  page,
  isPlatformOpen,
  isOpenedLast,
  sectionWidth,
}) => {
  const [lessons, setLessons] = useState(1);
  const [activeLesson, setActiveLesson] = useState(1);
  const [picker, setPicker] = useState([lessons]);

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
          width="100%"
          height="100%"
        ></iframe>
        {lessons > 1 && (
          <iframe
            className={activeLesson === 2 && 'active'}
            key={lessons + 1}
            id={`platform-window-${lessons}`}
            title={`platform-pin-${lessons}`}
            src="https://online.ap.education/school/"
            width="100%"
            height="100%"
          ></iframe>
        )}
        {lessons > 2 && (
          <iframe
            className={activeLesson === 3 && 'active'}
            key={lessons + 2}
            id={`platform-window-${lessons}`}
            title={`platform-pin-${lessons}`}
            src="https://online.ap.education/school/"
            width="100%"
            height="100%"
          ></iframe>
        )}
      </PlatformBox>
    </>
  );
};
