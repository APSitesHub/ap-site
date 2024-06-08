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
import { HeroSwiperModalNew } from '../HeroSwiperModal/HeroSwiperModalNew';

export const DesktopSwiperNew = ({ toggleModal }) => {
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
        <HeroSwiperModalNew
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
                  AP School
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.mp4"
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
                  AP University
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.mp4"
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
                  Мовні курси
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.mp4"
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
                  Англійська мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.mp4"
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
                  Німецька мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={5} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Польська мова
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster5.webp"
              >
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.mp4"
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
                  AP School
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.mp4"
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
                  AP University
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.mp4"
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
                  Мовні курси
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.mp4"
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
                  Англійська мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.mp4"
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
                  Німецька мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={5} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Польська мова
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster5.webp"
              >
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.mp4"
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
                  AP School
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.mp4"
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
                  AP University
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.mp4"
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
                  Мовні курси
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.mp4"
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
                  Англійська мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.mp4"
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
                  Німецька мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={5} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Польська мова
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster5.webp"
              >
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.mp4"
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
                  AP School
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/school-swiper.mp4"
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
                  AP University
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/university-swiper.mp4"
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
                  Мовні курси
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/courses-swiper.mp4"
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
                  Англійська мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/english-swiper.mp4"
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
                  Німецька мова
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
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/deutsch-swiper.mp4"
                  type="video/mp4"
                />
              </MarqueeVideoNew>
            </MarqueeChildNew>
          </StyledSlide>
        </SwiperSlide>
        <SwiperSlide style={{ maxWidth: '360px' }}>
          <StyledSlide data-id={5} onClick={handleToggleModal}>
            <MarqueeChildNew>
              <MarqueeOverlay>
                <HeroMarqueeSoundBtn />
                <MarqueeTextNew>
                  Польська мова
                  <HeroMarqueeTextIcon />
                </MarqueeTextNew>
              </MarqueeOverlay>
              <MarqueeVideoNew
                autoplay={inView ? 'true' : 'false'}
                loop
                playsInline
                muted={true}
                poster="../../../img/hero/hero-marquee/posters/poster5.webp"
              >
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.webm"
                  type="video/webm"
                />
                <source
                  src="https://ap.education/static/video/trailers/new-home/swiper/polski-swiper.mp4"
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
