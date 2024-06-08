import useSize from '@react-hook/size';
import { VideoModal } from 'components/AboutUs/VideoModal/VideoModal';
import { BoxNew } from 'components/Box/Box.styled';
import { MarqueeSoundBtn } from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  HowItWorksSectionNew,
  MotivationNavigationLink,
  PlayerLimiterNew,
  SectionDescription,
  SectionTitleNew,
  SectionWrapperNew,
  TitleBox,
  Video,
  WhoAreWeItem,
  WhoAreWeList,
  WhoAreWePointer,
} from './Motivation.styled';

export const MotivationPl = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoRef, videoInView] = useInView();
  const [topPosition, setTopPosition] = useState('0%');

  const calculatePointerPosition = i => {
    setTopPosition(topPosition => (topPosition = `${i * 100}%`));
  };

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
    { to: 'motivation-anchor', service: 'Мотивація' },
    { to: 'platform-anchor', service: 'Навчальна платформа' },
    { to: 'reviews-anchor', service: 'Відгуки про курс' },
    { to: 'form-anchor', service: 'Консультація' },
  ];
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);
  const props =
    width > 768
      ? { spy: true, smooth: true, offset: -50 }
      : { spy: true, smooth: true, offset: -34 };

  return (
    <HowItWorksSectionNew id="motivation-anchor">
      <BoxNew>
        <SectionWrapperNew>
          <TitleBox>
            <SectionTitleNew>Мотивація</SectionTitleNew>
            <SectionDescription>
            Обравши наш онлайн-курс польської мови, Ви обираєте особливе навчання, де з кожним уроком відкриваєте для себе новий формат вивчення польської мови.
            </SectionDescription>
          </TitleBox>
          <WhoAreWeList>
            <WhoAreWePointer
              style={{ transform: `translateY(${topPosition})` }}
            />
            {listItems.map((item, i) => (
              <WhoAreWeItem key={i}>
                <MotivationNavigationLink
                  to={item.to}
                  {...props}
                  onClick={() => {
                    calculatePointerPosition(i);
                  }}
                >
                  {item.service}
                </MotivationNavigationLink>
              </WhoAreWeItem>
            ))}
          </WhoAreWeList>
        </SectionWrapperNew>
        <PlayerLimiterNew ref={videoRef} onClick={toggleVideoModal}>
          <MarqueeSoundBtn />
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
        </PlayerLimiterNew>
      </BoxNew>
      {isVideoModalOpen && (
        <VideoModal
          closeVideoModal={closeVideoModal}
          url={'https://youtu.be/zy6AFxRhT28?si=SCIbnvxHNiIamBNE'}
        />
      )}
    </HowItWorksSectionNew>
  );
};
