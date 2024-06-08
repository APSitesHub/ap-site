import { Box } from 'components/Box/Box.styled';
import {
  ButtonBox,
  HeroSectionNew,
  LeadBtnUniversity,
  TitleDescription,
  TitleUniversity,
} from './Hero.styled';
import { HeroSwiperUniversity } from './HeroSwiper/HeroSwiperUniversity';

export const HeroUniversity = ({ toggleModal, toggleTrialModal }) => {
  return (
    <HeroSectionNew id="hero">
      <Box>
        <TitleUniversity>
          AP University – знання, що змінюють майбутнє
        </TitleUniversity>
        <TitleDescription>
          Університет, що відкриває перед тобою всі можливості
        </TitleDescription>

        <ButtonBox>
          <LeadBtnUniversity onClick={toggleModal}>
            КОНСУЛЬТАЦІЯ
          </LeadBtnUniversity>

          {/* <AddBtnUniversity onClick={toggleTrialModal}>
            ПРОБНИЙ УРОК
          </AddBtnUniversity> */}
        </ButtonBox>
      </Box>
      <HeroSwiperUniversity toggleModal={toggleModal} />
    </HeroSectionNew>
  );
};
