import {
  HeroMarqueeSoundBtn,
  MarqueeChild,
  MarqueeOverlay,
  MarqueeText,
  MarqueeVideo,
} from 'components/Hero/HeroMarquee/HeroMarquee.styled';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StyledSlide } from '../HeroSwiper.styled';
import { HeroSwiperModalPol } from '../HeroSwiperModal/HeroSwiperModalPol';

export const DesktopSwiperPol = ({ toggleModal }) => {
  const modalId = useRef(NaN);
  const [isMarqueeModalOpen, setIsMarqueeModalOpen] = useState(false);
  const { ref, inView } = useInView();

  const handleToggleModal = e => {
    modalId.current = e.currentTarget.getAttribute('data-id');
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
        <HeroSwiperModalPol
          closeMarqueeModal={closeMarqueeModal}
          toggleModal={toggleModal}
          id={modalId.current}
        />
      )}
      <Swiper
        ref={ref}
        slidesPerView={'auto'}
        spaceBetween={30}
        speed={4000}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        updateOnWindowResize={true}
        grabCursor={true}
        modules={[Autoplay]}
      >
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Od zera do bohatera</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Навчальна платформа</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Письмова гарантія</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Ноутбук в подарунок</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Унікальний формат</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Od zera do bohatera</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Навчальна платформа</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Письмова гарантія</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Ноутбук в подарунок</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Унікальний формат</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Od zera do bohatera</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Навчальна платформа</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Письмова гарантія</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Ноутбук в подарунок</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '270px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChild>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeText>Унікальний формат</MarqueeText>
              </MarqueeOverlay>
              <MarqueeVideo
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
              >
                <source
                  src="https://ap.education/static/video/previews-pol/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-pol/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideo>
            </MarqueeChild>
          </StyledSlide>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
