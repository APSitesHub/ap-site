import study from '../../../img/quiz/study.png';

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

export const QuizQuestionQuantity = ({
  activeSlide,
  continueQuiz,
  previousQuestion,
  nextQuestion,
  quizValues,
  lang
}) => {
  const setQuizValue = (e, value) => {
    quizValues.current.quantity = value;
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          Скільки разів на тиждень готові займатись?
          <Emoji
            src={study}
            alt="Person in front of laptop emoji"
            width="35"
            style={{
              position: 'absolute',
              bottom: '22px',
              right: '27px',
            }}
          />
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, '1 раз на тиждень')}
            className={
              quizValues.current?.quantity === '1 раз на тиждень' && 'chosen'
            }
          >
            <QuizButtonContent>1 раз на тиждень</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, '2 рази на тиждень')}
            className={
              quizValues.current?.quantity === '2 рази на тиждень' && 'chosen'
            }
          >
            <QuizButtonContent>2 рази на тиждень</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, '3 рази на тиждень')}
            className={
              quizValues.current?.quantity === '3 рази на тиждень' && 'chosen'
            }
          >
            <QuizButtonContent>3 рази на тиждень</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, '4 і більше разів на тиждень')}
          >
            <QuizButtonContent>4 і більше разів</QuizButtonContent>
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
              activeSlide + 1 > 1 && !quizValues.current?.quantity && 'disabled'
            }
            disabled={
              activeSlide + 1 > 1 && !quizValues.current?.quantity && true
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
