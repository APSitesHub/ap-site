import zero from '../../../img/quiz/zero.png';
import beginner from '../../../img/quiz/beginner.png';
import middle from '../../../img/quiz/middle.png';
import senior from '../../../img/quiz/senior.png';

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
  QuizBox,
  QuizButton,
  QuizButtonBox,
  QuizButtonContent,
} from '../Quiz.styled';

export const QuizQuestionLevel = ({
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
          {isChild ? 'Вкажіть рівень дитини' : 'Вкажіть ваш рівень'}
        </Question>
        <QuizButtonBox>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={zero} alt="Running man emoji" width="21" />
              Нульовий
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={beginner} alt="Face in glasses emoji" width="21" />
              Початковий
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={middle} alt="Alumni hat emoji" width="21" />
              Середній
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={senior} alt="Prize cup emoji" width="21" />
              Високий
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
          ></NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
