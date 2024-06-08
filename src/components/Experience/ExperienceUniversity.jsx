import { BoxNew } from 'components/Box/Box.styled';
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
  WhoAreWePointerUniversity,
  WhoAreWeTrigger,
} from 'components/HowItWorks/HowItWorks.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useInView } from 'react-intersection-observer';
import {
  APUniversitySection,
  APUniversityWrapper,
} from '../APUniversity/APUniversity.styled';

export const ExperienceUniversity = () => {
  const listItems = [
    'досягнення',
    'інновації',
    'професіонали',
    'подвійний диплом',
  ];
  const videoUrls = [
    'https://youtu.be/4VxO_0IZ7lQ?si=4SFiLQ0T3B3-QsRF?t=23',
    'https://youtu.be/4VxO_0IZ7lQ?si=4SFiLQ0T3B3-QsRF?t=36',
    'https://youtu.be/4VxO_0IZ7lQ?si=4SFiLQ0T3B3-QsRF?t=55',
    'https://youtu.be/4VxO_0IZ7lQ?si=4SFiLQ0T3B3-QsRF?t=82',
  ];

  const [videoRef, videoInView] = useInView();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTimeCode, setActiveTimeCode] = useState(
    'https://youtu.be/4VxO_0IZ7lQ?si=4SFiLQ0T3B3-QsRF'
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
    <APUniversitySection id="university">
      <BoxNew>
        <APUniversityWrapper>
          <TitleBox>
            <SectionTitleNew>Досвід і можливості</SectionTitleNew>
            <SectionDescription>
              Дізнайся більше про нас та наш досвід
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
        </APUniversityWrapper>
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
              src="https://ap.education/static/video/trailers/university/experience.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/university/experience.mp4"
              type="video/mp4"
            />
          </Video>
        </PlayerLimiterNew>
      </BoxNew>
      {isVideoModalOpen && (
        <VideoModal
          closeVideoModal={closeVideoModal}
          url={videoUrls[activeTimeCode] || activeTimeCode}
        />
      )}
    </APUniversitySection>
  );
};
