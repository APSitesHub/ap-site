import { Box } from 'components/Box/Box.styled';
import {
  ButtonBox,
  HeroSectionNew,
  LeadBtnNew,
  TitleDescription,
  TitleNew
} from './Hero.styled';
import { HeroSwiperEn } from './HeroSwiper/HeroSwiperEn';

export const HeroEnglish = ({ toggleModal, toggleTrialModal }) => {
  return (
    <HeroSectionNew id="hero">
      <Box>
        <TitleNew>Вивчення англійської з нуля — інтерактивні онлайн-уроки
        </TitleNew>
        <TitleDescription>Курс створений з урахуванням потреб кожного учня, незалежно від їх віку чи рівня знань. Ми пропонуємо вивчення англійської мови для дітей та дорослих, які бажають вивчити цю мову з нуля або покращити свої вже існуючі навички. </TitleDescription>
        <ButtonBox>
          <LeadBtnNew onClick={toggleModal}>КОНСУЛЬТАЦІЯ</LeadBtnNew>

          {/* <AddBtnNew onClick={toggleTrialModal}>ПРОБНИЙ УРОК</AddBtnNew> */}
        </ButtonBox>
      </Box>
      <HeroSwiperEn toggleModal={toggleModal} />
    </HeroSectionNew>
  );
};
