import useSize from '@react-hook/size';
import { Box } from 'components/Box/Box.styled';
import { HeroSwiper } from 'components/Hero/HeroSwiper/HeroSwiper';
import { LeadBtn } from 'components/Menu/Menu.styled';
import { useState } from 'react';
import {
  Description,
  DescriptionMoreText,
  DescriptionSiteText,
  DescriptionTrigger,
  DescriptionUnderlineLong,
  DescriptionUnderlineShort,
  HeroSection,
  LesserTitle,
  Title,
} from './Hero.styled';

export const Hero = ({ toggleModal }) => {
  const [isMore, setIsMore] = useState(false);
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const showMore = () => {
    setIsMore(isMore => !isMore);
  };

  return (
    <HeroSection id="hero">
      <Box>
        <Title>Англійська мова з нуля</Title>
        <LesserTitle>Інтерактивні онлайн-уроки</LesserTitle>
        <LeadBtn onClick={toggleModal}>
          {width >= 400 ? 'ШВИДКА КОНСУЛЬТАЦІЯ' : 'КОНСУЛЬТАЦІЯ'}
        </LeadBtn>

        <Description>
          <span>
            Ласкаво просимо до AP Education Center
            {isMore
              ? '! Обравши наш онлайн-курс англійської мови, Ви обираєте особливе навчання, де з кожним уроком Ви відкриватимете для себе новий формат вивчення англійської мови.'
              : '! Обравши наш онлайн-курс англійської мови...'}
          </span>
          <DescriptionMoreText
            className={isMore ? 'more-shown' : 'more-hidden'}
          >
            {' '}
            <DescriptionSiteText>
              Курс створений з урахуванням потреб кожного учня, незалежно від їх
              віку чи рівня знань. Ми пропонуємо вивчення англійської мови для
              дітей та дорослих, які бажають вивчити цю мову з нуля або
              покращити свої вже існуючі навички. У Вас буде можливість обрати
              зручний формат навчання: самостійне вивчення, навчання в групах
              або індивідуальні заняття з англійської мови з репетитором. Ми
              піклуємося про наших студентів, тому ми{' '}
              <b>даруємо навчальний ноутбук</b> для зручного доступу та
              комфортного навчання.
            </DescriptionSiteText>
            <DescriptionSiteText>
              На нашому веб-сайті Ви знайдете всю необхідну інформацію, що
              стосується нашого освітнього центру. Почніть свою мовну подорож
              вже сьогодні та відчуйте переваги володіння англійською мовою в
              особистому та професійному житті!
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
        </DescriptionTrigger>
      </Box>
      <HeroSwiper toggleModal={toggleModal} />
    </HeroSection>
  );
};
