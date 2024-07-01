import {
  BackgroundFilterBottomLeft,
  BackgroundFilterTopRight,
  BackgroungStarSmall,
  CurrentPage,
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

export const QuizQuestionAge = ({
  activeSlide,
  isChild,
  continueQuiz,
  previousQuestion,
  nextQuestion,
  quizValues,
  lang
}) => {
  const setQuizValue = (e, value) => {
    quizValues.current.age = value;
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          {isChild ? 'Вкажіть вік дитини' : 'Вкажіть ваш вік'}
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e =>
              setQuizValue(e, isChild ? 'до 7 років' : 'до 18 років')
            }
            className={
              (quizValues.current?.age === 'до 7 років' ||
                quizValues.current?.age === 'до 18 років') &&
              'chosen'
            }
          >
            <QuizButtonContent>
              {isChild ? 'до 7 років' : 'до 18 років'}
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, isChild ? '7-9 років' : '18-24 роки')}
            className={
              (quizValues.current?.age === '7-9 років' ||
                quizValues.current?.age === '18-24 років') &&
              'chosen'
            }
          >
            <QuizButtonContent>
              {isChild ? '7-9 років' : '18-24 роки'}
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e =>
              setQuizValue(e, isChild ? '9-11 років' : '25-35 років')
            }
            className={
              (quizValues.current?.age === '9-11 років' ||
                quizValues.current?.age === '25-35 років') &&
              'chosen'
            }
          >
            <QuizButtonContent>
              {isChild ? '9-11 років' : '25-35 років'}
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e =>
              setQuizValue(
                e,
                isChild ? '12 років і більше' : '35 років і більше'
              )
            }
            className={
              (quizValues.current?.age === '12 років і більше' ||
                quizValues.current?.age === '35 років і більше') &&
              'chosen'
            }
          >
            <QuizButtonContent>
              {isChild ? '12 років і більше' : '35 років і більше'}
            </QuizButtonContent>
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
              activeSlide + 1 > 1 && !quizValues.current?.age && 'disabled'
            }
            disabled={activeSlide + 1 > 1 && !quizValues.current?.age && true}
            onClick={nextQuestion}
          >
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
