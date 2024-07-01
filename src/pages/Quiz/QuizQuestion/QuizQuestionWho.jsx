import books from '../../../img/quiz/books.png';
import hat from '../../../img/quiz/hat.png';
import laptop from '../../../img/quiz/laptop.png';
import {
  BackgroundFilterBottomLeft,
  BackgroundFilterTopRight,
  BackgroungStarSmall,
  BookEmoji,
  CurrentPage,
  HatImg,
  LaptopImg,
  Logo,
  NextPageBtn,
  PageCounter,
  Pagination,
  PreviousPageBtn,
  Question,
  QuizArrowLeft,
  QuizArrowRight,
  QuizBox,
  QuizButton,
  QuizButtonBox,
  QuizButtonContent,
} from '../Quiz.styled';

export const QuizQuestionWho = ({
  activeSlide,
  continueQuiz,
  continueQuizForChild,
  previousQuestion,
  nextQuestion,
  quizValues,
  lang,
}) => {
  const setQuizValue = (e, value) => {
    quizValues.current.adult = value;
    if (quizValues.current.age)
      quizValues.current = { lang: quizValues.current.lang, adult: value };

    !value ? continueQuizForChild(e) : continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          Для кого цікавить вивчення{' '}
          {lang === 'en'
            ? 'англійської'
            : lang === 'de'
            ? 'німецької'
            : lang === 'pl'
            ? 'польської'
            : 'мови'}
          ?
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, true)}
            className={quizValues.current?.adult === true && 'chosen'}
          >
            <QuizButtonContent>Для себе</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, false)}
            className={quizValues.current?.adult === false && 'chosen'}
          >
            <QuizButtonContent>Для дитини</QuizButtonContent>
          </QuizButton>
        </QuizButtonBox>
        <BackgroundFilterTopRight />
        <BackgroundFilterBottomLeft />
        <BackgroungStarSmall />
        <LaptopImg src={laptop} alt="Blurred laptop" width="67" />
        <BookEmoji src={books} alt="Books emoji" width="112" />
        <HatImg src={hat} alt="Blurred alumni hat" width="110" />
        <Pagination>
          <PreviousPageBtn
            className={activeSlide - 1 < 1 && 'disabled'}
            disabled={activeSlide - 1 < 1 && true}
            onClick={previousQuestion}
          >
            <QuizArrowLeft />
          </PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/{lang ? 7 : 8}
          </PageCounter>
          <NextPageBtn
            className={
              activeSlide + 1 > 1 &&
              quizValues.current?.adult === undefined &&
              'disabled'
            }
            disabled={
              activeSlide + 1 > 1 &&
              quizValues.current?.adult === undefined &&
              true
            }
            onClick={nextQuestion}
          >
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
