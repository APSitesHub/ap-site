import { VideoBox, VideoLimiter } from 'components/AboutUs/AboutUs.styled';
import { CloseIcon } from 'components/LeadForm/LeadForm.styled';
import { LeadBtn } from 'components/Menu/Menu.styled';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import {
  MarqueeBackBtn,
  MarqueeBackIcon,
  MarqueeBackdrop,
  MarqueeCloseBtn,
  MarqueeForwardBtn,
  MarqueeForwardIcon,
  ModalDesc,
  ModalHeader,
  ModalWindow,
} from './HeroSwiperModal.styled';
import { serviceListEn } from './serviceListEn';
import useSize from '@react-hook/size';

export const HeroSwiperModalEn = ({ closeMarqueeModal, toggleModal, id }) => {
  const [modalId, setModalId] = useState(parseInt(id));
  const length = serviceListEn.length;
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const toggleLeadForm = () => {
    closeMarqueeModal();
    toggleModal();
  };

  const handlePrevClick = () => {
    modalId <= 0
      ? setModalId(id => (id = length - 1))
      : setModalId(id => (id -= 1));
  };

  const handleNextClick = () => {
    modalId >= length - 1
      ? setModalId(id => (id = 0))
      : setModalId(id => (id += 1));
  };

  useEffect(() => {
    const onRightArrowNext = event => {
      if (event.code === 'ArrowRight') {
        handleNextClick();
      }
    };

    const onLeftArrowPrev = event => {
      if (event.code === 'ArrowLeft') {
        handlePrevClick();
      }
    };

    window.addEventListener('keydown', onRightArrowNext);
    window.addEventListener('keydown', onLeftArrowPrev);

    return () => {
      window.removeEventListener('keydown', onRightArrowNext);
      window.removeEventListener('keydown', onLeftArrowPrev);
    };
  });

  return (
    <>
      <MarqueeBackdrop onClick={closeMarqueeModal} />
      <ModalWindow>
        <MarqueeBackBtn onClick={handlePrevClick}>
          <MarqueeBackIcon />
        </MarqueeBackBtn>
        <MarqueeForwardBtn onClick={handleNextClick}>
          <MarqueeForwardIcon />
        </MarqueeForwardBtn>
        <MarqueeCloseBtn onClick={closeMarqueeModal}>
          <CloseIcon />
        </MarqueeCloseBtn>
        <ModalHeader>{serviceListEn[modalId].title}</ModalHeader>

        <VideoLimiter>
          <VideoBox>
            <ReactPlayer
              playing={true}
              loop={true}
              controls={true}
              style={{
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                objectFit: 'contain',
              }}
              width="100%"
              height="100%"
              url={serviceListEn[modalId].videoUrl}
            />
          </VideoBox>
        </VideoLimiter>

        <ModalDesc>{serviceListEn[modalId].desc}</ModalDesc>
        <LeadBtn onClick={toggleLeadForm}>
          {width >= 768 ? 'ШВИДКА КОНСУЛЬТАЦІЯ' : 'КОНСУЛЬТАЦІЯ'}
        </LeadBtn>
      </ModalWindow>
    </>
  );
};
