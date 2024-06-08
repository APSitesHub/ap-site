import useSize from '@react-hook/size';
import { VideoBox } from 'components/AboutUs/AboutUs.styled';
import { ButtonBox, LeadBtnNew } from 'components/Hero/Hero.styled';
import { CloseIcon } from 'components/LeadForm/LeadForm.styled';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import {
  LogoNewModal,
  LogoSchoolModal,
  LogoUniversityModal,
  MarqueeBackBtn,
  MarqueeBackIcon,
  MarqueeBackdrop,
  MarqueeCloseBtn,
  MarqueeForwardBtn,
  MarqueeForwardIcon,
  ModalBox,
  ModalDesc,
  ModalHeader,
  ModalVideoLimiter,
  ModalWindow,
  PageLink,
} from './HeroSwiperModal.styled';
import { serviceListNew } from './serviceListNew';

export const HeroSwiperModalNew = ({ closeMarqueeModal, toggleModal, id }) => {
  const [modalId, setModalId] = useState(parseInt(id));
  const length = serviceListNew.length;
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

  const setModalHeader = title => {
    switch (title) {
      case 'AP School':
        return <LogoSchoolModal />;
      case 'AP University':
        return <LogoUniversityModal />;
      case 'Мовні курси':
        return <LogoNewModal />;
      case 'Англійська мова':
        return title;
      case 'Німецька мова':
        return title;
      case 'Польська мова':
        return title;
      default:
        break;
    }
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
        <ModalHeader>
          {setModalHeader(serviceListNew[modalId].title)}

          <MarqueeCloseBtn onClick={closeMarqueeModal}>
            <CloseIcon />
          </MarqueeCloseBtn>
        </ModalHeader>

        <ModalBox>
          <ModalVideoLimiter>
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
                url={serviceListNew[modalId].videoUrl}
              />
            </VideoBox>
          </ModalVideoLimiter>

          <ModalDesc>{serviceListNew[modalId].desc}</ModalDesc>
          <ButtonBox>
          <LeadBtnNew onClick={toggleLeadForm}>ЗАЛИШИТИ ЗАЯВКУ</LeadBtnNew>

          <PageLink to='/'>ПЕРЕЙТИ НА СТОРІНКУ</PageLink>
        </ButtonBox>
          
        </ModalBox>
      </ModalWindow>
    </>
  );
};
