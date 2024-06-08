import { Box } from 'components/Box/Box.styled';
import { ButtonBox, HeroSectionNew, LeadBtnNew, TitleNew } from './Hero.styled';
import { HeroSwiperNew } from './HeroSwiper/HeroSwiperNew';

export const HeroNew = ({ toggleModal, toggleTrialModal }) => {
  return (
    <HeroSectionNew id="hero">
      <Box>
        <TitleNew>AP Education Center – знання, що змінюють майбутнє</TitleNew>

        <ButtonBox>
          <LeadBtnNew onClick={toggleModal}>КОНСУЛЬТАЦІЯ</LeadBtnNew>

          {/* <AddBtnNew onClick={toggleTrialModal}>ПРОБНИЙ УРОК</AddBtnNew> */}
        </ButtonBox>

        {/* <Description>
          <span>
            Ласкаво просимо до AP Education Center! Обравши нас, ви обираєте
            особливий шлях навчання {isMore ? ',' : '...'}
          </span>
          <DescriptionMoreText
            className={isMore ? 'more-shown' : 'more-hidden'}
          >
            {' '}
            де кожен етап – це унікальне відкриття. Від оформлення заявки до
            отримання навчального ноутбука ми пильнуємо, щоб ваша подорож з нами
            була не лише легкою, але й повною приємних бонусів.{' '}
            <DescriptionSiteText>
              На нашому веб-сайті ви знайдете всю необхідну інформацію, що
              стосується нашого освітнього центру. Приєднуйтеся до нас зараз та
              розпочніть Ваш унікальний шлях навчання!
            </DescriptionSiteText>
          </DescriptionMoreText>
        </Description>
        <DescriptionTrigger onClick={showMore}>
          {isMore ? 'Згорнути' : 'Дізнатись більше'}
          {isMore ? (
            <DescriptionUnderlineShort />
          ) : (
            <DescriptionUnderlineLong />
          )}
        </DescriptionTrigger> */}
      </Box>
      <HeroSwiperNew toggleModal={toggleModal} />
    </HeroSectionNew>
  );
};
