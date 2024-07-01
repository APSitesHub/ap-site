import middle from '../../../img/quiz/middle.png';

import {
  BackgroundFilterBottomLeft,
  BackgroundFilterTopRight,
  BackgroungStarSmall,
  CurrentPage,
  InterestsEmoji,
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
  lang
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
          Що вас зараз цікавить у вивченні{' '}
          {quizValues.current.lang === 'en'
            ? 'англійської'
            : quizValues.current.lang === 'de'
            ? 'німецької'
            : quizValues.current.lang === 'pl'
            ? 'польської'
            : 'іноземної'}{' '}
          мови?
          <InterestsEmoji src={middle} alt="Alumni hat emoji" />
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, 'Розширити словниковий запас')}
            className={
              quizValues.current?.interests === 'Розширити словниковий запас' &&
              'chosen'
            }
          >
            <QuizButtonContent>Вивчити слова</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'Вивчити граматику')}
            className={
              quizValues.current?.interests === 'Вивчити граматику' && 'chosen'
            }
          >
            <QuizButtonContent>Вивчити граматику</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'Вільно розмовляти')}
            className={
              quizValues.current?.interests === 'Вільно розмовляти' && 'chosen'
            }
          >
            <QuizButtonContent>Вільно розмовляти</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'Все разом')}
            className={
              quizValues.current?.interests === 'Все разом' && 'chosen'
            }
          >
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
            <CurrentPage>{activeSlide}</CurrentPage>/{lang ? 7 : 8}
          </PageCounter>
          <NextPageBtn
            className={
              activeSlide + 1 > 1 &&
              !quizValues.current?.interests &&
              'disabled'
            }
            disabled={
              activeSlide + 1 > 1 && !quizValues.current?.interests && true
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
