import {
  HeroMarqueeSoundBtn,
  MarqueeChild,
  MarqueeOverlay,
  MarqueeText,
  MarqueeVideo,
  StyledMarquee,
} from 'components/Hero/HeroMarquee/HeroMarquee.styled';
import { HeroSwiperModal } from 'components/Hero/HeroSwiper/HeroSwiperModal/HeroSwiperModal';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const HeroMarquee = ({ toggleModal }) => {
  const [isMarqueeModalOpen, setIsMarqueeModalOpen] = useState(false);
  const modalId = useRef(NaN);
  const { ref, inView } = useInView({ delay: 1000 });

  const handleToggleModal = e => {
    modalId.current = e.currentTarget.id;
    setIsMarqueeModalOpen(isOpen => !isOpen);
    document.body.style.overflowY = 'hidden';
  };

  const closeMarqueeModal = () => {
    setIsMarqueeModalOpen(isOpen => (isOpen = false));
    modalId.current = 0;
    !document.body.style.overflowY && isMarqueeModalOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isMarqueeModalOpen) {
        closeMarqueeModal();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  return (
    <>
      {isMarqueeModalOpen && (
        <HeroSwiperModal
          closeMarqueeModal={closeMarqueeModal}
          toggleModal={toggleModal}
          id={modalId.current}
        />
      )}
      <StyledMarquee
        autoFill={true}
        pauseOnHover={true}
        inViewRef={ref}
        play={inView ? 'true' : 'false'}
      >
        <MarqueeChild id={0} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <HeroMarqueeSoundBtn />
            <MarqueeText>From Zero to Hero</MarqueeText>
          </MarqueeOverlay>
          <MarqueeVideo
            autoplay={inView ? 'true' : 'false'}
            loop
            playsInline
            muted={true}
            poster="../../../img/hero/hero-marquee/posters/poster1.webp"
          >
            <source
              src="https://ap.education/static/video/previews/preview1.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/previews/preview1.mp4"
              type="video/mp4"
            />
          </MarqueeVideo>
        </MarqueeChild>

        <MarqueeChild id={1} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <HeroMarqueeSoundBtn />
            <MarqueeText>Навчальна платформа</MarqueeText>
          </MarqueeOverlay>
          <MarqueeVideo
            autoplay={inView ? 'true' : 'false'}
            loop
            playsInline
            muted={true}
            poster="../../../img/hero/hero-marquee/posters/poster2.webp"
          >
            <source
              src="https://ap.education/static/video/previews/preview2.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/previews/preview2.mp4"
              type="video/mp4"
            />
          </MarqueeVideo>
        </MarqueeChild>

        <MarqueeChild id={2} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <HeroMarqueeSoundBtn />
            <MarqueeText>Письмова гарантія</MarqueeText>
          </MarqueeOverlay>
          <MarqueeVideo
            autoplay={inView ? 'true' : 'false'}
            loop
            playsInline
            muted={true}
            poster="../../../img/hero/hero-marquee/posters/poster3.webp"
          >
            <source
              src="https://ap.education/static/video/previews/preview3.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/previews/preview3.mp4"
              type="video/mp4"
            />
          </MarqueeVideo>
        </MarqueeChild>

        <MarqueeChild id={3} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <HeroMarqueeSoundBtn />
            <MarqueeText>Ноутбук в подарунок</MarqueeText>
          </MarqueeOverlay>
          <MarqueeVideo
            autoplay={inView ? 'true' : 'false'}
            loop
            playsInline
            muted={true}
            poster="../../../img/hero/hero-marquee/posters/poster4.webp"
          >
            <source
              src="https://ap.education/static/video/previews/preview4.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/previews/preview4.mp4"
              type="video/mp4"
            />
          </MarqueeVideo>
        </MarqueeChild>

        <MarqueeChild id={4} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <HeroMarqueeSoundBtn />
            <MarqueeText>Close to You</MarqueeText>
          </MarqueeOverlay>
          <MarqueeVideo
            autoplay={inView ? 'true' : 'false'}
            loop
            playsInline
            muted={true}
            poster="../../../img/hero/hero-marquee/posters/poster5.webp"
          >
            <source
              src="https://ap.education/static/video/previews/preview5.webm"
              type="video/webm"
            />
            <source
              src="https://ap.education/static/video/previews/preview5.mp4"
              type="video/mp4"
            />
          </MarqueeVideo>
        </MarqueeChild>
      </StyledMarquee>
      {/* <BackBtn onClick={handleBackClick}>Back</BackBtn>
      <ForwardBtn onClick={handleForwardClick}>Forward</ForwardBtn> */}
    </>
  );
};
