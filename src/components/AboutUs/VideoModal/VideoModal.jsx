import { VideoBox } from 'components/HowItWorks/HowItWorks.styled';
import { CloseIcon } from 'components/LeadForm/LeadForm.styled';
import { MarqueeBackdrop } from 'components/Reviews/ReviewsMarquee/ReviewModal/ReviewModal.styled';
import ReactPlayer from 'react-player/youtube';
import { ModalVideoLimiter, ModalWindow, VideoCloseBtn } from './VideoModal.styled';

export const VideoModal = ({ closeVideoModal, url }) => {
  return (
    <>
      <MarqueeBackdrop onClick={closeVideoModal} />
      <ModalWindow>
        <ModalVideoLimiter>
          <VideoCloseBtn onClick={closeVideoModal}>
            <CloseIcon />
          </VideoCloseBtn>
          <VideoBox>
            <ReactPlayer
              playing={true}
              loop={true}
              muted={false}
              controls={true}
              style={{
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              width="100%"
              height="100%"
              url={url}
            />
          </VideoBox>
        </ModalVideoLimiter>
      </ModalWindow>
    </>
  );
};
