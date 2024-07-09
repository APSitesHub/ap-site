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
  lang,
}) => {
  console.log(quizValues.current);

  const setQuizValue = (e, value) => {
    quizValues.current.lang = value;
    continueQuiz(e);
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>Вивчення якої мови вас цікавить?</Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, 'en')}
            className={quizValues.current?.lang === 'en' && 'chosen'}
          >
            <QuizButtonContent>
              <Emoji src={gb} alt="Great Britain flag emoji" width="21" />
              Англійська
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'de')}
            className={quizValues.current?.lang === 'de' && 'chosen'}
          >
            <QuizButtonContent>
              <Emoji src={de} alt="Germany flag emoji" width="21" />
              Німецька
            </QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'pl')}
            className={quizValues.current?.lang === 'pl' && 'chosen'}
          >
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
            <CurrentPage>{activeSlide}</CurrentPage>/{lang ? 7 : 8}
          </PageCounter>
          <NextPageBtn
            className={
              activeSlide + 1 > 1 && !quizValues.current?.lang && 'disabled'
            }
            disabled={activeSlide + 1 > 1 && !quizValues.current?.lang && true}
            onClick={nextQuestion}
          >
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
