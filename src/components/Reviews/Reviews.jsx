import { VideoModal } from 'components/AboutUs/VideoModal/VideoModal';
import { YouTubeVideoSoundBtn } from 'components/HowItWorks/HowItWorks.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import {
  LeadBtnWrapper,
  ReviewLeadBtn,
  ReviewsBackground,
  ReviewsBox,
  ReviewsSection,
  ReviewsSubTitle,
  ReviewsText,
  ReviewsTextBox,
  ReviewsTitle,
  ReviewsVideoWrapper,
  VideoBox,
  VideoLimiter,
} from './Reviews.styled';
import { ReviewsSwiper } from './ReviewsSwiper/ReviewsSwiper';

export const Reviews = ({ toggleModal }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const [videoRef, videoInView] = useInView();
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

  return (
    <ReviewsBackground>
      <ReviewsSection id="reviews" ref={ref}>
        <ReviewsBox>
          <ReviewsTitle id="reviews-anchor">
            <ReviewsSubTitle>ВІДГУКИ</ReviewsSubTitle> ПРО КУРС
          </ReviewsTitle>
          <ReviewsVideoWrapper>
            <VideoLimiter ref={videoRef}>
              <VideoBox onClick={toggleVideoModal}>
                <YouTubeVideoSoundBtn />
                <ReactPlayer
                  loop={true}
                  controls={false}
                  muted={true}
                  playing={videoInView ? true : false}
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  width="100%"
                  height="100%"
                  url="https://youtu.be/qj-w9wzo76Q?si=EBLs8ap7W_RqBsXe"
                />
              </VideoBox>
            </VideoLimiter>
            <ReviewsTextBox>
              <ReviewsText>
                Відгуки наших клієнтів вражають, адже кожен студент отримує в
                подарунок сучасний ноутбук-трансформер - потужний інструмент для
                досягнення нових висот як у навчанні так і у повсякденному
                житті. Приєднуйтесь до нас вже сьогодні!
              </ReviewsText>
              <LeadBtnWrapper>
                <ReviewLeadBtn onClick={toggleModal}> ЗАЛИШИТИ ЗАЯВКУ </ReviewLeadBtn>
              </LeadBtnWrapper>
            </ReviewsTextBox>
          </ReviewsVideoWrapper>
        </ReviewsBox>
        {/* {inView && <ReviewsMarquee toggleModal={toggleModal} />} */}
        {inView && <ReviewsSwiper />}
      </ReviewsSection>
      {isVideoModalOpen && (
        <VideoModal
          closeVideoModal={closeVideoModal}
          url={'https://youtu.be/qj-w9wzo76Q'}
        />
      )}
    </ReviewsBackground>
  );
};
