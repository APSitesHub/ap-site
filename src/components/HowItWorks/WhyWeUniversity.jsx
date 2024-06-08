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
  WhoAreWePointerUniversity,
  WhoAreWeTrigger,
} from './HowItWorks.styled';

export const WhyWeUniversity = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoRef, videoInView] = useInView();
  const [activeTimeCode, setActiveTimeCode] = useState(
    'https://youtu.be/CL7G3z_5CHg?si=BSMsxDVr-KAvwRPg'
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

  const listItems = ['Про нас', 'формат', 'метод навчання', 'ефективність'];
  const videoUrls = [
    'https://youtu.be/CL7G3z_5CHg?si=BSMsxDVr-KAvwRPg?t=13',
    'https://youtu.be/CL7G3z_5CHg?si=BSMsxDVr-KAvwRPg?t=36',
    'https://youtu.be/CL7G3z_5CHg?si=BSMsxDVr-KAvwRPg?t=60',
    'https://youtu.be/CL7G3z_5CHg?si=BSMsxDVr-KAvwRPg?t=129',
  ];

  return (
    <HowItWorksSectionNew id="howitworks">
      <BoxNew>
        <SectionWrapperNew>
          <TitleBox>
            <SectionTitleNew>Чому ми?</SectionTitleNew>
            <SectionDescription>
              Поєднання наших знань й унікальних методик навчання допоможуть
              вивчити, що завгодно
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
              src="https://ap.education/static/video/trailers/university/apuniversitywhyus.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/university/apuniversitywhyus.mp4"
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
