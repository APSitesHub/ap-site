import middle from '../../../img/quiz/middle.png';

import {
  BackgroundFilterBottomLeft,
  BackgroundFilterTopRight,
  BackgroungStarSmall,
  CurrentPage,
  Emoji,
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

export const QuizQuestionInterests = ({
  activeSlide,
  continueQuiz,
  previousQuestion,
  nextQuestion,
  quizValues,
}) => {
  const setQuizValue = (e, value) => {
    quizValues.current.interests = value;
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          Що вас зараз цікавить у вивченні мови?
          <Emoji
            src={middle}
            alt="Alumni hat emoji"
            width="35"
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '75px',
              transform: 'rotate(-12deg)',
            }}
          />
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, 'Розширити словниковий запас')}
          >
            <QuizButtonContent>Вивчити слова</QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'Вивчити граматику')}>
            <QuizButtonContent>Вивчити граматику</QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'Вільно розмовляти')}>
            <QuizButtonContent>Вільно розмовляти</QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'Все разом')}>
            <QuizButtonContent>Все разом</QuizButtonContent>
          </QuizButton>
        </QuizButtonBox>
        <BackgroundFilterTopRight />
        <BackgroundFilterBottomLeft />
        <BackgroungStarSmall />
        <Pagination>
          <PreviousPageBtn
            className={activeSlide - 1 < 1 && 'disabled'}
            disabled={activeSlide - 1 < 1 && true}
            onClick={previousQuestion}
          >
            <QuizArrowLeft />
          </PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/8
          </PageCounter>
          <NextPageBtn
            className={activeSlide + 1 < 1 && 'disabled'}
            disabled={activeSlide + 1 < 1 && true}
            onClick={nextQuestion}
          >
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
