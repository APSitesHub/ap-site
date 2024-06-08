import { useEffect, useRef, useState } from 'react';
import {
  MarqueeChild,
  MarqueeOverlay,
  MarqueeSoundBtn,
  MarqueeVideo,
  StyledMarquee,
} from 'components/Reviews/ReviewsMarquee/ReviewsMarquee.styled';
import { ReviewModal } from './ReviewModal/ReviewModal';
import { useInView } from 'react-intersection-observer';

export const ReviewsMarquee = ({ toggleModal }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const reviewId = useRef(0);
  const { ref, inView } = useInView();

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
      <StyledMarquee
        autoFill={true}
        pauseOnHover={true}
        inViewRef={ref}
        play={inView ? 'true' : 'false'}
      >
        <MarqueeChild id={0} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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

        <MarqueeChild id={1} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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

        <MarqueeChild id={2} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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

        <MarqueeChild id={3} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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

        <MarqueeChild id={4} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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
        <MarqueeChild id={5} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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
        <MarqueeChild id={6} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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
        <MarqueeChild id={7} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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
        <MarqueeChild id={8} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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
        <MarqueeChild id={9} onClick={handleToggleModal}>
          <MarqueeOverlay>
            <MarqueeSoundBtn />
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
      </StyledMarquee>
    </>
  );
};
