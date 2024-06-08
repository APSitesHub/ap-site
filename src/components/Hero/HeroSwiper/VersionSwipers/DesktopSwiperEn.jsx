import {
  HeroMarqueeSoundBtn,
  HeroMarqueeTextIcon,
  MarqueeChildNew,
  MarqueeOverlay,
  MarqueeTextNew,
  MarqueeVideoNew,
} from 'components/Hero/HeroMarquee/HeroMarquee.styled';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StyledSlide } from '../HeroSwiper.styled';
import { HeroSwiperModalEn } from '../HeroSwiperModal/HeroSwiperModalEn';

export const DesktopSwiperEn = ({ toggleModal }) => {
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
        <HeroSwiperModalEn
          closeMarqueeModal={closeMarqueeModal}
          toggleModal={toggleModal}
          id={modalId.current}
        />
      )}
      <Swiper
        ref={ref}
        slidesPerView={'auto'}
        spaceBetween={40}
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
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  From Zero to Hero
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster1.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Навчальна платформа
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster2.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Письмова гарантія
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Ноутбук у подарунок
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Close to You
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster4.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>

        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  From Zero to Hero
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster1.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Навчальна платформа
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster2.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Письмова гарантія
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Ноутбук у подарунок
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Close to You
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster4.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>

        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  From Zero to Hero
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster1.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Навчальна платформа
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster2.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Письмова гарантія
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Ноутбук у подарунок
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Close to You
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster4.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>

        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={0} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  From Zero to Hero
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster1.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview1.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview1.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={1} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Навчальна платформа
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster2.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview2.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview2.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={2} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Письмова гарантія
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview3.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview3.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={3} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Ноутбук у подарунок
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster3.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview4.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview4.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={4} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Close to You
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster4.webp"
              >
                <source
                  src="https://ap.education/static/video/previews-en/preview5.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/previews-en/preview5.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
