import { Box } from 'components/Box/Box.styled';
import {
  ButtonBox,
  HeroSectionNew,
  LeadBtnSchool,
  TitleDescription,
  TitleSchool,
} from './Hero.styled';
import { HeroSwiperSchool } from './HeroSwiper/HeroSwiperSchool';

export const HeroSchool = ({ toggleModal, toggleTrialModal }) => {
  return (
    <HeroSectionNew id="hero">
      <Box>
        <TitleSchool>AP School – знання, що змінюють майбутнє</TitleSchool>
        <TitleDescription>
          Дистанційна школа з індивідуальним підходом
        </TitleDescription>

        <ButtonBox>
          <LeadBtnSchool onClick={toggleModal}>КОНСУЛЬТАЦІЯ</LeadBtnSchool>

          {/* <AddBtnSchool onClick={toggleTrialModal}>ПРОБНИЙ УРОК</AddBtnSchool> */}
        </ButtonBox>
      </Box>
      <HeroSwiperSchool toggleModal={toggleModal} />
    </HeroSectionNew>
  );
};
