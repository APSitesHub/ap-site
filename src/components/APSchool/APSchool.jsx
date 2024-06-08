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
import {
  APSchoolSection,
  APSchoolWrapper,
  SchoolStar,
} from './APSchool.styled';

export const APSchool = () => {
  const listItems = [
    'про нас',
    'можливості',
    'інтерактивне навчання',
    'VIP-Пакет',
  ];
  const videoUrls = [
    'https://youtu.be/ro-MrZVgywg?si=GCBIw9hOttw6XaKM?t=30',
    'https://youtu.be/ro-MrZVgywg?si=GCBIw9hOttw6XaKM?t=83',
    'https://youtu.be/ro-MrZVgywg?si=GCBIw9hOttw6XaKM?t=97',
    'https://youtu.be/ro-MrZVgywg?si=GCBIw9hOttw6XaKM?t=114',
  ];

  const [videoRef, videoInView] = useInView();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTimeCode, setActiveTimeCode] = useState(
    'https://youtu.be/ro-MrZVgywg?si=GCBIw9hOttw6XaKM'
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
    <APSchoolSection id="school">
      <BoxSchool>
        <APSchoolWrapper>
          <SchoolStar />
          <TitleBox>
            <SectionTitleNew>AP School</SectionTitleNew>
            <SectionDescription>
              Дистанційна школа з індивідуальним підходом. Навчаємо учнів 1-11
              класів. Видаємо державний атестат.
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
              src="https://ap.education/static/video/trailers/new-home/apschool.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/new-home/apschool.mp4"
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
