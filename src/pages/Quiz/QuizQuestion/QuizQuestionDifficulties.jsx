import book from '../../../img/quiz/book.png';
import brain from '../../../img/quiz/brainmelt.png';
import speak from '../../../img/quiz/speak.png';
import ear from '../../../img/quiz/ear.png';

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

export const QuizQuestionDifficulties = ({
  activeSlide,
  continueQuiz,
  previousQuestion,
  nextQuestion,
  quizValues,
}) => {
  const setQuizValue = (e, value) => {
    quizValues.current.difficulties = value;
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          Які труднощі у вас виникають під час вивчення іноземної мови?
        </Question>
        <QuizButtonBox>
          <QuizButton onClick={e => setQuizValue(e, 'Незнайомі слова')}>
            <QuizButtonContent>
              <Emoji src={book} alt="Vocabulary emoji" width="21" />
              Незнайомі слова
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'Граматика')}>
            <QuizButtonContent>
              <Emoji src={brain} alt="Brain explosion emoji" width="21" />
              Граматика
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'Спілкування')}>
            <QuizButtonContent>
              <Emoji src={speak} alt="Speaking emoji" width="21" />
              Спілкування
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'Розуміння мови на слух')}>
            <QuizButtonContent>
              <Emoji src={ear} alt="Ear emoji" width="21" />
              Розуміння мови на слух
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
