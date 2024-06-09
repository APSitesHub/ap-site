import de from '../../../img/quiz/de.png';
import gb from '../../../img/quiz/gb.png';
import pl from '../../../img/quiz/pl.png';
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

export const QuizQuestionLang = ({
  continueQuiz,
  activeSlide,
  previousQuestion,
  nextQuestion,
  quizValues,
}) => {
  console.log(quizValues);

  const setQuizValue = (e, value) => {
    quizValues.current = { lang: value };
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>Вивчення якої мови вас цікавить?</Question>
        <QuizButtonBox>
          <QuizButton onClick={e => setQuizValue(e, 'en')}>
            <QuizButtonContent>
              <Emoji src={gb} alt="Great Britain flag emoji" width="21" />
              Англійська
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'de')}>
            <QuizButtonContent>
              <Emoji src={de} alt="Germany flag emoji" width="21" />
              Німецька
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={e => setQuizValue(e, 'pl')}>
            <QuizButtonContent>
              <Emoji src={pl} alt="Poland flag emoji" width="21" /> Польська
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
