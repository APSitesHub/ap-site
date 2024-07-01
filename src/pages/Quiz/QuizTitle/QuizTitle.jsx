import hiPng from '../../../img/quiz/hi.png';
import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  BackgroungStarLarge,
  BackgroungStarSmall,
  Description,
  HiEmoji,
  Logo,
  QuizBox,
  QuizStart,
  Title,
} from '../Quiz.styled';

export const QuizTitle = ({ beginQuiz, lang }) => {
  return (
    <>
      <QuizBox>
        <Logo />
        <Title>{`Вітаємо вас в 
        AP Education Center!`}</Title>
        <Description>
          {lang === 'en'
            ? 'Пройдіть короткий квіз та отримайте доступ до безкоштовних пробних занять з англійської мови!'
            : lang === 'de'
            ? 'Пройдіть короткий квіз та отримайте доступ до безкоштовних пробних занять з німецької мови!'
            : lang === 'pl'
            ? 'Пройдіть короткий квіз та отримайте доступ до безкоштовних пробних занять з польської мови!'
            : 'Пройдіть короткий квіз та отримайте доступ на безкоштовний марафон: вивчайте будь-яку мову на вибір, повноцінні заняття із викладачем, графік обираєте ви!'}
        </Description>
        <QuizStart onClick={beginQuiz}>Старт</QuizStart>
        <HiEmoji src={hiPng} alt="Hi emoji" width="80" />
        <BackgroundFilterTop /> <BackgroundFilterBottom />
        <BackgroungStarSmall /> <BackgroungStarLarge />
      </QuizBox>
    </>
  );
};
