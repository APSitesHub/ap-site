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
  QuizArrowLeft,
  QuizArrowRight,
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
  quizValues,
}) => {
  const setQuizValue = (e, value) => {
    quizValues.current.knowledge = value;
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          {isChild ? 'Вкажіть рівень дитини' : 'Вкажіть ваш рівень'}
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, 'a0')}
            className={quizValues.current?.knowledge === 'a0' && 'chosen'}
          >
            <QuizButtonContent>
              <Emoji src={zero} alt="Running man emoji" width="21" />
              Нульовий
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'a1')}
            className={quizValues.current?.knowledge === 'a1' && 'chosen'}
          >
            <QuizButtonContent>
              <Emoji src={beginner} alt="Face in glasses emoji" width="21" />
              Початковий
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'a2')}
            className={quizValues.current?.knowledge === 'a2' && 'chosen'}
          >
            <QuizButtonContent>
              <Emoji src={middle} alt="Alumni hat emoji" width="21" />
              Середній
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'b1')}
            className={quizValues.current?.knowledge === 'b1' && 'chosen'}
          >
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
          >
            <QuizArrowLeft />
          </PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/8
          </PageCounter>
          <NextPageBtn
            className={
              activeSlide + 1 > 1 &&
              !quizValues.current?.knowledge &&
              'disabled'
            }
            disabled={
              activeSlide + 1 > 1 && !quizValues.current?.knowledge && true
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
