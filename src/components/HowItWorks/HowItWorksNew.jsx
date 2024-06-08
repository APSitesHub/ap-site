import { VideoModal } from 'components/AboutUs/VideoModal/VideoModal';
import { BoxNew } from 'components/Box/Box.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  HowItWorksSectionNew,
  PlayerLimiterNew,
  SectionDescription,
  SectionTitleNew,
  SectionWrapperNew,
  TitleBox,
  Video,
  WhoAreWeItem,
  WhoAreWeList,
  WhoAreWePointer,
  WhoAreWeTrigger,
  WhoWeAreStar
} from './HowItWorks.styled';

export const HowItWorksNew = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoRef, videoInView] = useInView();
  const [activeTimeCode, setActiveTimeCode] = useState('https://youtu.be/fjXji90Uf3U?si=CqN_Jyg3C78mb1k4');
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
    setTopPosition(topPosition => (topPosition = `${i * 25}%`));
  };

  const listItems = ['Досвід', 'формат', 'наша освіта', 'можливості'];
  const videoUrls = [
    'https://youtu.be/fjXji90Uf3U?si=CqN_Jyg3C78mb1k4?t=7',
    'https://youtu.be/fjXji90Uf3U?si=CqN_Jyg3C78mb1k4?t=30',
    'https://youtu.be/fjXji90Uf3U?si=CqN_Jyg3C78mb1k4?t=57',
    'https://youtu.be/fjXji90Uf3U?si=CqN_Jyg3C78mb1k4?t=75',
  ];

  return (
    <HowItWorksSectionNew id="howitworks">
      <BoxNew>
        <SectionWrapperNew>
          <TitleBox>
            <SectionTitleNew>Хто ми?</SectionTitleNew>
            <SectionDescription>
              Дізнайся більше про нас та наш досвід
            </SectionDescription>
          </TitleBox>
          <WhoWeAreStar/>
          <WhoAreWeList>
            <WhoAreWePointer style={{ top: topPosition }} />
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
        </SectionWrapperNew>
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
              src="https://ap.education/static/video/trailers/new-home/home-who-we-are.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/new-home/home-who-we-are.mp4"
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
    </HowItWorksSectionNew>
  );
};
