import { BoxSchool } from 'components/Box/Box.styled';
import { useEffect, useState } from 'react';
import { VideoModal } from 'components/AboutUs/VideoModal/VideoModal';
import {
  PlayerLimiterNew,
  SectionDescription,
  SectionTitleNew,
  TitleBox,
  Video,
  WhoAreWeItem,
  WhoAreWeList,
  WhoAreWePointer,
  WhoAreWeTrigger,
} from 'components/HowItWorks/HowItWorks.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useInView } from 'react-intersection-observer';
import { APCoursesSection, APCoursesWrapper } from './APCourses.styled';

export const APCourses = () => {
  const listItems = [
    'наші курси',
    'платформа',
    'програма навчання',
    'мотивація',
  ];
  const videoUrls = [
    'https://youtu.be/j8gfGGHPpUs?si=JfXvX32loeMr97Fm?t=13',
    'https://youtu.be/j8gfGGHPpUs?si=JfXvX32loeMr97Fm?t=74',
    'https://youtu.be/j8gfGGHPpUs?si=JfXvX32loeMr97Fm?t=105',
    'https://youtu.be/j8gfGGHPpUs?si=JfXvX32loeMr97Fm?t=117',
  ];

  const [videoRef, videoInView] = useInView();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTimeCode, setActiveTimeCode] = useState(
    'https://youtu.be/j8gfGGHPpUs?si=JfXvX32loeMr97Fm'
  );
  const [topPosition, setTopPosition] = useState('0%');

  const toggleVideoModal = () => {
    setIsVideoModalOpen(isOpen => !isOpen);
    if (!document.body.style.overflowY) {
      document.body.style.overflowY = 'hidden';
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(isOpen => (isOpen = false));
    !document.body.style.overflowY && isVideoModalOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isVideoModalOpen) {
        closeVideoModal();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  const calculatePointerPosition = i => {
    setTopPosition(topPosition => (topPosition = `${i * 100}%`));
  };

  return (
    <APCoursesSection id="courses">
      <BoxSchool>
        <APCoursesWrapper>
          <TitleBox>
            <SectionTitleNew>Мовні курси</SectionTitleNew>
            <SectionDescription>
              А якщо ми скажемо, що тобі потрібний лише рік, щоб вивчити
              іноземну мову до рівня B2? У цьому відео ми розкажемо, що для
              цього потрібно.
            </SectionDescription>
          </TitleBox>
          <WhoAreWeList>
            <WhoAreWePointer
              style={{ transform: `translateY(${topPosition})` }}
            />
            {listItems.map((item, i) => (
              <WhoAreWeItem key={i}>
                <WhoAreWeTrigger
                  onClick={() => {
                    calculatePointerPosition(i);
                    setActiveTimeCode(i);
                    toggleVideoModal();
                  }}
                >
                  {item}
                </WhoAreWeTrigger>
              </WhoAreWeItem>
            ))}
          </WhoAreWeList>
        </APCoursesWrapper>
        <PlayerLimiterNew
          ref={videoRef}
          onClick={toggleVideoModal}
          id="howitworks-anchor"
        >
          <MarqueeSoundBtn />
          <Video
            loop
            controls={false}
            autoplay={videoInView ? 'true' : 'false'}
            playsInline
            muted={true}
          >
            <source
              src="https://ap.education/static/video/trailers/new-home/apcourses.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/new-home/apcourses.mp4"
              type="video/mp4"
            />
          </Video>
        </PlayerLimiterNew>
      </BoxSchool>
      {isVideoModalOpen && (
        <VideoModal
          closeVideoModal={closeVideoModal}
          url={videoUrls[activeTimeCode] || activeTimeCode}
        />
      )}
    </APCoursesSection>
  );
};
