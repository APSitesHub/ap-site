import { Box } from 'components/Box/Box.styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/lazy';
import {
  NavigationItem,
  OrderBtn,
  OrderBtnBox,
  TranslationsArrow,
  TranslationsArrowInView,
  TranslationsBackground,
  TranslationsNavigation,
  TranslationsSection,
  TranslationsSubTitle,
  TranslationsTitle,
  TranslationsToggler,
  TranslationsWrapper,
  VideoBox,
  VideoLimiter
} from './Translations.styled';
import { TranslationsOrderModal } from './TranslationsOrderModal/TranslationsOrderModal';

export const Translations = ({ utms }) => {
  const listItems = ['Англійська', 'Польська', 'Німецька'];

  const [language, setLanguage] = useState('Англійська');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const toggleLanguage = item => {
    setLanguage(language => (language = item));
  };

  const toggleOrderModal = () => {
    setIsOrderModalOpen(isOpen => !isOpen);
    document.body.style.overflowY = 'hidden';
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(isOpen => (isOpen = false));
    !document.body.style.overflowY && isOrderModalOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isOrderModalOpen) {
        closeOrderModal();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  return (
    <TranslationsBackground>
      <TranslationsSection id="translations">
        <Box>
          <TranslationsTitle>
            БЮРО <TranslationsSubTitle>ПЕРЕКЛАДІВ</TranslationsSubTitle>
          </TranslationsTitle>
          <TranslationsWrapper>
            <OrderBtnBox>
              <TranslationsNavigation ref={ref}>
                {listItems.map((item, i) => (
                  <NavigationItem key={i}>
                    <TranslationsToggler
                      className={language === item ? 'selected' : ''}
                      onClick={() => toggleLanguage(item, i)}
                    >
                      {item}
                      <TranslationsArrow className="on-hover" />
                      {inView && (
                        <TranslationsArrowInView
                          style={{ animationDelay: `${i}s` }}
                        />
                      )}
                    </TranslationsToggler>
                  </NavigationItem>
                ))}
              </TranslationsNavigation>
              <OrderBtn onClick={toggleOrderModal}>ЗАМОВИТИ</OrderBtn>
            </OrderBtnBox>
            <VideoLimiter>
              <VideoBox>
                <ReactPlayer
                  loop={true}
                  controls={true}
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  width="100%"
                  height="100%"
                  url="https://youtu.be/Ujz1YjEEqyk?si=8crApB-nqbzlqihQ"
                />
              </VideoBox>
            </VideoLimiter>
          </TranslationsWrapper>
        </Box>
      </TranslationsSection>

      {isOrderModalOpen && (
        <TranslationsOrderModal closeOrderModal={closeOrderModal} utms={utms} />
      )}
    </TranslationsBackground>
  );
};
