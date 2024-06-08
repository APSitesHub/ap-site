import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { CloseIcon } from 'components/LeadForm/LeadForm.styled';
import { MarqueeCloseBtn } from 'components/Hero/HeroSwiper/HeroSwiperModal/HeroSwiperModal.styled';
import {
  RouteModal,
  PageLink,
  RouteModalText,
  PageLinkBox,
} from './EdCenterModal.styled';

export const EdCenterModal = ({ closeNavModal }) => {
  const allowScroll = () => {
    document.body.style.overflowY = '';
  };

  return (
    <>
      <Backdrop onClick={closeNavModal} />
      <RouteModal>
        <MarqueeCloseBtn onClick={closeNavModal}>
          <CloseIcon />
        </MarqueeCloseBtn>
        <RouteModalText>Куди їдемо?</RouteModalText>
        <PageLinkBox>
          <PageLink to="/english" onClick={allowScroll}>
            Англійська
          </PageLink>
          <PageLink to="/polski" onClick={allowScroll}>
            Польська
          </PageLink>
          <PageLink to="/deutsch" onClick={allowScroll}>
            Німецька
          </PageLink>
        </PageLinkBox>
      </RouteModal>
    </>
  );
};
