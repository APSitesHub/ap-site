import {
  MarqueeChild,
  MarqueeOverlay,
  MarqueeSoundBtn,
  MarqueeVideo,
} from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSize from '@react-hook/size';
import { Autoplay } from 'swiper/modules';
import { ReviewModal } from '../ReviewsMarquee/ReviewModal/ReviewModal';
import {
  HeroMarqueeTextIcon,
  MarqueeTextNew,
} from 'components/Hero/HeroMarquee/HeroMarquee.styled';

export const ReviewsSwiper = ({ toggleModal }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const reviewId = useRef(0);
  const { ref, inView } = useInView();
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const handleToggleModal = e => {
    reviewId.current = e.currentTarget.id;
    setIsReviewModalOpen(isOpen => !isOpen);
    document.body.style.overflowY = 'hidden';
  };

  const closeMarqueeModal = () => {
    setIsReviewModalOpen(isOpen => (isOpen = false));
    reviewId.current = 0;
    !document.body.style.overflowY && isReviewModalOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isReviewModalOpen) {
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
      {isReviewModalOpen && (
        <ReviewModal
          closeMarqueeModal={closeMarqueeModal}
          toggleModal={toggleModal}
          id={reviewId.current}
        />
      )}
      <Swiper
        ref={ref}
        slidesPerView={'auto'}
        spaceBetween={width < 768 ? 16 : 40}
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
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={0} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review1.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review1.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={1} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review2.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review2.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={2} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review3.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review3.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={3} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review4.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review4.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={4} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review5.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review5.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={5} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review6.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review6.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={6} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review7.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review7.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={7} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review8.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review8.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={8} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review9.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review9.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
        <SwiperSlide
          style={width < 768 ? { maxWidth: '210px' } : { maxWidth: '360px' }}
        >
          <MarqueeChild id={9} onClick={handleToggleModal}>
            <MarqueeOverlay>
              <MarqueeSoundBtn />
              <MarqueeTextNew>
                Відгук
                <HeroMarqueeTextIcon />
              </MarqueeTextNew>
            </MarqueeOverlay>
            <MarqueeVideo
              autoplay={inView ? 'true' : 'false'}
              loop
              playsInline
              muted={true}
            >
              <source
                src="https://ap.education/static/video/reviews/review10.webm"
                type="video/webm"
              />
              <source
                src="https://ap.education/static/video/reviews/review10.mp4"
                type="video/mp4"
              />
            </MarqueeVideo>
          </MarqueeChild>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
