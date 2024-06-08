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
  WhoAreWePointer,
  WhoAreWeTrigger,
} from 'components/HowItWorks/HowItWorks.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useInView } from 'react-intersection-observer';
import {
  APUniversitySection,
  APUniversityWrapper,
  UniversityStar,
} from './APUniversity.styled';

export const APUniversity = () => {
  const listItems = [
    'про нас',
    'можливості',
    'стажування за кордоном',
    'європейський диплом',
  ];
  const videoUrls = [
    'https://youtu.be/lhSFzStANAA?si=bcXDaa0shcLmq_T7?t=28',
    'https://youtu.be/lhSFzStANAA?si=bcXDaa0shcLmq_T7?t=47',
    'https://youtu.be/lhSFzStANAA?si=bcXDaa0shcLmq_T7?t=69',
    'https://youtu.be/lhSFzStANAA?si=bcXDaa0shcLmq_T7?t=82',
  ];

  const [videoRef, videoInView] = useInView();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTimeCode, setActiveTimeCode] = useState(
    'https://youtu.be/lhSFzStANAA?si=bcXDaa0shcLmq_T7'
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
          <UniversityStar />
          <TitleBox>
            <SectionTitleNew>AP University</SectionTitleNew>
            <SectionDescription>
              Дистанційний університет, який піклується про твоє майбутнє!
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
              src="https://ap.education/static/video/trailers/new-home/apuniversity.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/new-home/apuniversity.mp4"
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
