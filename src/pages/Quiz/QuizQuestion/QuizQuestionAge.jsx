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
}) => {
  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          {isChild ? 'Вкажіть вік дитини' : 'Вкажіть ваш вік'}
        </Question>
        <QuizButtonBox>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              {isChild ? 'до 7 років' : 'до 18 років'}
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              {isChild ? '7-9 років' : '18-24 роки'}
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              {isChild ? '9-11 років' : '25-35 років'}
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
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
          ></PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/8
          </PageCounter>
          <NextPageBtn
            className={activeSlide + 1 < 1 && 'disabled'}
            disabled={activeSlide + 1 < 1 && true}
            onClick={nextQuestion}
          ><QuizArrowRight/></NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
