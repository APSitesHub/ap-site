import { VideoModal } from 'components/AboutUs/VideoModal/VideoModal';
import { BoxSchool } from 'components/Box/Box.styled';
import {
  PlayerLimiterNew,
  SectionTitleNew,
  TitleBox,
  WhoAreWeItem,
  WhoAreWeList,
  WhoAreWePointerUniversity,
  WhoAreWeTrigger,
} from 'components/HowItWorks/HowItWorks.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { APSchoolSection, APSchoolWrapper } from '../APSchool/APSchool.styled';
import { SectionDescription, Video } from './Motivation.styled';

export const MotivationUniversity = () => {
  const listItems = [
    'відповідальність',
    'техніка в подарунок',
    'платформа',
    'працевлаштування',
  ];
  const videoUrls = [
    'https://youtu.be/V-AQ49jOGX0?si=Ol2lAe80jAASPMwk?t=29',
    'https://youtu.be/V-AQ49jOGX0?si=Ol2lAe80jAASPMwk?t=46',
    'https://youtu.be/V-AQ49jOGX0?si=Ol2lAe80jAASPMwk?t=58',
    'https://youtu.be/V-AQ49jOGX0?si=Ol2lAe80jAASPMwk?t=75',
  ];

  const [videoRef, videoInView] = useInView();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTimeCode, setActiveTimeCode] = useState(
    'https://youtu.be/V-AQ49jOGX0?si=Ol2lAe80jAASPMwk'
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
    <APSchoolSection id="platform-anchor">
      <BoxSchool>
        <APSchoolWrapper>
          <TitleBox>
            <SectionTitleNew>Мотивація вчитися</SectionTitleNew>
            <SectionDescription>
              Ми знаємо, як навчати цікаво та дієво!
            </SectionDescription>
          </TitleBox>
          <WhoAreWeList>
            <WhoAreWePointerUniversity
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
        </APSchoolWrapper>
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
              src="https://ap.education/static/video/trailers/university/motivation.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/university/motivation.mp4"
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
    </APSchoolSection>
  );
};
