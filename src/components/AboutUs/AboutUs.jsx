import useSize from '@react-hook/size';
import {
  AboutUsBackground,
  AboutUsSection,
  AboutUsSubTitle,
  AboutUsText,
  AboutUsTitle,
  AboutUsWrapper,
  BottomPageNavigationText,
  LoopyLineIcon,
  NavAnimationWrapper,
  NavigationDesc,
  NavigationWrapper,
  Video,
  VideoLimiter,
} from 'components/AboutUs/AboutUs.styled';
import { Box } from 'components/Box/Box.styled';
import {
  PageNavigation,
  PageNavigationArrow,
  PageNavigationItem,
  PageNavigationLink,
  VideoSoundBtn,
} from 'components/HowItWorks/HowItWorks.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { VideoModal } from './VideoModal/VideoModal';

const navListItems = [
  { to: 'howitworks-anchor', service: 'Мотивація' },
  { to: 'platform-anchor', service: 'Навчальна платформа' },
  { to: 'reviews-anchor', service: 'Відгуки про курс' },
  { to: 'aboutus-anchor', service: 'Про нас' },
];

export const AboutUs = () => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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

  const [doodleRef, doodleInView] = useInView({
    triggerOnce: true,
    delay: 1000,
  });
  const [videoRef, videoInView] = useInView();

  const props =
    width > 768
      ? { spy: true, smooth: true, offset: -120 }
      : { spy: true, smooth: true, offset: -70 };

  return (
    <AboutUsBackground>
      <AboutUsSection id="aboutus">
        <Box>
          <AboutUsTitle id="aboutus-anchor">
            ПРО <AboutUsSubTitle>НАС</AboutUsSubTitle>
          </AboutUsTitle>
          <AboutUsWrapper>
            <VideoLimiter ref={videoRef} onClick={toggleVideoModal}>
              <VideoSoundBtn />
              <Video
                loop
                controls={false}
                autoplay={videoInView ? 'true' : 'false'}
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/trailers/AboutUs.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/AboutUs.mp4"
                  type="video/mp4"
                />
              </Video>
            </VideoLimiter>
            <AboutUsText>
              «AP Education Center» є провідним центром навчання іноземних мов
              та підготовки до міжнародних іспитів. Ми є сертифікованим
              партнером Cambridge English та Language Cert, що дозволяє нашим
              клієнтам готуватися до іспитів та складати їх відразу у нашому
              центрі.
            </AboutUsText>
          </AboutUsWrapper>
          <NavAnimationWrapper ref={doodleRef}>
            {/* {inView && <LoopyLineMirroredIcon />} */}
            <NavigationWrapper>
              <NavigationDesc>... якщо хочеш подивитися ще раз</NavigationDesc>
              <PageNavigation>
                {navListItems.map((item, i) => (
                  <PageNavigationItem key={i}>
                    <PageNavigationLink to={item.to} {...props}>
                      {item.service}
                      <PageNavigationArrow />
                      <BottomPageNavigationText>
                        перейти
                      </BottomPageNavigationText>
                    </PageNavigationLink>
                  </PageNavigationItem>
                ))}
              </PageNavigation>
            </NavigationWrapper>
            {width > 480 && doodleInView && <LoopyLineIcon />}
          </NavAnimationWrapper>
        </Box>
        {isVideoModalOpen && (
          <VideoModal
            closeVideoModal={closeVideoModal}
            url={'https://youtu.be/YP1TFRbTfyo'}
          />
        )}
      </AboutUsSection>
    </AboutUsBackground>
  );
};
