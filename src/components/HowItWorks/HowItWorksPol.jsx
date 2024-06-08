import useSize from '@react-hook/size';
import { VideoModal } from 'components/AboutUs/VideoModal/VideoModal';
import { Box } from 'components/Box/Box.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  HowItWorksSection,
  PageNavigation,
  PageNavigationArrow,
  PageNavigationItem,
  PageNavigationLink,
  PageNavigationText,
  PlayerLimiter,
  SectionSubTitle,
  SectionTitle,
  SectionWrapper,
  Video,
  VideoSoundBtn,
} from './HowItWorks.styled';

export const HowItWorksPol = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoRef, videoInView] = useInView();

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

  const listItems = [
    { to: 'howitworks-anchor', service: 'Мотивація' },
    { to: 'platform-anchor', service: 'Навчальна платформа' },
    { to: 'reviews-anchor', service: 'Відгуки про курс' },
    { to: 'aboutus-anchor', service: 'Про нас' },
  ];
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const props =
    width > 768
      ? { spy: true, smooth: true, offset: -120 }
      : { spy: true, smooth: true, offset: -70 };

  return (
    <HowItWorksSection id="howitworks">
      <Box>
        <SectionWrapper>
          <SectionTitle>
            ЯК ЦЕ <SectionSubTitle>ПРАЦЮЄ?</SectionSubTitle>
          </SectionTitle>
          <PageNavigation>
            {listItems.map((item, i) => (
              <PageNavigationItem key={i}>
                <PageNavigationLink to={item.to} {...props}>
                  {item.service}
                  <PageNavigationArrow />
                  <PageNavigationText>перейти</PageNavigationText>
                </PageNavigationLink>
              </PageNavigationItem>
            ))}
          </PageNavigation>
        </SectionWrapper>
        <PlayerLimiter ref={videoRef} onClick={toggleVideoModal} id="howitworks-anchor">
          <VideoSoundBtn />
          <Video
            loop
            controls={false}
            autoplay={videoInView ? 'true' : 'false'}
            playsInline
            muted={true}
          >
            <source
              src="https://ap.education/static/video/trailers/HowItWorksPL.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/trailers/HowItWorksPL.mp4"
              type="video/mp4"
            />
          </Video>
        </PlayerLimiter>
      </Box>
      {isVideoModalOpen && (
        <VideoModal
          closeVideoModal={closeVideoModal}
          url={'https://youtu.be/zy6AFxRhT28'}
        />
      )}
    </HowItWorksSection>
  );
};
